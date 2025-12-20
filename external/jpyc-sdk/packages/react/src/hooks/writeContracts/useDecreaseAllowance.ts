'use client';

import { useState } from 'react';
import { useConfig as useWagmiConfig, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { simulateContract } from 'wagmi/actions';

import { CONTRACT_FUNC_NAMES, WriteContractNotReady, scaleUp } from '../../utils';
import type { AddressString, UseWriteContractResponse } from '../../utils';
import { useConfig } from '..';

/** Type for response from `useDecreaseAllowance` hook. */
type UseDecreaseAllowanceResponse = UseWriteContractResponse & {
  decreaseAllowance?: (args: { spender: AddressString; decrement: number }) => Promise<void>;
};

/**
 * Configures & exposes `decreaseAllowance` method of JPYC contract.
 *
 * @returns Callable object (& related states)
 */
export function useDecreaseAllowance(): UseDecreaseAllowanceResponse {
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
   * Decreases `spender` allowance by `increment` JPYC.
   *
   * @param spender Spender address
   * @param decrement Amount of JPYC to decrease
   */
  const decreaseAllowance = async ({
    spender,
    decrement,
  }: {
    spender: AddressString;
    decrement: number;
  }): Promise<void> => {
    setSdkError(null);

    try {
      if (!isReady) throw new WriteContractNotReady();

      setIsTxSimulating(true);

      const { request } = await simulateContract(wagmiConfig, {
        abi: contractAbi,
        address: contractAddress,
        functionName: CONTRACT_FUNC_NAMES.decreaseAllowance,
        args: [spender, scaleUp({ value: decrement.toString() })],
        account: userAddress,
      });

      setIsTxSimulating(false);

      writeContract(request);
    } catch (err: unknown) {
      setSdkError(err as Error);
    }
  };

  return {
    decreaseAllowance: isReady ? decreaseAllowance : undefined,
    isReady,
    isLoading,
    isSuccess,
    error,
    hash: txHash,
    reset,
  };
}
