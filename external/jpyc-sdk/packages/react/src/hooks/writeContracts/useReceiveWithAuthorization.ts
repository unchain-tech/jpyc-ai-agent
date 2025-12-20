'use client';

import { useState } from 'react';
import { Uint256, Uint8 } from 'soltypes';
import { useConfig as useWagmiConfig, useWaitForTransactionReceipt, useWriteContract } from 'wagmi';
import { simulateContract } from 'wagmi/actions';

import { CONTRACT_FUNC_NAMES, WriteContractNotReady, scaleUp } from '../../utils';
import type { AddressString, Bytes32, UseWriteContractResponse } from '../../utils';
import { useConfig } from '..';

/** Type for response from `useReceiveWithAuthorization` hook. */
type UseReceiveWithAuthorizationResponse = UseWriteContractResponse & {
  receiveWithAuthorization?: (args: {
    from: AddressString;
    to: AddressString;
    value: number;
    validAfter: Uint256;
    validBefore: Uint256;
    nonce: Bytes32;
    v: Uint8;
    r: Bytes32;
    s: Bytes32;
  }) => Promise<void>;
};

/**
 * Configures & exposes `receiveWithAuthorization` method of JPYC contract.
 *
 * @returns Callable object (& related states)
 */
export function useReceiveWithAuthorization(): UseReceiveWithAuthorizationResponse {
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
   * Receives `value` JPYC from `from` to `to` with off-chain authorization.
   *
   * @param from Source address
   * @param to Destination address
   * @param value Amount of JPYC to receive
   * @param validAfter Unix time when transaction becomes valid
   * @param validAfter Unix time when transaction becomes invalid
   * @param nonce Unique nonce
   * @param v v of ECDSA
   * @param r r of ECDSA
   * @param s s of ECDSA
   */
  const receiveWithAuthorization = async ({
    from,
    to,
    value,
    validAfter,
    validBefore,
    nonce,
    v,
    r,
    s,
  }: {
    from: AddressString;
    to: AddressString;
    value: number;
    validAfter: Uint256;
    validBefore: Uint256;
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
        functionName: CONTRACT_FUNC_NAMES.receiveWithAuthorization,
        args: [
          from,
          to,
          scaleUp({ value: value.toString() }),
          validAfter,
          validBefore,
          nonce,
          v,
          r,
          s,
        ],
        account: userAddress,
      });

      setIsTxSimulating(false);

      writeContract(request);
    } catch (err: unknown) {
      setSdkError(err as Error);
    }
  };

  return {
    receiveWithAuthorization: isReady ? receiveWithAuthorization : undefined,
    isReady,
    isLoading,
    isSuccess,
    error,
    hash: txHash,
    reset,
  };
}
