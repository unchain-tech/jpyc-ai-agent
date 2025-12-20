'use client';

import { useState } from 'react';
import { useConfig as useWagmiConfig, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { simulateContract } from 'wagmi/actions';

import { CONTRACT_FUNC_NAMES, WriteContractNotReady, scaleUp } from '../../utils';
import type { AddressString, UseWriteContractResponse } from '../../utils';
import { useConfig } from '..';

/** Type for response from `useTransferFrom` hook. */
type UseTransferFromResponse = UseWriteContractResponse & {
  transferFrom?: (args: { from: AddressString; to: AddressString; value: number }) => Promise<void>;
};

/**
 * Configures & exposes `transferFrom` method of JPYC contract.
 *
 * @returns Callable object (& related states)
 */
export function useTransferFrom(): UseTransferFromResponse {
  const wagmiConfig = useWagmiConfig();

  const { contractAbi, contractAddress, userAddress } = useConfig();

  const [sdkError, setSdkError] = useState<Error | null>(null);
  const [isTxSimulating, setIsTxSimulating] = useState(false);

  const {
    data: txHash,
    isPending: isWritePending,
    error: writeError,
    writeContract,
    reset: resetWriteStates,
  } = useWriteContract();

  const {
    isLoading: isTxLoading,
    isSuccess,
    error: txError,
  } = useWaitForTransactionReceipt({ hash: txHash });

  const reset = (): void => {
    setSdkError(null);
    setIsTxSimulating(false);
    resetWriteStates();
  };

  const isReady = !!contractAbi && !!contractAddress && !!userAddress;
  const isLoading = isTxSimulating || isWritePending || isTxLoading;
  const error = sdkError ?? writeError ?? txError;

  /**
   * Transfers `value` JPYC from `from` to `to`.
   *
   * @param from Source address
   * @param to Destination address
   * @param value Amount of JPYC to transfer
   */
  const transferFrom = async ({
    from,
    to,
    value,
  }: {
    from: AddressString;
    to: AddressString;
    value: number;
  }): Promise<void> => {
    setSdkError(null);

    try {
      if (!isReady) throw new WriteContractNotReady();

      setIsTxSimulating(true);

      const { request } = await simulateContract(wagmiConfig, {
        abi: contractAbi,
        address: contractAddress,
        functionName: CONTRACT_FUNC_NAMES.transferFrom,
        args: [from, to, scaleUp({ value: value.toString() })],
        account: userAddress,
      });

      setIsTxSimulating(false);

      writeContract(request);
    } catch (err: unknown) {
      setSdkError(err as Error);
    }
  };

  return {
    transferFrom: isReady ? transferFrom : undefined,
    isReady,
    isLoading,
    isSuccess,
    error,
    hash: txHash,
    reset,
  };
}
