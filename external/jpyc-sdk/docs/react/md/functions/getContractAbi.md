[**@jpyc/sdk-react**](../README.md)

---

[@jpyc/sdk-react](../globals.md) / getContractAbi

# Function: getContractAbi()

> **getContractAbi**(`contractType`): `undefined` \| `Abi`

Defined in: [src/utils/abis.ts:13](https://github.com/jcam1/sdks/blob/e9f7b0b78927be622d601cd84fb3a838078d2eb3/packages/react/src/utils/abis.ts#L13)

Returns contract ABI given contract type.

## Parameters

### contractType

Contract type (either `jpyc` or `jpycPrepaid`)

#### contractType

[`ContractType`](../type-aliases/ContractType.md)

## Returns

`undefined` \| `Abi`

Contract ABI (or `undefined` if inputs are invalid)
