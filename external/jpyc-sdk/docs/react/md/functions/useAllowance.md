[**@jpyc/sdk-react**](../README.md)

---

[@jpyc/sdk-react](../globals.md) / useAllowance

# Function: useAllowance()

> **useAllowance**(`__namedParameters`): `UseAllowanceResponse`

Defined in: [src/hooks/readContracts/useAllowance.ts:22](https://github.com/jcam1/sdks/blob/e9f7b0b78927be622d601cd84fb3a838078d2eb3/packages/react/src/hooks/readContracts/useAllowance.ts#L22)

Returns JPYC allowance of `spender` from the balance of `owner`.

## Parameters

### \_\_namedParameters

#### owner

`` `0x${string}` ``

#### skip?

`boolean` = `false`

#### spender

`` `0x${string}` ``

## Returns

`UseAllowanceResponse`

JPYC allowance of `spender` from the balance of `owner` (& related states)
