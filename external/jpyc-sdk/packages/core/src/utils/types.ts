/** Type for valid environment strings. */
export type JpycSdkEnv = 'prod' | 'local';

/** Type for valid contract types. */
export type ContractType = 'jpyc' | 'jpycPrepaid';

/** Type for address string (e.g., 0x123...). */
export type AddressString = `0x${string}`;

/** Type for optional address string. */
export type OptAddressString = AddressString | undefined;

/** Type for bytes32. */
export type Bytes32 = `0x${string}`;
