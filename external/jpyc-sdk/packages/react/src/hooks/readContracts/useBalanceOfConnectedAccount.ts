'use client';

import { useReadContract } from 'wagmi';

import { CONTRACT_FUNC_NAMES, scaleDown } from '../../utils';
import type { UseReadContractResponse } from '../../utils';
import { useConfig } from '../';

/** Type for response from `useBalanceOfConnectedAccount` hook. */
type UseBalanceOfConnectedAccountResponse = UseReadContractResponse & {
  data?: string;
};

/**
 * Returns JPYC balance of the connected account.
 *
 * @param skip True when this hook should be skipped, false otherwise
 * @returns JPYC balance of the connected account (& related states)
 */
export function useBalanceOfConnectedAccount({
  skip = false,
}: {
  skip?: boolean;
}): UseBalanceOfConnectedAccountResponse {
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
    args: [userAddress],
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
