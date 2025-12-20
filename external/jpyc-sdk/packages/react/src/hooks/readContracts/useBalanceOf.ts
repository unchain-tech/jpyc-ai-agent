'use client';

import { useReadContract } from 'wagmi';

import { CONTRACT_FUNC_NAMES, scaleDown } from '../../utils';
import type { AddressString, UseReadContractResponse } from '../../utils';
import { useConfig } from '../';

/** Type for response from `useBalanceOf` hook. */
type UseBalanceOfResponse = UseReadContractResponse & {
  data?: string;
};

/**
 * Returns JPYC balance of `account`.
 *
 * @param account Account address
 * @param skip True when this hook should be skipped, false otherwise
 * @returns JPYC balance of `account` (& related states)
 */
export function useBalanceOf({
  account,
  skip = false,
}: {
  account: AddressString;
  skip?: boolean;
}): UseBalanceOfResponse {
  const { contractAbi, contractAddress, userAddress } = useConfig();

  const enabled = !!contractAbi && !!contractAddress && !!userAddress && !skip;

  const {
    data: balanceOf,
    isPending,
    error,
    refetch,
  } = useReadContract({
    abi: contractAbi,
    address: contractAddress,
    functionName: CONTRACT_FUNC_NAMES.balanceOf,
    args: [account],
    query: { enabled },
    account: userAddress,
  });

  return {
    data: balanceOf !== undefined ? scaleDown({ value: balanceOf as bigint }) : undefined,
    isPending,
    error,
    refetch,
  };
}
