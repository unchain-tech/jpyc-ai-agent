'use client';

import { useState } from 'react';
import { useConfig as useWagmiConfig, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { simulateContract } from 'wagmi/actions';

import { CONTRACT_FUNC_NAMES, WriteContractNotReady, scaleUp } from '../../utils';
import type { AddressString, UseWriteContractResponse } from '../../utils';
import { useConfig } from '..';

/** Type for response from `useConfigureMinter` hook. */
type UseConfigureMinterResponse = UseWriteContractResponse & {
  configureMinter?: (args: { minter: AddressString; minterAllowedAmount: number }) => Promise<void>;
};

/**
 * Configures & exposes `configureMinter` method of JPYC contract.
 *
 * @returns Callable object (& related states)
 */
export function useConfigureMinter(): UseConfigureMinterResponse {
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
   * Configures `minter` with `minterAllowedAmount` JPYC allowance.
   *
   * @param minter Minter address
   * @param minterAllowedAmount Amount of JPYC minter is allowed to use
   */
  const configureMinter = async ({
    minter,
    minterAllowedAmount,
  }: {
    minter: AddressString;
    minterAllowedAmount: number;
  }): Promise<void> => {
    setSdkError(null);

    try {
      if (!isReady) throw new WriteContractNotReady();

      setIsTxSimulating(true);

      const { request } = await simulateContract(wagmiConfig, {
        abi: contractAbi,
        address: contractAddress,
        functionName: CONTRACT_FUNC_NAMES.configureMinter,
        args: [minter, scaleUp({ value: minterAllowedAmount.toString() })],
        account: userAddress,
      });

      setIsTxSimulating(false);

      writeContract(request);
    } catch (err: unknown) {
      setSdkError(err as Error);
    }
  };

  return {
    configureMinter: isReady ? configureMinter : undefined,
    isReady,
    isLoading,
    isSuccess,
    error,
    hash: txHash,
    reset,
  };
}
