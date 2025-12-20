[**@jpyc/sdk-core**](../README.md)

---

[@jpyc/sdk-core](../globals.md) / getContractAddress

# Function: getContractAddress()

> **getContractAddress**(`env`): [`OptAddressString`](../type-aliases/OptAddressString.md)

Defined in: [src/utils/addresses.ts:22](https://github.com/jcam1/sdks/blob/e250c1c73d308610832de5eeca0f586adc98f249/packages/core/src/utils/addresses.ts#L22)

Returns contract address given SDK env string and contract type.

## Parameters

### env

Environment string (either `prod` or `local`)

#### contractType

[`ContractType`](../type-aliases/ContractType.md)

#### env

[`JpycSdkEnv`](../type-aliases/JpycSdkEnv.md)

#### localContractAddress

[`OptAddressString`](../type-aliases/OptAddressString.md)

## Returns

[`OptAddressString`](../type-aliases/OptAddressString.md)

Contract address (or `undefined` if inputs are invalid)
