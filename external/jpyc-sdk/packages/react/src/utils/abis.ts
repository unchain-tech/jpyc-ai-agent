import type { Abi } from 'viem';

import ArtifactsJPYC from '../artifacts/contracts/JPYC.json';
import ArtifactsJPYCPrepaid from '../artifacts/contracts/JPYCPrepaid.json';
import { ContractType } from './';

/**
 * Returns contract ABI given contract type.
 *
 * @param contractType Contract type (either `jpyc` or `jpycPrepaid`)
 * @returns Contract ABI (or `undefined` if inputs are invalid)
 */
export function getContractAbi({ contractType }: { contractType: ContractType }): Abi | undefined {
  switch (contractType) {
    case 'jpyc':
      return ArtifactsJPYC.abi as Abi;
    case 'jpycPrepaid':
      return ArtifactsJPYCPrepaid.abi as Abi;
    default:
      break;
  }

  return undefined;
}
