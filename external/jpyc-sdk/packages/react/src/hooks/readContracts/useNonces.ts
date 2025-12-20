'use client';

import { useReadContract } from 'wagmi';

import { CONTRACT_FUNC_NAMES } from '../../utils';
import type { AddressString, UseReadContractResponse } from '../../utils';
import { useConfig } from '../';

/** Type for response from `useNonces` hook. */
type UseNoncesResponse = UseReadContractResponse & {
  data?: bigint;
};

/**
 * Returns EIP2612 nonce of `owner`.
 *
 * @param owner Owner address
 * @param skip True when this hook should be skipped, false otherwise
 * @returns EIP2612 nonce of `owner` (& related states)
 */
export function useNonces({
  owner,
  skip = false,
}: {
  owner: AddressString;
  skip?: boolean;
}): UseNoncesResponse {
  const { contractAbi, contractAddress, userAddress } = useConfig();

  const enabled = !!contractAbi && !!contractAddress && !!userAddress && !skip;

  const {
    data: nonce,
    isPending,
    error,
    refetch,
  } = useReadContract({
    abi: contractAbi,
    address: contractAddress,
    functionName: CONTRACT_FUNC_NAMES.nonces,
    args: [owner],
    query: { enabled },
    account: userAddress,
  });

  return {
    data: nonce !== undefined ? (nonce as bigint) : undefined,
    isPending,
    error,
    refetch,
  };
}
