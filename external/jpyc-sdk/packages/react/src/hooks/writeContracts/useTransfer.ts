'use client';

import { useState } from 'react';
import { useConfig as useWagmiConfig, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { simulateContract } from 'wagmi/actions';

import { CONTRACT_FUNC_NAMES, WriteContractNotReady, scaleUp } from '../../utils';
import type { AddressString, UseWriteContractResponse } from '../../utils';
import { useConfig } from '../';

/** Type for response from `useTransfer` hook. */
type UseTransferResponse = UseWriteContractResponse & {
  transfer?: (args: { to: AddressString; value: number }) => Promise<void>;
};

/**
 * Configures & exposes `transfer` method of JPYC contract.
 *
 * @returns Callable object (& related states)
 */
export function useTransfer(): UseTransferResponse {
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
   * Transfers `value` JPYC from the connected account to `to`.
   *
   * @param to Destination address
   * @param value Amount of JPYC to transfer
   */
  const transfer = async ({ to, value }: { to: AddressString; value: number }): Promise<void> => {
    setSdkError(null);

    try {
      if (!isReady) throw new WriteContractNotReady();

      setIsTxSimulating(true);

      const { request } = await simulateContract(wagmiConfig, {
        abi: contractAbi,
        address: contractAddress,
        functionName: CONTRACT_FUNC_NAMES.transfer,
        args: [to, scaleUp({ value: value.toString() })],
        account: userAddress,
      });

      setIsTxSimulating(false);

      writeContract(request);
    } catch (err: unknown) {
      setSdkError(err as Error);
    }
  };

  return {
    transfer: isReady ? transfer : undefined,
    isReady,
    isLoading,
    isSuccess,
    error,
    hash: txHash,
    reset,
  };
}
