[**@jpyc/sdk-core**](../README.md)

---

[@jpyc/sdk-core](../globals.md) / IJPYC

# Interface: IJPYC

Defined in: [src/interfaces/jpyc.ts:6](https://github.com/jcam1/sdks/blob/e250c1c73d308610832de5eeca0f586adc98f249/packages/core/src/interfaces/jpyc.ts#L6)

## Methods

### allowance()

> **allowance**(`owner`): `Promise`\<`number`\>

Defined in: [src/interfaces/jpyc.ts:47](https://github.com/jcam1/sdks/blob/e250c1c73d308610832de5eeca0f586adc98f249/packages/core/src/interfaces/jpyc.ts#L47)

Returns allowance (for spending) of `spender` from the balance of `owner`.

#### Parameters

##### owner

Owner address

###### owner

`` `0x${string}` ``

###### spender

`` `0x${string}` ``

#### Returns

`Promise`\<`number`\>

spender allowance

---

### approve()

> **approve**(`spender`): `Promise`\<`` `0x${string}` ``\>

Defined in: [src/interfaces/jpyc.ts:213](https://github.com/jcam1/sdks/blob/e250c1c73d308610832de5eeca0f586adc98f249/packages/core/src/interfaces/jpyc.ts#L213)

Sets allowance of `spender` from the balance of `owner`.

#### Parameters

##### spender

Spender address

###### spender

`` `0x${string}` ``

###### value

`number`

#### Returns

`Promise`\<`` `0x${string}` ``\>

transaction hash

---

### balanceOf()

> **balanceOf**(`account`): `Promise`\<`number`\>

Defined in: [src/interfaces/jpyc.ts:38](https://github.com/jcam1/sdks/blob/e250c1c73d308610832de5eeca0f586adc98f249/packages/core/src/interfaces/jpyc.ts#L38)

Returns balance of `account`.

#### Parameters

##### account

Account address

###### account

`` `0x${string}` ``

#### Returns

`Promise`\<`number`\>

account balance

---

### cancelAuthorization()

> **cancelAuthorization**(`authorizer`): `Promise`\<`` `0x${string}` ``\>

Defined in: [src/interfaces/jpyc.ts:192](https://github.com/jcam1/sdks/blob/e250c1c73d308610832de5eeca0f586adc98f249/packages/core/src/interfaces/jpyc.ts#L192)

Cancels off-chain authorization.

#### Parameters

##### authorizer

Sender address

###### authorizer

`` `0x${string}` ``

###### nonce

`` `0x${string}` ``

###### r

`` `0x${string}` ``

###### s

`` `0x${string}` ``

###### v

`Uint8`

#### Returns

`Promise`\<`` `0x${string}` ``\>

transaction hash

---

### configureMinter()

> **configureMinter**(`minter`): `Promise`\<`` `0x${string}` ``\>

Defined in: [src/interfaces/jpyc.ts:66](https://github.com/jcam1/sdks/blob/e250c1c73d308610832de5eeca0f586adc98f249/packages/core/src/interfaces/jpyc.ts#L66)

Configures `minter` with allowance of `minterAllowedAmount`.

#### Parameters

##### minter

Minter address

###### minter

`` `0x${string}` ``

###### minterAllowedAmount

`number`

#### Returns

`Promise`\<`` `0x${string}` ``\>

transaction hash

---

### decreaseAllowance()

> **decreaseAllowance**(`spender`): `Promise`\<`` `0x${string}` ``\>

Defined in: [src/interfaces/jpyc.ts:237](https://github.com/jcam1/sdks/blob/e250c1c73d308610832de5eeca0f586adc98f249/packages/core/src/interfaces/jpyc.ts#L237)

Decreases allowance of `spender` by `increment`.

#### Parameters

##### spender

Spender address

###### decrement

`number`

###### spender

`` `0x${string}` ``

#### Returns

`Promise`\<`` `0x${string}` ``\>

transaction hash

---

### increaseAllowance()

> **increaseAllowance**(`spender`): `Promise`\<`` `0x${string}` ``\>

Defined in: [src/interfaces/jpyc.ts:222](https://github.com/jcam1/sdks/blob/e250c1c73d308610832de5eeca0f586adc98f249/packages/core/src/interfaces/jpyc.ts#L222)

Increases allowance of `spender` by `increment`.

#### Parameters

##### spender

Spender address

###### increment

`number`

###### spender

`` `0x${string}` ``

#### Returns

`Promise`\<`` `0x${string}` ``\>

transaction hash

---

### isMinter()

> **isMinter**(`account`): `Promise`\<`boolean`\>

Defined in: [src/interfaces/jpyc.ts:15](https://github.com/jcam1/sdks/blob/e250c1c73d308610832de5eeca0f586adc98f249/packages/core/src/interfaces/jpyc.ts#L15)

Returns true if `account` is a minter.

#### Parameters

##### account

Account address

###### account

`` `0x${string}` ``

#### Returns

`Promise`\<`boolean`\>

true if minter, false otherwise

---

### mint()

> **mint**(`to`): `Promise`\<`` `0x${string}` ``\>

Defined in: [src/interfaces/jpyc.ts:81](https://github.com/jcam1/sdks/blob/e250c1c73d308610832de5eeca0f586adc98f249/packages/core/src/interfaces/jpyc.ts#L81)

Mints `amount` JPYC to `to`.

#### Parameters

##### to

Receiver address

###### amount

`number`

###### to

`` `0x${string}` ``

#### Returns

`Promise`\<`` `0x${string}` ``\>

transaction hash

---

### minterAllowance()

> **minterAllowance**(`minter`): `Promise`\<`number`\>

Defined in: [src/interfaces/jpyc.ts:23](https://github.com/jcam1/sdks/blob/e250c1c73d308610832de5eeca0f586adc98f249/packages/core/src/interfaces/jpyc.ts#L23)

Returns allowance (for minting) of `minter`.

#### Parameters

##### minter

Minter address

###### minter

`` `0x${string}` ``

#### Returns

`Promise`\<`number`\>

minter allowance

---

### nonces()

> **nonces**(`owner`): `Promise`\<`Uint256`\>

Defined in: [src/interfaces/jpyc.ts:55](https://github.com/jcam1/sdks/blob/e250c1c73d308610832de5eeca0f586adc98f249/packages/core/src/interfaces/jpyc.ts#L55)

Returns nonce of `owner` for EIP-2612 "permit".

#### Parameters

##### owner

Owner address

###### owner

`` `0x${string}` ``

#### Returns

`Promise`\<`Uint256`\>

owner nonce

---

### permit()

> **permit**(`owner`): `Promise`\<`` `0x${string}` ``\>

Defined in: [src/interfaces/jpyc.ts:257](https://github.com/jcam1/sdks/blob/e250c1c73d308610832de5eeca0f586adc98f249/packages/core/src/interfaces/jpyc.ts#L257)

Sets allowance of `spender` from the balance of `owner` with off-chain approval.

#### Parameters

##### owner

Owner address

###### deadline

`Uint256`

###### owner

`` `0x${string}` ``

###### r

`` `0x${string}` ``

###### s

`` `0x${string}` ``

###### spender

`` `0x${string}` ``

###### v

`Uint8`

###### value

`number`

#### Returns

`Promise`\<`` `0x${string}` ``\>

transaction hash

---

### receiveWithAuthorization()

> **receiveWithAuthorization**(`from`): `Promise`\<`` `0x${string}` ``\>

Defined in: [src/interfaces/jpyc.ts:160](https://github.com/jcam1/sdks/blob/e250c1c73d308610832de5eeca0f586adc98f249/packages/core/src/interfaces/jpyc.ts#L160)

Receives `value` JPYC from `from` to `to` with off-chain authorization.

#### Parameters

##### from

Sender address

###### from

`` `0x${string}` ``

###### nonce

`` `0x${string}` ``

###### r

`` `0x${string}` ``

###### s

`` `0x${string}` ``

###### to

`` `0x${string}` ``

###### v

`Uint8`

###### validAfter

`Uint256`

###### validBefore

`Uint256`

###### value

`number`

#### Returns

`Promise`\<`` `0x${string}` ``\>

transaction hash

---

### totalSupply()

> **totalSupply**(): `Promise`\<`number`\>

Defined in: [src/interfaces/jpyc.ts:30](https://github.com/jcam1/sdks/blob/e250c1c73d308610832de5eeca0f586adc98f249/packages/core/src/interfaces/jpyc.ts#L30)

Returns total supply of JPYC.

#### Returns

`Promise`\<`number`\>

total supply

---

### transfer()

> **transfer**(`to`): `Promise`\<`` `0x${string}` ``\>

Defined in: [src/interfaces/jpyc.ts:90](https://github.com/jcam1/sdks/blob/e250c1c73d308610832de5eeca0f586adc98f249/packages/core/src/interfaces/jpyc.ts#L90)

Transfers `value` JPYC to `to`.

#### Parameters

##### to

Receiver address

###### to

`` `0x${string}` ``

###### value

`number`

#### Returns

`Promise`\<`` `0x${string}` ``\>

transaction hash

---

### transferFrom()

> **transferFrom**(`from`): `Promise`\<`` `0x${string}` ``\>

Defined in: [src/interfaces/jpyc.ts:100](https://github.com/jcam1/sdks/blob/e250c1c73d308610832de5eeca0f586adc98f249/packages/core/src/interfaces/jpyc.ts#L100)

Transfers `value` JPYC from `from` to `to`.

#### Parameters

##### from

Sender address

###### from

`` `0x${string}` ``

###### to

`` `0x${string}` ``

###### value

`number`

#### Returns

`Promise`\<`` `0x${string}` ``\>

transaction hash

---

### transferWithAuthorization()

> **transferWithAuthorization**(`from`): `Promise`\<`` `0x${string}` ``\>

Defined in: [src/interfaces/jpyc.ts:124](https://github.com/jcam1/sdks/blob/e250c1c73d308610832de5eeca0f586adc98f249/packages/core/src/interfaces/jpyc.ts#L124)

Transfers `value` JPYC from `from` to `to` with off-chain authorization.

#### Parameters

##### from

Sender address

###### from

`` `0x${string}` ``

###### nonce

`` `0x${string}` ``

###### r

`` `0x${string}` ``

###### s

`` `0x${string}` ``

###### to

`` `0x${string}` ``

###### v

`Uint8`

###### validAfter

`Uint256`

###### validBefore

`Uint256`

###### value

`number`

#### Returns

`Promise`\<`` `0x${string}` ``\>

transaction hash
