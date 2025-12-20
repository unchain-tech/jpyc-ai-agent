[**@jpyc/sdk-core**](../README.md)

---

[@jpyc/sdk-core](../globals.md) / getContractAbi

# Function: getContractAbi()

> **getContractAbi**(`contractType`): `Abi` \| `undefined`

Defined in: [src/utils/abis.ts:13](https://github.com/jcam1/sdks/blob/e250c1c73d308610832de5eeca0f586adc98f249/packages/core/src/utils/abis.ts#L13)

Returns contract ABI given contract type.

## Parameters

### contractType

Contract type (either `jpyc` or `jpycPrepaid`)

#### contractType

[`ContractType`](../type-aliases/ContractType.md)

## Returns

`Abi` \| `undefined`

Contract ABI (or `undefined` if inputs are invalid)
