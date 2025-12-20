import type { PropsWithChildren } from 'react';
import { ReadContractErrorType } from 'viem';
import { QueryObserverResult } from '@tanstack/react-query';

/** Type for address string (e.g., 0x123...). */
export type AddressString = `0x${string}`;

/** Type for optional address string. */
export type OptAddressString = AddressString | undefined;

/** Type for bytes32. */
export type Bytes32 = `0x${string}`;

/** Type for valid environment strings. */
export type JpycSdkEnv = 'prod' | 'local';

/** Type for valid contract types. */
export type ContractType = 'jpyc' | 'jpycPrepaid';

/** Type for SDK context. */
export interface JpycSdkContext {
  env?: JpycSdkEnv;
  contractType?: ContractType;
  localContractAddress?: OptAddressString;
}

/** Type for SDK provider. */
export type JpycSdkProviderProps = PropsWithChildren<
  JpycSdkContext & {
    rpcs?: Record<number, string>;
  }
>;

/** Type for common response from wagmi's `useReactContract` hook. */
export interface UseReadContractResponse {
  isPending: boolean;
  error: ReadContractErrorType | null;
  refetch: () => Promise<QueryObserverResult<unknown, ReadContractErrorType>>;
}

/** Type for common response from wagmi's `useWriteContract` hook. */
export interface UseWriteContractResponse {
  isReady: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  error: Error | null;
  hash: OptAddressString;
  reset: () => void;
}
