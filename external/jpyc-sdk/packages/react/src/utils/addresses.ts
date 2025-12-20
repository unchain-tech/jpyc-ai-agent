import { isAddress } from 'viem';

import { AddressString, ContractType, JpycSdkEnv, OptAddressString } from './';

/** Zero address. */
export const ZERO_ADDRESS: AddressString = '0x0000000000000000000000000000000000000000';

/** Proxy address of JPYC contract. */
const JPYC_PROXY_ADDRESS = '0xE7C3D8C9a439feDe00D2600032D5dB0Be71C3c29';

/** Proxy address of JPYC prepaid contract. */
const JPYC_PREPAID_PROXY_ADDRESS: AddressString = '0x431D5dfF03120AFA4bDf332c61A6e1766eF37BDB';

/**
 * Returns contract address given SDK env string and contract type.
 *
 * @param env Environment string (either `prod` or `local`)
 * @param contractType Contract type (either `jpyc` or `jpycPrepaid`)
 * @param localContractAddress Locally-deployed contract address
 * @returns Contract address (or `undefined` if inputs are invalid)
 */
export function getContractAddress({
  env,
  contractType,
  localContractAddress,
}: {
  env: JpycSdkEnv;
  contractType: ContractType;
  localContractAddress: OptAddressString;
}): AddressString | undefined {
  switch (env) {
    case 'local':
      if (isValidAddress({ address: localContractAddress })) {
        return localContractAddress;
      }
      break;
    case 'prod':
      if (contractType === 'jpyc') {
        return JPYC_PROXY_ADDRESS;
      }
      return JPYC_PREPAID_PROXY_ADDRESS;
    default:
      break;
  }

  return undefined;
}

/**
 * Returns true if the given address is valid, false otherwise.
 *
 * @param address Address string to be checked
 * @returns True if valid address, false otherwise
 */
function isValidAddress({ address }: { address: OptAddressString }): boolean {
  if (address === undefined) return false;

  return isAddress(address, { strict: true });
}
