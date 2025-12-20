'use client';

import { useReadContract } from 'wagmi';

import { CONTRACT_FUNC_NAMES } from '../../utils';
import type { AddressString, UseReadContractResponse } from '../../utils';
import { useConfig } from '../';

/** Type for response from `useIsMinter` hook. */
type UseIsMinterResponse = UseReadContractResponse & {
  data?: boolean;
};

/**
 * Returns if `account` is a minter.
 *
 * @param account Account address
 * @param skip True when this hook should be skipped, false otherwise
 * @returns True if `account` is a minter, false otherwise (& related states)
 */
export function useIsMinter({
  account,
  skip = false,
}: {
  account: AddressString;
  skip?: boolean;
}): UseIsMinterResponse {
  const { contractAbi, contractAddress, userAddress } = useConfig();

  const enabled = !!contractAbi && !!contractAddress && !!userAddress && !skip;

  const {
    data: isMinter,
    isPending,
    error,
    refetch,
  } = useReadContract({
    abi: contractAbi,
    address: contractAddress,
    functionName: CONTRACT_FUNC_NAMES.isMinter,
    args: [account],
    query: { enabled },
    account: userAddress,
  });

  return {
    data: isMinter !== undefined ? (isMinter as boolean) : undefined,
    isPending,
    error,
    refetch,
  };
}
