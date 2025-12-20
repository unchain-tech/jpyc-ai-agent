[**@jpyc/sdk-core**](../README.md)

---

[@jpyc/sdk-core](../globals.md) / removeDecimals

# Function: removeDecimals()

> **removeDecimals**(`value`): `Uint256`

Defined in: [src/utils/math.ts:23](https://github.com/jcam1/sdks/blob/5f068ba286accc1978d642fa0979e9b2c95a312e/packages/core/src/utils/math.ts#L23)

Removes decimal places to make sure that only integer values live on-chain.
e.g.)
0.01 -> 10,000,000,000,000,000
100 -> 100,000,000,000,000,000,000

## Parameters

### value

`number`

integer or decimal value

## Returns

`Uint256`

value as uint256
