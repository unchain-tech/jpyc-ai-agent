'use client';

import { useReadContract } from 'wagmi';

import { CONTRACT_FUNC_NAMES, scaleDown } from '../../utils';
import type { AddressString, UseReadContractResponse } from '../../utils';
import { useConfig } from '../';

/** Type for response from `useAllowance` hook. */
type UseAllowanceResponse = UseReadContractResponse & {
  data?: string;
};

/**
 * Returns JPYC allowance of `spender` from the balance of `owner`.
 *
 * @param owner Owner address
 * @param spender Spender address
 * @param skip True when this hook should be skipped, false otherwise
 * @returns JPYC allowance of `spender` from the balance of `owner` (& related states)
 */
export function useAllowance({
  owner,
  spender,
  skip = false,
}: {
  owner: AddressString;
  spender: AddressString;
  skip?: boolean;
}): UseAllowanceResponse {
  const { contractAbi, contractAddress, userAddress } = useConfig();

  const enabled = !!contractAbi && !!contractAddress && !!userAddress && !skip;

  const {
    data: allowance,
    isPending,
    error,
    refetch,
  } = useReadContract({
    abi: contractAbi,
    address: contractAddress,
    functionName: CONTRACT_FUNC_NAMES.allowance,
    args: [owner, spender],
    query: { enabled },
    account: userAddress,
  });

  return {
    data: allowance !== undefined ? scaleDown({ value: allowance as bigint }) : undefined,
    isPending,
    error,
    refetch,
  };
}
