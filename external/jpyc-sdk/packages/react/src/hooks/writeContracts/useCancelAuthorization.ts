'use client';

import { useState } from 'react';
import { Uint8 } from 'soltypes';
import { useConfig as useWagmiConfig, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { simulateContract } from 'wagmi/actions';

import { CONTRACT_FUNC_NAMES, WriteContractNotReady } from '../../utils';
import type { AddressString, Bytes32, UseWriteContractResponse } from '../../utils';
import { useConfig } from '..';

/** Type for response from `useCancelAuthorization` hook. */
type UseCancelAuthorizationResponse = UseWriteContractResponse & {
  cancelAuthorization?: (args: {
    authorizer: AddressString;
    nonce: Bytes32;
    v: Uint8;
    r: Bytes32;
    s: Bytes32;
  }) => Promise<void>;
};

/**
 * Configures & exposes `cancelAuthorization` method of JPYC contract.
 *
 * @returns Callable object (& related states)
 */
export function useCancelAuthorization(): UseCancelAuthorizationResponse {
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
   * Cancels off-chain authorization.
   *
   * @param authorizer Authorizer address
   * @param nonce Unique nonce
   * @param v v of ECDSA
   * @param r r of ECDSA
   * @param s s of ECDSA
   */
  const cancelAuthorization = async ({
    authorizer,
    nonce,
    v,
    r,
    s,
  }: {
    authorizer: AddressString;
    nonce: Bytes32;
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
        functionName: CONTRACT_FUNC_NAMES.cancelAuthorization,
        args: [authorizer, nonce, v, r, s],
        account: userAddress,
      });

      setIsTxSimulating(false);

      writeContract(request);
    } catch (err: unknown) {
      setSdkError(err as Error);
    }
  };

  return {
    cancelAuthorization: isReady ? cancelAuthorization : undefined,
    isReady,
    isLoading,
    isSuccess,
    error,
    hash: txHash,
    reset,
  };
}
