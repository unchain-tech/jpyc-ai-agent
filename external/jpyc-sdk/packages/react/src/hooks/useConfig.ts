import { useContext } from 'react';
import type { Abi } from 'viem';
import { useAccount, useChainId } from 'wagmi';

import { SdkContext } from '../configs';
import {
  ConnectedChainNotSupported,
  ContractTypeInvalid,
  ContractTypeUndefined,
  getContractAbi,
  getContractAddress,
  isSupportedChain,
  JpycSdkContextUndefined,
  JpycSdkEnvInvalid,
  JpycSdkEnvUndefined,
} from '../utils';
import type { AddressString, ContractType, JpycSdkEnv } from '../utils';

/** Type for response from `useConfig` hook. */
interface UseConfigResponse {
  contractAbi: Abi | undefined;
  contractAddress: AddressString | undefined;
  chainId: number;
  userAddress: AddressString | undefined;
  connectionStatus: 'disconnected' | 'connected' | 'reconnecting' | 'connecting';
}

/**
 * Returns SDK configs (used across hooks).
 *
 * @returns SDK configs
 */
export function useConfig(): UseConfigResponse {
  const ctx = useContext(SdkContext);
  if (ctx === undefined) throw new JpycSdkContextUndefined();

  const env = validateJpycSdkEnv({ env: ctx.env });
  const contractType = validateContractType({ contractType: ctx.contractType });
  const localContractAddress = ctx.localContractAddress;

  const contractAddress = getContractAddress({ env, contractType, localContractAddress });
  const contractAbi = getContractAbi({ contractType });

  const chainId = useChainId();
  if (!isSupportedChain({ chainId })) throw new ConnectedChainNotSupported({ chainId });

  const { address: userAddress, status: connectionStatus } = useAccount();

  return {
    contractAbi,
    contractAddress,
    chainId,
    userAddress,
    connectionStatus,
  };
}

/**
 * Validates the given env string.
 *
 * Throws custom errors when it fails to validate the given env string.
 *
 * @param env Env string to be checked
 * @returns Env string
 */
function validateJpycSdkEnv({ env }: { env: string | undefined }): JpycSdkEnv {
  if (env === undefined) {
    throw new JpycSdkEnvUndefined();
  } else if (env !== 'prod' && env !== 'local') {
    throw new JpycSdkEnvInvalid({ env });
  }

  return env;
}

/**
 * Validates the given contract type.
 *
 * Throws custom errors when it fails to validate the given contract type.
 *
 * @param contractType Contract type to be checked
 * @returns Contract type
 */
function validateContractType({
  contractType,
}: {
  contractType: string | undefined;
}): ContractType {
  if (contractType === undefined) {
    throw new ContractTypeUndefined();
  } else if (contractType !== 'jpyc' && contractType !== 'jpycPrepaid') {
    throw new ContractTypeInvalid({ contractType });
  }

  return contractType;
}
