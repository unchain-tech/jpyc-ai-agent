[**@jpyc/sdk-react**](../README.md)

---

[@jpyc/sdk-react](../globals.md) / UseReadContractResponse

# Interface: UseReadContractResponse

Defined in: [src/utils/types.ts:35](https://github.com/jcam1/sdks/blob/e9f7b0b78927be622d601cd84fb3a838078d2eb3/packages/react/src/utils/types.ts#L35)

Type for common response from wagmi's `useReactContract` hook.

## Properties

### error

> **error**: `null` \| `ReadContractErrorType`

Defined in: [src/utils/types.ts:37](https://github.com/jcam1/sdks/blob/e9f7b0b78927be622d601cd84fb3a838078d2eb3/packages/react/src/utils/types.ts#L37)

---

### isPending

> **isPending**: `boolean`

Defined in: [src/utils/types.ts:36](https://github.com/jcam1/sdks/blob/e9f7b0b78927be622d601cd84fb3a838078d2eb3/packages/react/src/utils/types.ts#L36)

---

### refetch()

> **refetch**: () => `Promise`\<`QueryObserverResult`\<`unknown`, `ReadContractErrorType`\>\>

Defined in: [src/utils/types.ts:38](https://github.com/jcam1/sdks/blob/e9f7b0b78927be622d601cd84fb3a838078d2eb3/packages/react/src/utils/types.ts#L38)

#### Returns

`Promise`\<`QueryObserverResult`\<`unknown`, `ReadContractErrorType`\>\>
