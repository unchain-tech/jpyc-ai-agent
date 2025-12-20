[**@jpyc/sdk-core**](../README.md)

---

[@jpyc/sdk-core](../globals.md) / restoreDecimals

# Function: restoreDecimals()

> **restoreDecimals**(`value`): `number`

Defined in: [src/utils/math.ts:35](https://github.com/jcam1/sdks/blob/5f068ba286accc1978d642fa0979e9b2c95a312e/packages/core/src/utils/math.ts#L35)

Restores decimal places (mainly for display purpose).
e.g.)
10,000,000,000,000,000 -> 0.01
100,000,000,000,000,000,000 -> 100

## Parameters

### value

`Uint256`

uint256 value

## Returns

`number`

value as number (i.e., integer or decimal)
