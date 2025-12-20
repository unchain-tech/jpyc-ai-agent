'use client';

import { useState } from 'react';
import { Uint256, Uint8 } from 'soltypes';
import { useConfig as useWagmiConfig, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { simulateContract } from 'wagmi/actions';

import { CONTRACT_FUNC_NAMES, WriteContractNotReady, scaleUp } from '../../utils';
import type { AddressString, Bytes32, UseWriteContractResponse } from '../../utils';
import { useConfig } from '..';

/** Type for response from `usePermit` hook. */
type UsePermitResponse = UseWriteContractResponse & {
  permit?: (args: {
    owner: AddressString;
    spender: AddressString;
    value: number;
    deadline: Uint256;
    v: Uint8;
    r: Bytes32;
    s: Bytes32;
  }) => Promise<void>;
};

/**
 * Configures & exposes `permit` method of JPYC contract.
 *
 * @returns Callable object (& related states)
 */
export function usePermit(): UsePermitResponse {
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
   * Permits `value` JPYC of `owner` for `spender`.
   *
   * @param owner Owner address
   * @param spender Spender address
   * @param value Amount of JPYC to permit
   * @param deadline Unix time when transaction becomes invalid
   * @param v v of ECDSA
   * @param r r of ECDSA
   * @param s s of ECDSA
   */
  const permit = async ({
    owner,
    spender,
    value,
    deadline,
    v,
    r,
    s,
  }: {
    owner: AddressString;
    spender: AddressString;
    value: number;
    deadline: Uint256;
    v: Uint8;
    r: Bytes32;
    s: Bytes32;
  }): Promise<void> => {
    setSdkError(null);

    try {
      if (!isReady) throw new WriteContractNotReady();

      setIsTxSimulating(true);

      const { request } = await simulateContract(wagmiConfig, {
        abi: contractAbi,
        address: contractAddress,
        functionName: CONTRACT_FUNC_NAMES.permit,
        args: [owner, spender, scaleUp({ value: value.toString() }), deadline, v, r, s],
        account: userAddress,
      });

      setIsTxSimulating(false);

      writeContract(request);
    } catch (err: unknown) {
      setSdkError(err as Error);
    }
  };

  return {
    permit: isReady ? permit : undefined,
    isReady,
    isLoading,
    isSuccess,
    error,
    hash: txHash,
    reset,
  };
}
