'use client';

import { useReadContract } from 'wagmi';

import { CONTRACT_FUNC_NAMES, scaleDown } from '../../utils';
import type { AddressString, UseReadContractResponse } from '../../utils';
import { useConfig } from '../';

/** Type for response from `useMinterAllowance` hook. */
type UseMinterAllowanceResponse = UseReadContractResponse & {
  data?: string;
};

/**
 * Returns JPYC allowance of `minter`.
 *
 * @param minter Minter address
 * @param skip True when this hook should be skipped, false otherwise
 * @returns JPYC allowance of `minter` (& related states)
 */
export function useMinterAllowance({
  minter,
  skip = false,
}: {
  minter: AddressString;
  skip?: boolean;
}): UseMinterAllowanceResponse {
  const { contractAbi, contractAddress, userAddress } = useConfig();

  const enabled = !!contractAbi && !!contractAddress && !!userAddress && !skip;

  const {
    data: minterAllowance,
    isPending,
    error,
    refetch,
  } = useReadContract({
    abi: contractAbi,
    address: contractAddress,
    functionName: CONTRACT_FUNC_NAMES.minterAllowance,
    args: [minter],
    query: { enabled },
    account: userAddress,
  });

  return {
    data:
      minterAllowance !== undefined ? scaleDown({ value: minterAllowance as bigint }) : undefined,
    isPending,
    error,
    refetch,
  };
}
