'use client';

import { useReadContract } from 'wagmi';

import { CONTRACT_FUNC_NAMES, scaleDown } from '../../utils';
import type { UseReadContractResponse } from '../../utils';
import { useConfig } from '../';

/** Type for response from `useTotalSupply` hook. */
type UseTotalSupplyResponse = UseReadContractResponse & {
  data?: string;
};

/**
 * Returns total supply of JPYC.
 *
 * @param skip True when this hook should be skipped, false otherwise
 * @returns Total supply of JPYC (& related states)
 */
export function useTotalSupply({
  skip = false,
}: {
  skip?: boolean;
}): UseTotalSupplyResponse | undefined {
  const { contractAbi, contractAddress, userAddress } = useConfig();

  const enabled = !!contractAbi && !!contractAddress && !!userAddress && !skip;

  const {
    data: totalSupply,
    isPending,
    error,
    refetch,
  } = useReadContract({
    abi: contractAbi,
    address: contractAddress,
    functionName: CONTRACT_FUNC_NAMES.totalSupply,
    args: [],
    query: { enabled },
    account: userAddress,
  });

  return {
    data: totalSupply !== undefined ? scaleDown({ value: totalSupply as bigint }) : undefined,
    isPending,
    error,
    refetch,
  };
}
