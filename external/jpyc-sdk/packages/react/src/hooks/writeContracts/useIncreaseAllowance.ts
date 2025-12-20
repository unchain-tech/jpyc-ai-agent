'use client';

import { useState } from 'react';
import { useConfig as useWagmiConfig, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { simulateContract } from 'wagmi/actions';

import { CONTRACT_FUNC_NAMES, WriteContractNotReady, scaleUp } from '../../utils';
import type { AddressString, UseWriteContractResponse } from '../../utils';
import { useConfig } from '..';

/** Type for response from `useIncreaseAllowance` hook. */
type UseIncreaseAllowanceResponse = UseWriteContractResponse & {
  increaseAllowance?: (args: { spender: AddressString; increment: number }) => Promise<void>;
};

/**
 * Configures & exposes `increaseAllowance` method of JPYC contract.
 *
 * @returns Callable object (& related states)
 */
export function useIncreaseAllowance(): UseIncreaseAllowanceResponse {
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
   * Increases `spender` allowance by `increment` JPYC.
   *
   * @param spender Spender address
   * @param increment Amount of JPYC to increase
   */
  const increaseAllowance = async ({
    spender,
    increment,
  }: {
    spender: AddressString;
    increment: number;
  }): Promise<void> => {
    setSdkError(null);

    try {
      if (!isReady) throw new WriteContractNotReady();

      setIsTxSimulating(true);

      const { request } = await simulateContract(wagmiConfig, {
        abi: contractAbi,
        address: contractAddress,
        functionName: CONTRACT_FUNC_NAMES.increaseAllowance,
        args: [spender, scaleUp({ value: increment.toString() })],
        account: userAddress,
      });

      setIsTxSimulating(false);

      writeContract(request);
    } catch (err: unknown) {
      setSdkError(err as Error);
    }
  };

  return {
    increaseAllowance: isReady ? increaseAllowance : undefined,
    isReady,
    isLoading,
    isSuccess,
    error,
    hash: txHash,
    reset,
  };
}
