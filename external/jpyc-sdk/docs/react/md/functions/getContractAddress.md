[**@jpyc/sdk-react**](../README.md)

---

[@jpyc/sdk-react](../globals.md) / getContractAddress

# Function: getContractAddress()

> **getContractAddress**(`__namedParameters`): `undefined` \| `` `0x${string}` ``

Defined in: [src/utils/addresses.ts:22](https://github.com/jcam1/sdks/blob/e9f7b0b78927be622d601cd84fb3a838078d2eb3/packages/react/src/utils/addresses.ts#L22)

Returns contract address given SDK env string and contract type.

## Parameters

### \_\_namedParameters

#### contractType

[`ContractType`](../type-aliases/ContractType.md)

#### env

[`JpycSdkEnv`](../type-aliases/JpycSdkEnv.md)

#### localContractAddress

[`OptAddressString`](../type-aliases/OptAddressString.md)

## Returns

`undefined` \| `` `0x${string}` ``

Contract address (or `undefined` if inputs are invalid)
