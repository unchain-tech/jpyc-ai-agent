[**@jpyc/sdk-core**](../README.md)

---

[@jpyc/sdk-core](../globals.md) / JPYC

# Class: JPYC

Defined in: [src/jpyc.ts:21](https://github.com/jcam1/sdks/blob/e250c1c73d308610832de5eeca0f586adc98f249/packages/core/src/jpyc.ts#L21)

## Implements

- [`IJPYC`](../interfaces/IJPYC.md)

## Constructors

### Constructor

> **new JPYC**(`env`): `JPYC`

Defined in: [src/jpyc.ts:32](https://github.com/jcam1/sdks/blob/e250c1c73d308610832de5eeca0f586adc98f249/packages/core/src/jpyc.ts#L32)

Constructor of a `JPYC` instance.

#### Parameters

##### env

Environment string (either `prod` or `local`)

###### client

\{ `account`: `Account` \| `undefined`; `addChain`: (`args`) => `Promise`\<`void`\>; `batch?`: \{ `multicall?`: `boolean` \| \{ `batchSize?`: `number`; `deployless?`: `boolean`; `wait?`: `number`; \}; \}; `cacheTime`: `number`; `ccipRead?`: `false` \| \{ `request?`: (`parameters`) => `Promise`\<`` `0x${string}` ``\>; \}; `chain`: `Chain` \| `undefined`; `deployContract`: \<`abi`, `chainOverride`\>(`args`) => `Promise`\<`` `0x${string}` ``\>; `experimental_blockTag?`: `BlockTag`; `extend`: \<`client`\>(`fn`) => `Client`\<`Transport`, `Chain` \| `undefined`, `Account` \| `undefined`, `WalletRpcSchema`, \{ \[K in string \| number \| symbol\]: client\[K\] \} & `WalletActions`\<`Chain` \| `undefined`, `Account` \| `undefined`\>\>; `getAddresses`: () => `Promise`\<`GetAddressesReturnType`\>; `getCallsStatus`: (`parameters`) => `Promise`\<\{ `atomic`: `boolean`; `capabilities?`: \{\[`key`: `string`\]: `any`; \} \| \{\[`key`: `string`\]: `any`; \}; `chainId`: `number`; `id`: `string`; `receipts?`: `WalletCallReceipt`\<`bigint`, `"success"` \| `"reverted"`\>[]; `status`: `"pending"` \| `"success"` \| `"failure"` \| `undefined`; `statusCode`: `number`; `version`: `string`; \}\>; `getCapabilities`: \<`chainId`\>(`parameters?`) => `Promise`\<\{ \[K in string \| number \| symbol\]: (chainId extends number ? \{ atomic?: \{ status: (...) \| (...) \| (...) \}; paymasterService?: \{ supported: boolean \}; unstable*addSubAccount?: \{ keyTypes: (...)\[\]; supported: boolean \}; \[key: string\]: any \} : ChainIdToCapabilities\<Capabilities\<\{ atomic?: (...) \| (...); paymasterService?: (...) \| (...); unstable_addSubAccount?: (...) \| (...); \[key: string\]: any \}\>, number\>)\[K\] \}\>; `getChainId`: () => `Promise`\<`number`\>; `getPermissions`: () => `Promise`\<`GetPermissionsReturnType`\>; `key`: `string`; `name`: `string`; `pollingInterval`: `number`; `prepareAuthorization`: (`parameters`) => `Promise`\<`PrepareAuthorizationReturnType`\>; `prepareTransactionRequest`: \<`request`, `chainOverride`, `accountOverride`\>(`args`) => `Promise`\<\{ \[K in string \| number \| symbol\]: (UnionRequiredBy\<Extract\<(...) & (...) & (...), (...) extends (...) ? (...) : (...)\> & \{ chainId?: (...) \| (...) \}, ParameterTypeToParameters\<(...)\[(...)\] extends readonly (...)\[\] ? (...)\[(...)\] : (...) \| (...) \| (...) \| (...) \| (...) \| (...)\>\> & (unknown extends request\["kzg"\] ? \{\} : Pick\<request, "kzg"\>))\[K\] \}\>; `request`: `EIP1193RequestFn`\<`WalletRpcSchema`\>; `requestAddresses`: () => `Promise`\<`RequestAddressesReturnType`\>; `requestPermissions`: (`args`) => `Promise`\<`RequestPermissionsReturnType`\>; `sendCalls`: \<`calls`, `chainOverride`\>(`parameters`) => `Promise`\<\{ `capabilities?`: \{\[`key`: `string`\]: `any`; \}; `id`: `string`; \}\>; `sendCallsSync`: \<`calls`, `chainOverride`\>(`parameters`) => `Promise`\<\{ `atomic`: `boolean`; `capabilities?`: \{\[`key`: `string`\]: `any`; \} \| \{\[`key`: `string`\]: `any`; \}; `chainId`: `number`; `id`: `string`; `receipts?`: `WalletCallReceipt`\<`bigint`, `"success"` \| `"reverted"`\>[]; `status`: `"pending"` \| `"success"` \| `"failure"` \| `undefined`; `statusCode`: `number`; `version`: `string`; \}\>; `sendRawTransaction`: (`args`) => `Promise`\<`` `0x${string}` ``\>; `sendRawTransactionSync`: (`args`) => `Promise`\<`TransactionReceipt`\>; `sendTransaction`: \<`request`, `chainOverride`\>(`args`) => `Promise`\<`` `0x${string}` ``\>; `sendTransactionSync`: \<`request`, `chainOverride`\>(`args`) => `Promise`\<`TransactionReceipt`\>; `showCallsStatus`: (`parameters`) => `Promise`\<`void`\>; `signAuthorization`: (`parameters`) => `Promise`\<`SignAuthorizationReturnType`\>; `signMessage`: (`args`) => `Promise`\<`` `0x${string}` ``\>; `signTransaction`: \<`chainOverride`, `request`\>(`args`) => `Promise`\<`TransactionSerialized`\<`GetTransactionType`\<`request`, `request` \_extends* `LegacyProperties` ? `"legacy"` : `never` \| `request` _extends_ `EIP1559Properties` ? `"eip1559"` : `never` \| `request` _extends_ `EIP2930Properties` ? `"eip2930"` : `never` \| `request` _extends_ `EIP4844Properties` ? `"eip4844"` : `never` \| `request` _extends_ `EIP7702Properties` ? `"eip7702"` : `never` \| `request`\[`"type"`\] _extends_ `string` \| `undefined` ? `Extract`\<`any`\[`any`\], `string`\> : `never`\>, `GetTransactionType`\<`request`, `request` _extends_ `LegacyProperties` ? `"legacy"` : `never` \| `request` _extends_ `EIP1559Properties` ? `"eip1559"` : `never` \| `request` _extends_ `EIP2930Properties` ? `"eip2930"` : `never` \| `request` _extends_ `EIP4844Properties` ? `"eip4844"` : `never` \| `request` _extends_ `EIP7702Properties` ? `"eip7702"` : `never` \| ...\[...\] _extends_ ... \| ... ? `Extract`\<..., ...\> : `never`\> _extends_ `"eip1559"` ? `` `0x02${string}` `` : `never` \| `GetTransactionType`\<`request`, `request` _extends_ `LegacyProperties` ? `"legacy"` : `never` \| `request` _extends_ `EIP1559Properties` ? `"eip1559"` : `never` \| `request` _extends_ `EIP2930Properties` ? `"eip2930"` : `never` \| `request` _extends_ `EIP4844Properties` ? `"eip4844"` : `never` \| `request` _extends_ `EIP7702Properties` ? `"eip7702"` : `never` \| ...\[...\] _extends_ ... \| ... ? `Extract`\<..., ...\> : `never`\> _extends_ `"eip2930"` ? `` `0x01${string}` `` : `never` \| `GetTransactionType`\<`request`, `request` _extends_ `LegacyProperties` ? `"legacy"` : `never` \| `request` _extends_ `EIP1559Properties` ? `"eip1559"` : `never` \| `request` _extends_ `EIP2930Properties` ? `"eip2930"` : `never` \| `request` _extends_ `EIP4844Properties` ? `"eip4844"` : `never` \| `request` _extends_ `EIP7702Properties` ? `"eip7702"` : `never` \| ...\[...\] _extends_ ... \| ... ? `Extract`\<..., ...\> : `never`\> _extends_ `"eip4844"` ? `` `0x03${string}` `` : `never` \| `GetTransactionType`\<`request`, `request` _extends_ `LegacyProperties` ? `"legacy"` : `never` \| `request` _extends_ `EIP1559Properties` ? `"eip1559"` : `never` \| `request` _extends_ `EIP2930Properties` ? `"eip2930"` : `never` \| `request` _extends_ `EIP4844Properties` ? `"eip4844"` : `never` \| `request` _extends_ `EIP7702Properties` ? `"eip7702"` : `never` \| ...\[...\] _extends_ ... \| ... ? `Extract`\<..., ...\> : `never`\> _extends_ `"eip7702"` ? `` `0x04${string}` `` : `never` \| `GetTransactionType`\<`request`, `request` _extends_ `LegacyProperties` ? `"legacy"` : `never` \| `request` _extends_ `EIP1559Properties` ? `"eip1559"` : `never` \| `request` _extends_ `EIP2930Properties` ? `"eip2930"` : `never` \| `request` _extends_ `EIP4844Properties` ? `"eip4844"` : `never` \| `request` _extends_ `EIP7702Properties` ? `"eip7702"` : `never` \| ...\[...\] _extends_ ... \| ... ? `Extract`\<..., ...\> : `never`\> _extends_ `"legacy"` ? `TransactionSerializedLegacy` : `never`\>\>; `signTypedData`: \<`typedData`, `primaryType`\>(`args`) => `Promise`\<`` `0x${string}` ``\>; `switchChain`: (`args`) => `Promise`\<`void`\>; `transport`: `TransportConfig`\<`string`, `EIP1193RequestFn`\> & `Record`\<`string`, `any`\>; `type`: `string`; `uid`: `string`; `waitForCallsStatus`: (`parameters`) => `Promise`\<\{ `atomic`: `boolean`; `capabilities?`: \{\[`key`: `string`\]: `any`; \} \| \{\[`key`: `string`\]: `any`; \}; `chainId`: `number`; `id`: `string`; `receipts?`: `WalletCallReceipt`\<`bigint`, `"success"` \| `"reverted"`\>[]; `status`: `"pending"` \| `"success"` \| `"failure"` \| `undefined`; `statusCode`: `number`; `version`: `string`; \}\>; `watchAsset`: (`args`) => `Promise`\<`boolean`\>; `writeContract`: \<`abi`, `functionName`, `args`, `chainOverride`\>(`args`) => `Promise`\<`` `0x${string}` ``\>; `writeContractSync`: \<`abi`, `functionName`, `args`, `chainOverride`\>(`args`) => `Promise`\<`TransactionReceipt`\>; \}

###### client.account

`Account` \| `undefined`

The Account of the Client.

###### client.addChain

(`args`) => `Promise`\<`void`\>

Adds an EVM chain to the wallet.

- Docs: https://viem.sh/docs/actions/wallet/addChain
- JSON-RPC Methods: [`eth_addEthereumChain`](https://eips.ethereum.org/EIPS/eip-3085)

**Example**

```ts
import { createWalletClient, custom } from 'viem';
import { optimism } from 'viem/chains';

const client = createWalletClient({
  transport: custom(window.ethereum),
});
await client.addChain({ chain: optimism });
```

###### client.batch?

\{ `multicall?`: `boolean` \| \{ `batchSize?`: `number`; `deployless?`: `boolean`; `wait?`: `number`; \}; \}

Flags for batch settings.

###### client.batch.multicall?

`boolean` \| \{ `batchSize?`: `number`; `deployless?`: `boolean`; `wait?`: `number`; \}

Toggle to enable `eth_call` multicall aggregation.

###### client.cacheTime

`number`

Time (in ms) that cached data will remain in memory.

###### client.ccipRead?

`false` \| \{ `request?`: (`parameters`) => `Promise`\<`` `0x${string}` ``\>; \}

[CCIP Read](https://eips.ethereum.org/EIPS/eip-3668) configuration.

###### client.chain

`Chain` \| `undefined`

Chain for the client.

###### client.deployContract

\<`abi`, `chainOverride`\>(`args`) => `Promise`\<`` `0x${string}` ``\>

Deploys a contract to the network, given bytecode and constructor arguments.

- Docs: https://viem.sh/docs/contract/deployContract
- Examples: https://stackblitz.com/github/wevm/viem/tree/main/examples/contracts_deploying-contracts

**Example**

```ts
import { createWalletClient, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { mainnet } from 'viem/chains'

const client = createWalletClient({
  account: privateKeyToAccount('0x…'),
  chain: mainnet,
  transport: http(),
})
const hash = await client.deployContract({
  abi: [],
  account: '0x…,
  bytecode: '0x608060405260405161083e38038061083e833981016040819052610...',
})
```

###### client.experimental_blockTag?

`BlockTag`

Default block tag to use for RPC requests.

###### client.extend

\<`client`\>(`fn`) => `Client`\<`Transport`, `Chain` \| `undefined`, `Account` \| `undefined`, `WalletRpcSchema`, \{ \[K in string \| number \| symbol\]: client\[K\] \} & `WalletActions`\<`Chain` \| `undefined`, `Account` \| `undefined`\>\>

###### client.getAddresses

() => `Promise`\<`GetAddressesReturnType`\>

Returns a list of account addresses owned by the wallet or client.

- Docs: https://viem.sh/docs/actions/wallet/getAddresses
- JSON-RPC Methods: [`eth_accounts`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_accounts)

**Example**

```ts
import { createWalletClient, custom } from 'viem';
import { mainnet } from 'viem/chains';

const client = createWalletClient({
  chain: mainnet,
  transport: custom(window.ethereum),
});
const accounts = await client.getAddresses();
```

###### client.getCallsStatus

(`parameters`) => `Promise`\<\{ `atomic`: `boolean`; `capabilities?`: \{\[`key`: `string`\]: `any`; \} \| \{\[`key`: `string`\]: `any`; \}; `chainId`: `number`; `id`: `string`; `receipts?`: `WalletCallReceipt`\<`bigint`, `"success"` \| `"reverted"`\>[]; `status`: `"pending"` \| `"success"` \| `"failure"` \| `undefined`; `statusCode`: `number`; `version`: `string`; \}\>

Returns the status of a call batch that was sent via `sendCalls`.

- Docs: https://viem.sh/docs/actions/wallet/getCallsStatus
- JSON-RPC Methods: [`wallet_getCallsStatus`](https://eips.ethereum.org/EIPS/eip-5792)

**Example**

```ts
import { createWalletClient, custom } from 'viem';
import { mainnet } from 'viem/chains';

const client = createWalletClient({
  chain: mainnet,
  transport: custom(window.ethereum),
});

const { receipts, status } = await client.getCallsStatus({ id: '0xdeadbeef' });
```

###### client.getCapabilities

\<`chainId`\>(`parameters?`) => `Promise`\<\{ \[K in string \| number \| symbol\]: (chainId extends number ? \{ atomic?: \{ status: (...) \| (...) \| (...) \}; paymasterService?: \{ supported: boolean \}; unstable_addSubAccount?: \{ keyTypes: (...)\[\]; supported: boolean \}; \[key: string\]: any \} : ChainIdToCapabilities\<Capabilities\<\{ atomic?: (...) \| (...); paymasterService?: (...) \| (...); unstable_addSubAccount?: (...) \| (...); \[key: string\]: any \}\>, number\>)\[K\] \}\>

Extract capabilities that a connected wallet supports (e.g. paymasters, session keys, etc).

- Docs: https://viem.sh/docs/actions/wallet/getCapabilities
- JSON-RPC Methods: [`wallet_getCapabilities`](https://eips.ethereum.org/EIPS/eip-5792)

**Example**

```ts
import { createWalletClient, custom } from 'viem';
import { mainnet } from 'viem/chains';

const client = createWalletClient({
  chain: mainnet,
  transport: custom(window.ethereum),
});

const capabilities = await client.getCapabilities({
  account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
});
```

###### client.getChainId

() => `Promise`\<`number`\>

Returns the chain ID associated with the current network.

- Docs: https://viem.sh/docs/actions/public/getChainId
- JSON-RPC Methods: [`eth_chainId`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_chainid)

**Example**

```ts
import { createWalletClient, http } from 'viem';
import { mainnet } from 'viem/chains';

const client = createWalletClient({
  chain: mainnet,
  transport: custom(window.ethereum),
});
const chainId = await client.getChainId();
// 1
```

###### client.getPermissions

() => `Promise`\<`GetPermissionsReturnType`\>

Gets the wallets current permissions.

- Docs: https://viem.sh/docs/actions/wallet/getPermissions
- JSON-RPC Methods: [`wallet_getPermissions`](https://eips.ethereum.org/EIPS/eip-2255)

**Example**

```ts
import { createWalletClient, custom } from 'viem';
import { mainnet } from 'viem/chains';

const client = createWalletClient({
  chain: mainnet,
  transport: custom(window.ethereum),
});
const permissions = await client.getPermissions();
```

###### client.key

`string`

A key for the client.

###### client.name

`string`

A name for the client.

###### client.pollingInterval

`number`

Frequency (in ms) for polling enabled actions & events. Defaults to 4_000 milliseconds.

###### client.prepareAuthorization

(`parameters`) => `Promise`\<`PrepareAuthorizationReturnType`\>

Prepares an [EIP-7702 Authorization](https://eips.ethereum.org/EIPS/eip-7702) object for signing.
This Action will fill the required fields of the Authorization object if they are not provided (e.g. `nonce` and `chainId`).

With the prepared Authorization object, you can use [`signAuthorization`](https://viem.sh/docs/eip7702/signAuthorization) to sign over the Authorization object.

**Examples**

```ts
import { createWalletClient, http } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { mainnet } from 'viem/chains';

const client = createWalletClient({
  chain: mainnet,
  transport: http(),
});

const authorization = await client.prepareAuthorization({
  account: privateKeyToAccount('0x..'),
  contractAddress: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
});
```

```ts
// Account Hoisting
import { createWalletClient, http } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { mainnet } from 'viem/chains';

const client = createWalletClient({
  account: privateKeyToAccount('0x…'),
  chain: mainnet,
  transport: http(),
});

const authorization = await client.prepareAuthorization({
  contractAddress: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
});
```

###### client.prepareTransactionRequest

\<`request`, `chainOverride`, `accountOverride`\>(`args`) => `Promise`\<\{ \[K in string \| number \| symbol\]: (UnionRequiredBy\<Extract\<(...) & (...) & (...), (...) extends (...) ? (...) : (...)\> & \{ chainId?: (...) \| (...) \}, ParameterTypeToParameters\<(...)\[(...)\] extends readonly (...)\[\] ? (...)\[(...)\] : (...) \| (...) \| (...) \| (...) \| (...) \| (...)\>\> & (unknown extends request\["kzg"\] ? \{\} : Pick\<request, "kzg"\>))\[K\] \}\>

Prepares a transaction request for signing.

- Docs: https://viem.sh/docs/actions/wallet/prepareTransactionRequest

**Examples**

```ts
import { createWalletClient, custom } from 'viem';
import { mainnet } from 'viem/chains';

const client = createWalletClient({
  chain: mainnet,
  transport: custom(window.ethereum),
});
const request = await client.prepareTransactionRequest({
  account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
  to: '0x0000000000000000000000000000000000000000',
  value: 1n,
});
```

```ts
// Account Hoisting
import { createWalletClient, http } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { mainnet } from 'viem/chains';

const client = createWalletClient({
  account: privateKeyToAccount('0x…'),
  chain: mainnet,
  transport: custom(window.ethereum),
});
const request = await client.prepareTransactionRequest({
  to: '0x0000000000000000000000000000000000000000',
  value: 1n,
});
```

###### client.request

`EIP1193RequestFn`\<`WalletRpcSchema`\>

Request function wrapped with friendly error handling

###### client.requestAddresses

() => `Promise`\<`RequestAddressesReturnType`\>

Requests a list of accounts managed by a wallet.

- Docs: https://viem.sh/docs/actions/wallet/requestAddresses
- JSON-RPC Methods: [`eth_requestAccounts`](https://eips.ethereum.org/EIPS/eip-1102)

Sends a request to the wallet, asking for permission to access the user's accounts. After the user accepts the request, it will return a list of accounts (addresses).

This API can be useful for dapps that need to access the user's accounts in order to execute transactions or interact with smart contracts.

**Example**

```ts
import { createWalletClient, custom } from 'viem';
import { mainnet } from 'viem/chains';

const client = createWalletClient({
  chain: mainnet,
  transport: custom(window.ethereum),
});
const accounts = await client.requestAddresses();
```

###### client.requestPermissions

(`args`) => `Promise`\<`RequestPermissionsReturnType`\>

Requests permissions for a wallet.

- Docs: https://viem.sh/docs/actions/wallet/requestPermissions
- JSON-RPC Methods: [`wallet_requestPermissions`](https://eips.ethereum.org/EIPS/eip-2255)

**Example**

```ts
import { createWalletClient, custom } from 'viem';
import { mainnet } from 'viem/chains';

const client = createWalletClient({
  chain: mainnet,
  transport: custom(window.ethereum),
});
const permissions = await client.requestPermissions({
  eth_accounts: {},
});
```

###### client.sendCalls

\<`calls`, `chainOverride`\>(`parameters`) => `Promise`\<\{ `capabilities?`: \{\[`key`: `string`\]: `any`; \}; `id`: `string`; \}\>

Requests the connected wallet to send a batch of calls.

- Docs: https://viem.sh/docs/actions/wallet/sendCalls
- JSON-RPC Methods: [`wallet_sendCalls`](https://eips.ethereum.org/EIPS/eip-5792)

**Example**

```ts
import { createWalletClient, custom } from 'viem';
import { mainnet } from 'viem/chains';

const client = createWalletClient({
  chain: mainnet,
  transport: custom(window.ethereum),
});

const id = await client.sendCalls({
  account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
  calls: [
    {
      data: '0xdeadbeef',
      to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
    },
    {
      to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
      value: 69420n,
    },
  ],
});
```

###### client.sendCallsSync

\<`calls`, `chainOverride`\>(`parameters`) => `Promise`\<\{ `atomic`: `boolean`; `capabilities?`: \{\[`key`: `string`\]: `any`; \} \| \{\[`key`: `string`\]: `any`; \}; `chainId`: `number`; `id`: `string`; `receipts?`: `WalletCallReceipt`\<`bigint`, `"success"` \| `"reverted"`\>[]; `status`: `"pending"` \| `"success"` \| `"failure"` \| `undefined`; `statusCode`: `number`; `version`: `string`; \}\>

Requests the connected wallet to send a batch of calls, and waits for the calls to be included in a block.

- Docs: https://viem.sh/docs/actions/wallet/sendCallsSync
- JSON-RPC Methods: [`wallet_sendCalls`](https://eips.ethereum.org/EIPS/eip-5792)

**Example**

```ts
import { createWalletClient, custom } from 'viem';
import { mainnet } from 'viem/chains';

const client = createWalletClient({
  chain: mainnet,
  transport: custom(window.ethereum),
});

const status = await client.sendCallsSync({
  account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
  calls: [
    {
      data: '0xdeadbeef',
      to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
    },
    {
      to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
      value: 69420n,
    },
  ],
});
```

###### client.sendRawTransaction

(`args`) => `Promise`\<`` `0x${string}` ``\>

Sends a **signed** transaction to the network

- Docs: https://viem.sh/docs/actions/wallet/sendRawTransaction
- JSON-RPC Method: [`eth_sendRawTransaction`](https://ethereum.github.io/execution-apis/api-documentation/)

**Example**

```ts
import { createWalletClient, custom } from 'viem';
import { mainnet } from 'viem/chains';
import { sendRawTransaction } from 'viem/wallet';

const client = createWalletClient({
  chain: mainnet,
  transport: custom(window.ethereum),
});

const hash = await client.sendRawTransaction({
  serializedTransaction:
    '0x02f850018203118080825208808080c080a04012522854168b27e5dc3d5839bab5e6b39e1a0ffd343901ce1622e3d64b48f1a04e00902ae0502c4728cbf12156290df99c3ed7de85b1dbfe20b5c36931733a33',
});
```

###### client.sendRawTransactionSync

(`args`) => `Promise`\<`TransactionReceipt`\>

Sends a **signed** transaction to the network synchronously,
and waits for the transaction to be included in a block.

- Docs: https://viem.sh/docs/actions/wallet/sendRawTransactionSync
- JSON-RPC Method: [`eth_sendRawTransactionSync`](https://eips.ethereum.org/EIPS/eip-7966)

**Example**

```ts
import { createWalletClient, custom } from 'viem';
import { mainnet } from 'viem/chains';
import { sendRawTransactionSync } from 'viem/wallet';

const client = createWalletClient({
  chain: mainnet,
  transport: custom(window.ethereum),
});

const receipt = await client.sendRawTransactionSync({
  serializedTransaction:
    '0x02f850018203118080825208808080c080a04012522854168b27e5dc3d5839bab5e6b39e1a0ffd343901ce1622e3d64b48f1a04e00902ae0502c4728cbf12156290df99c3ed7de85b1dbfe20b5c36931733a33',
});
```

###### client.sendTransaction

\<`request`, `chainOverride`\>(`args`) => `Promise`\<`` `0x${string}` ``\>

Creates, signs, and sends a new transaction to the network.

- Docs: https://viem.sh/docs/actions/wallet/sendTransaction
- Examples: https://stackblitz.com/github/wevm/viem/tree/main/examples/transactions_sending-transactions
- JSON-RPC Methods:
  - JSON-RPC Accounts: [`eth_sendTransaction`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_sendtransaction)
  - Local Accounts: [`eth_sendRawTransaction`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_sendrawtransaction)

**Examples**

```ts
import { createWalletClient, custom } from 'viem';
import { mainnet } from 'viem/chains';

const client = createWalletClient({
  chain: mainnet,
  transport: custom(window.ethereum),
});
const hash = await client.sendTransaction({
  account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
  value: 1000000000000000000n,
});
```

```ts
// Account Hoisting
import { createWalletClient, http } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { mainnet } from 'viem/chains';

const client = createWalletClient({
  account: privateKeyToAccount('0x…'),
  chain: mainnet,
  transport: http(),
});
const hash = await client.sendTransaction({
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
  value: 1000000000000000000n,
});
```

###### client.sendTransactionSync

\<`request`, `chainOverride`\>(`args`) => `Promise`\<`TransactionReceipt`\>

Creates, signs, and sends a new transaction to the network synchronously.
Returns the transaction receipt.

- Docs: https://viem.sh/docs/actions/wallet/sendTransactionSync
- Examples: https://stackblitz.com/github/wevm/viem/tree/main/examples/transactions_sending-transactions
- JSON-RPC Methods:
  - JSON-RPC Accounts: [`eth_sendTransaction`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_sendtransaction)
  - Local Accounts: [`eth_sendRawTransaction`](https://ethereum.org/en/developers/docs/apis/json-rpc/#eth_sendrawtransaction)

**Examples**

```ts
import { createWalletClient, custom } from 'viem';
import { mainnet } from 'viem/chains';

const client = createWalletClient({
  chain: mainnet,
  transport: custom(window.ethereum),
});
const receipt = await client.sendTransactionSync({
  account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
  value: 1000000000000000000n,
});
```

```ts
// Account Hoisting
import { createWalletClient, http } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { mainnet } from 'viem/chains';

const client = createWalletClient({
  account: privateKeyToAccount('0x…'),
  chain: mainnet,
  transport: http(),
});
const receipt = await client.sendTransactionSync({
  to: '0x70997970c51812dc3a010c7d01b50e0d17dc79c8',
  value: 1000000000000000000n,
});
```

###### client.showCallsStatus

(`parameters`) => `Promise`\<`void`\>

Requests for the wallet to show information about a call batch
that was sent via `sendCalls`.

- Docs: https://viem.sh/docs/actions/wallet/showCallsStatus
- JSON-RPC Methods: [`wallet_showCallsStatus`](https://eips.ethereum.org/EIPS/eip-5792)

**Example**

```ts
import { createWalletClient, custom } from 'viem';
import { mainnet } from 'viem/chains';

const client = createWalletClient({
  chain: mainnet,
  transport: custom(window.ethereum),
});

await client.showCallsStatus({ id: '0xdeadbeef' });
```

###### client.signAuthorization

(`parameters`) => `Promise`\<`SignAuthorizationReturnType`\>

Signs an [EIP-7702 Authorization](https://eips.ethereum.org/EIPS/eip-7702) object.

With the calculated signature, you can:

- use [`verifyAuthorization`](https://viem.sh/docs/eip7702/verifyAuthorization) to verify the signed Authorization object,
- use [`recoverAuthorizationAddress`](https://viem.sh/docs/eip7702/recoverAuthorizationAddress) to recover the signing address from the signed Authorization object.

**Examples**

```ts
import { createWalletClient, http } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { mainnet } from 'viem/chains';

const client = createWalletClient({
  chain: mainnet,
  transport: http(),
});

const signature = await client.signAuthorization({
  account: privateKeyToAccount('0x..'),
  contractAddress: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
});
```

```ts
// Account Hoisting
import { createWalletClient, http } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { mainnet } from 'viem/chains';

const client = createWalletClient({
  account: privateKeyToAccount('0x…'),
  chain: mainnet,
  transport: http(),
});

const signature = await client.signAuthorization({
  contractAddress: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
});
```

###### client.signMessage

(`args`) => `Promise`\<`` `0x${string}` ``\>

Calculates an Ethereum-specific signature in [EIP-191 format](https://eips.ethereum.org/EIPS/eip-191): `keccak256("\x19Ethereum Signed Message:\n" + len(message) + message))`.

- Docs: https://viem.sh/docs/actions/wallet/signMessage
- JSON-RPC Methods:
  - JSON-RPC Accounts: [`personal_sign`](https://docs.metamask.io/guide/signing-data#personal-sign)
  - Local Accounts: Signs locally. No JSON-RPC request.

With the calculated signature, you can:

- use [`verifyMessage`](https://viem.sh/docs/utilities/verifyMessage) to verify the signature,
- use [`recoverMessageAddress`](https://viem.sh/docs/utilities/recoverMessageAddress) to recover the signing address from a signature.

**Examples**

```ts
import { createWalletClient, custom } from 'viem';
import { mainnet } from 'viem/chains';

const client = createWalletClient({
  chain: mainnet,
  transport: custom(window.ethereum),
});
const signature = await client.signMessage({
  account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
  message: 'hello world',
});
```

```ts
// Account Hoisting
import { createWalletClient, http } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { mainnet } from 'viem/chains';

const client = createWalletClient({
  account: privateKeyToAccount('0x…'),
  chain: mainnet,
  transport: http(),
});
const signature = await client.signMessage({
  message: 'hello world',
});
```

###### client.signTransaction

\<`chainOverride`, `request`\>(`args`) => `Promise`\<`TransactionSerialized`\<`GetTransactionType`\<`request`, `request` _extends_ `LegacyProperties` ? `"legacy"` : `never` \| `request` _extends_ `EIP1559Properties` ? `"eip1559"` : `never` \| `request` _extends_ `EIP2930Properties` ? `"eip2930"` : `never` \| `request` _extends_ `EIP4844Properties` ? `"eip4844"` : `never` \| `request` _extends_ `EIP7702Properties` ? `"eip7702"` : `never` \| `request`\[`"type"`\] _extends_ `string` \| `undefined` ? `Extract`\<`any`\[`any`\], `string`\> : `never`\>, `GetTransactionType`\<`request`, `request` _extends_ `LegacyProperties` ? `"legacy"` : `never` \| `request` _extends_ `EIP1559Properties` ? `"eip1559"` : `never` \| `request` _extends_ `EIP2930Properties` ? `"eip2930"` : `never` \| `request` _extends_ `EIP4844Properties` ? `"eip4844"` : `never` \| `request` _extends_ `EIP7702Properties` ? `"eip7702"` : `never` \| ...\[...\] _extends_ ... \| ... ? `Extract`\<..., ...\> : `never`\> _extends_ `"eip1559"` ? `` `0x02${string}` `` : `never` \| `GetTransactionType`\<`request`, `request` _extends_ `LegacyProperties` ? `"legacy"` : `never` \| `request` _extends_ `EIP1559Properties` ? `"eip1559"` : `never` \| `request` _extends_ `EIP2930Properties` ? `"eip2930"` : `never` \| `request` _extends_ `EIP4844Properties` ? `"eip4844"` : `never` \| `request` _extends_ `EIP7702Properties` ? `"eip7702"` : `never` \| ...\[...\] _extends_ ... \| ... ? `Extract`\<..., ...\> : `never`\> _extends_ `"eip2930"` ? `` `0x01${string}` `` : `never` \| `GetTransactionType`\<`request`, `request` _extends_ `LegacyProperties` ? `"legacy"` : `never` \| `request` _extends_ `EIP1559Properties` ? `"eip1559"` : `never` \| `request` _extends_ `EIP2930Properties` ? `"eip2930"` : `never` \| `request` _extends_ `EIP4844Properties` ? `"eip4844"` : `never` \| `request` _extends_ `EIP7702Properties` ? `"eip7702"` : `never` \| ...\[...\] _extends_ ... \| ... ? `Extract`\<..., ...\> : `never`\> _extends_ `"eip4844"` ? `` `0x03${string}` `` : `never` \| `GetTransactionType`\<`request`, `request` _extends_ `LegacyProperties` ? `"legacy"` : `never` \| `request` _extends_ `EIP1559Properties` ? `"eip1559"` : `never` \| `request` _extends_ `EIP2930Properties` ? `"eip2930"` : `never` \| `request` _extends_ `EIP4844Properties` ? `"eip4844"` : `never` \| `request` _extends_ `EIP7702Properties` ? `"eip7702"` : `never` \| ...\[...\] _extends_ ... \| ... ? `Extract`\<..., ...\> : `never`\> _extends_ `"eip7702"` ? `` `0x04${string}` `` : `never` \| `GetTransactionType`\<`request`, `request` _extends_ `LegacyProperties` ? `"legacy"` : `never` \| `request` _extends_ `EIP1559Properties` ? `"eip1559"` : `never` \| `request` _extends_ `EIP2930Properties` ? `"eip2930"` : `never` \| `request` _extends_ `EIP4844Properties` ? `"eip4844"` : `never` \| `request` _extends_ `EIP7702Properties` ? `"eip7702"` : `never` \| ...\[...\] _extends_ ... \| ... ? `Extract`\<..., ...\> : `never`\> _extends_ `"legacy"` ? `TransactionSerializedLegacy` : `never`\>\>

Signs a transaction.

- Docs: https://viem.sh/docs/actions/wallet/signTransaction
- JSON-RPC Methods:
  - JSON-RPC Accounts: [`eth_signTransaction`](https://ethereum.github.io/execution-apis/api-documentation/)
  - Local Accounts: Signs locally. No JSON-RPC request.

**Examples**

```ts
import { createWalletClient, custom } from 'viem';
import { mainnet } from 'viem/chains';

const client = createWalletClient({
  chain: mainnet,
  transport: custom(window.ethereum),
});
const request = await client.prepareTransactionRequest({
  account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
  to: '0x0000000000000000000000000000000000000000',
  value: 1n,
});
const signature = await client.signTransaction(request);
```

```ts
// Account Hoisting
import { createWalletClient, http } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { mainnet } from 'viem/chains';

const client = createWalletClient({
  account: privateKeyToAccount('0x…'),
  chain: mainnet,
  transport: custom(window.ethereum),
});
const request = await client.prepareTransactionRequest({
  to: '0x0000000000000000000000000000000000000000',
  value: 1n,
});
const signature = await client.signTransaction(request);
```

###### client.signTypedData

\<`typedData`, `primaryType`\>(`args`) => `Promise`\<`` `0x${string}` ``\>

Signs typed data and calculates an Ethereum-specific signature in [EIP-191 format](https://eips.ethereum.org/EIPS/eip-191): `keccak256("\x19Ethereum Signed Message:\n" + len(message) + message))`.

- Docs: https://viem.sh/docs/actions/wallet/signTypedData
- JSON-RPC Methods:
  - JSON-RPC Accounts: [`eth_signTypedData_v4`](https://docs.metamask.io/guide/signing-data#signtypeddata-v4)
  - Local Accounts: Signs locally. No JSON-RPC request.

**Examples**

```ts
import { createWalletClient, custom } from 'viem';
import { mainnet } from 'viem/chains';

const client = createWalletClient({
  chain: mainnet,
  transport: custom(window.ethereum),
});
const signature = await client.signTypedData({
  account: '0xA0Cf798816D4b9b9866b5330EEa46a18382f251e',
  domain: {
    name: 'Ether Mail',
    version: '1',
    chainId: 1,
    verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
  },
  types: {
    Person: [
      { name: 'name', type: 'string' },
      { name: 'wallet', type: 'address' },
    ],
    Mail: [
      { name: 'from', type: 'Person' },
      { name: 'to', type: 'Person' },
      { name: 'contents', type: 'string' },
    ],
  },
  primaryType: 'Mail',
  message: {
    from: {
      name: 'Cow',
      wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
    },
    to: {
      name: 'Bob',
      wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
    },
    contents: 'Hello, Bob!',
  },
});
```

```ts
// Account Hoisting
import { createWalletClient, http } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';
import { mainnet } from 'viem/chains';

const client = createWalletClient({
  account: privateKeyToAccount('0x…'),
  chain: mainnet,
  transport: http(),
});
const signature = await client.signTypedData({
  domain: {
    name: 'Ether Mail',
    version: '1',
    chainId: 1,
    verifyingContract: '0xCcCCccccCCCCcCCCCCCcCcCccCcCCCcCcccccccC',
  },
  types: {
    Person: [
      { name: 'name', type: 'string' },
      { name: 'wallet', type: 'address' },
    ],
    Mail: [
      { name: 'from', type: 'Person' },
      { name: 'to', type: 'Person' },
      { name: 'contents', type: 'string' },
    ],
  },
  primaryType: 'Mail',
  message: {
    from: {
      name: 'Cow',
      wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
    },
    to: {
      name: 'Bob',
      wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
    },
    contents: 'Hello, Bob!',
  },
});
```

###### client.switchChain

(`args`) => `Promise`\<`void`\>

Switch the target chain in a wallet.

- Docs: https://viem.sh/docs/actions/wallet/switchChain
- JSON-RPC Methods: [`eth_switchEthereumChain`](https://eips.ethereum.org/EIPS/eip-3326)

**Example**

```ts
import { createWalletClient, custom } from 'viem';
import { mainnet, optimism } from 'viem/chains';

const client = createWalletClient({
  chain: mainnet,
  transport: custom(window.ethereum),
});
await client.switchChain({ id: optimism.id });
```

###### client.transport

`TransportConfig`\<`string`, `EIP1193RequestFn`\> & `Record`\<`string`, `any`\>

The RPC transport

###### client.type

`string`

The type of client.

###### client.uid

`string`

A unique ID for the client.

###### client.waitForCallsStatus

(`parameters`) => `Promise`\<\{ `atomic`: `boolean`; `capabilities?`: \{\[`key`: `string`\]: `any`; \} \| \{\[`key`: `string`\]: `any`; \}; `chainId`: `number`; `id`: `string`; `receipts?`: `WalletCallReceipt`\<`bigint`, `"success"` \| `"reverted"`\>[]; `status`: `"pending"` \| `"success"` \| `"failure"` \| `undefined`; `statusCode`: `number`; `version`: `string`; \}\>

Waits for the status & receipts of a call bundle that was sent via `sendCalls`.

- Docs: https://viem.sh/docs/actions/wallet/waitForCallsStatus
- JSON-RPC Methods: [`wallet_getCallsStatus`](https://eips.ethereum.org/EIPS/eip-5792)

**Example**

```ts
import { createWalletClient, custom } from 'viem';
import { mainnet } from 'viem/chains';

const client = createWalletClient({
  chain: mainnet,
  transport: custom(window.ethereum),
});

const { receipts, status } = await waitForCallsStatus(client, { id: '0xdeadbeef' });
```

###### client.watchAsset

(`args`) => `Promise`\<`boolean`\>

Adds an EVM chain to the wallet.

- Docs: https://viem.sh/docs/actions/wallet/watchAsset
- JSON-RPC Methods: [`eth_switchEthereumChain`](https://eips.ethereum.org/EIPS/eip-747)

**Example**

```ts
import { createWalletClient, custom } from 'viem';
import { mainnet } from 'viem/chains';

const client = createWalletClient({
  chain: mainnet,
  transport: custom(window.ethereum),
});
const success = await client.watchAsset({
  type: 'ERC20',
  options: {
    address: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    decimals: 18,
    symbol: 'WETH',
  },
});
```

###### client.writeContract

\<`abi`, `functionName`, `args`, `chainOverride`\>(`args`) => `Promise`\<`` `0x${string}` ``\>

Executes a write function on a contract.

- Docs: https://viem.sh/docs/contract/writeContract
- Examples: https://stackblitz.com/github/wevm/viem/tree/main/examples/contracts_writing-to-contracts

A "write" function on a Solidity contract modifies the state of the blockchain. These types of functions require gas to be executed, and hence a [Transaction](https://viem.sh/docs/glossary/terms) is needed to be broadcast in order to change the state.

Internally, uses a [Wallet Client](https://viem.sh/docs/clients/wallet) to call the [`sendTransaction` action](https://viem.sh/docs/actions/wallet/sendTransaction) with [ABI-encoded `data`](https://viem.sh/docs/contract/encodeFunctionData).

**Warning: The `write` internally sends a transaction – it does not validate if the contract write will succeed (the contract may throw an error). It is highly recommended to [simulate the contract write with `contract.simulate`](https://viem.sh/docs/contract/writeContract#usage) before you execute it.**

**Examples**

```ts
import { createWalletClient, custom, parseAbi } from 'viem';
import { mainnet } from 'viem/chains';

const client = createWalletClient({
  chain: mainnet,
  transport: custom(window.ethereum),
});
const hash = await client.writeContract({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: parseAbi(['function mint(uint32 tokenId) nonpayable']),
  functionName: 'mint',
  args: [69420],
});
```

```ts
// With Validation
import { createWalletClient, custom, parseAbi } from 'viem'
import { mainnet } from 'viem/chains'

const client = createWalletClient({
  chain: mainnet,
  transport: custom(window.ethereum),
})
const { request } = await client.simulateContract({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: parseAbi(['function mint(uint32 tokenId) nonpayable']),
  functionName: 'mint',
  args: [69420],
}
const hash = await client.writeContract(request)
```

###### client.writeContractSync

\<`abi`, `functionName`, `args`, `chainOverride`\>(`args`) => `Promise`\<`TransactionReceipt`\>

Executes a write function on a contract synchronously.
Returns the transaction receipt.

- Docs: https://viem.sh/docs/contract/writeContract

A "write" function on a Solidity contract modifies the state of the blockchain. These types of functions require gas to be executed, and hence a [Transaction](https://viem.sh/docs/glossary/terms) is needed to be broadcast in order to change the state.

Internally, uses a [Wallet Client](https://viem.sh/docs/clients/wallet) to call the [`sendTransaction` action](https://viem.sh/docs/actions/wallet/sendTransaction) with [ABI-encoded `data`](https://viem.sh/docs/contract/encodeFunctionData).

**Warning: The `write` internally sends a transaction – it does not validate if the contract write will succeed (the contract may throw an error). It is highly recommended to [simulate the contract write with `contract.simulate`](https://viem.sh/docs/contract/writeContract#usage) before you execute it.**

**Example**

```ts
import { createWalletClient, custom, parseAbi } from 'viem';
import { mainnet } from 'viem/chains';

const client = createWalletClient({
  chain: mainnet,
  transport: custom(window.ethereum),
});
const receipt = await client.writeContractSync({
  address: '0xFBA3912Ca04dd458c843e2EE08967fC04f3579c2',
  abi: parseAbi(['function mint(uint32 tokenId) nonpayable']),
  functionName: 'mint',
  args: [69420],
});
```

###### contractType

[`ContractType`](../type-aliases/ContractType.md)

###### env

[`JpycSdkEnv`](../type-aliases/JpycSdkEnv.md)

###### localContractAddress

[`OptAddressString`](../type-aliases/OptAddressString.md)

#### Returns

`JPYC`

## Methods

### allowance()

> **allowance**(`owner`): `Promise`\<`number`\>

Defined in: [src/jpyc.ts:90](https://github.com/jcam1/sdks/blob/e250c1c73d308610832de5eeca0f586adc98f249/packages/core/src/jpyc.ts#L90)

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

#### Implementation of

[`IJPYC`](../interfaces/IJPYC.md).[`allowance`](../interfaces/IJPYC.md#allowance)

---

### approve()

> **approve**(`spender`): `Promise`\<`` `0x${string}` ``\>

Defined in: [src/jpyc.ts:280](https://github.com/jcam1/sdks/blob/e250c1c73d308610832de5eeca0f586adc98f249/packages/core/src/jpyc.ts#L280)

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

#### Implementation of

[`IJPYC`](../interfaces/IJPYC.md).[`approve`](../interfaces/IJPYC.md#approve)

---

### balanceOf()

> **balanceOf**(`account`): `Promise`\<`number`\>

Defined in: [src/jpyc.ts:84](https://github.com/jcam1/sdks/blob/e250c1c73d308610832de5eeca0f586adc98f249/packages/core/src/jpyc.ts#L84)

Returns balance of `account`.

#### Parameters

##### account

Account address

###### account

`` `0x${string}` ``

#### Returns

`Promise`\<`number`\>

account balance

#### Implementation of

[`IJPYC`](../interfaces/IJPYC.md).[`balanceOf`](../interfaces/IJPYC.md#balanceof)

---

### cancelAuthorization()

> **cancelAuthorization**(`authorizer`): `Promise`\<`` `0x${string}` ``\>

Defined in: [src/jpyc.ts:256](https://github.com/jcam1/sdks/blob/e250c1c73d308610832de5eeca0f586adc98f249/packages/core/src/jpyc.ts#L256)

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

#### Implementation of

[`IJPYC`](../interfaces/IJPYC.md).[`cancelAuthorization`](../interfaces/IJPYC.md#cancelauthorization)

---

### configureMinter()

> **configureMinter**(`__namedParameters`): `Promise`\<`` `0x${string}` ``\>

Defined in: [src/jpyc.ts:110](https://github.com/jcam1/sdks/blob/e250c1c73d308610832de5eeca0f586adc98f249/packages/core/src/jpyc.ts#L110)

Mutation Functions

#### Parameters

##### \_\_namedParameters

###### minter

`` `0x${string}` ``

###### minterAllowedAmount

`number`

#### Returns

`Promise`\<`` `0x${string}` ``\>

#### Implementation of

[`IJPYC`](../interfaces/IJPYC.md).[`configureMinter`](../interfaces/IJPYC.md#configureminter)

---

### decreaseAllowance()

> **decreaseAllowance**(`spender`): `Promise`\<`` `0x${string}` ``\>

Defined in: [src/jpyc.ts:310](https://github.com/jcam1/sdks/blob/e250c1c73d308610832de5eeca0f586adc98f249/packages/core/src/jpyc.ts#L310)

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

#### Implementation of

[`IJPYC`](../interfaces/IJPYC.md).[`decreaseAllowance`](../interfaces/IJPYC.md#decreaseallowance)

---

### increaseAllowance()

> **increaseAllowance**(`spender`): `Promise`\<`` `0x${string}` ``\>

Defined in: [src/jpyc.ts:292](https://github.com/jcam1/sdks/blob/e250c1c73d308610832de5eeca0f586adc98f249/packages/core/src/jpyc.ts#L292)

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

#### Implementation of

[`IJPYC`](../interfaces/IJPYC.md).[`increaseAllowance`](../interfaces/IJPYC.md#increaseallowance)

---

### isMinter()

> **isMinter**(`__namedParameters`): `Promise`\<`boolean`\>

Defined in: [src/jpyc.ts:66](https://github.com/jcam1/sdks/blob/e250c1c73d308610832de5eeca0f586adc98f249/packages/core/src/jpyc.ts#L66)

View Functions

#### Parameters

##### \_\_namedParameters

###### account

`` `0x${string}` ``

#### Returns

`Promise`\<`boolean`\>

#### Implementation of

[`IJPYC`](../interfaces/IJPYC.md).[`isMinter`](../interfaces/IJPYC.md#isminter)

---

### mint()

> **mint**(`to`): `Promise`\<`` `0x${string}` ``\>

Defined in: [src/jpyc.ts:128](https://github.com/jcam1/sdks/blob/e250c1c73d308610832de5eeca0f586adc98f249/packages/core/src/jpyc.ts#L128)

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

#### Implementation of

[`IJPYC`](../interfaces/IJPYC.md).[`mint`](../interfaces/IJPYC.md#mint)

---

### minterAllowance()

> **minterAllowance**(`minter`): `Promise`\<`number`\>

Defined in: [src/jpyc.ts:72](https://github.com/jcam1/sdks/blob/e250c1c73d308610832de5eeca0f586adc98f249/packages/core/src/jpyc.ts#L72)

Returns allowance (for minting) of `minter`.

#### Parameters

##### minter

Minter address

###### minter

`` `0x${string}` ``

#### Returns

`Promise`\<`number`\>

minter allowance

#### Implementation of

[`IJPYC`](../interfaces/IJPYC.md).[`minterAllowance`](../interfaces/IJPYC.md#minterallowance)

---

### nonces()

> **nonces**(`owner`): `Promise`\<`Uint256`\>

Defined in: [src/jpyc.ts:102](https://github.com/jcam1/sdks/blob/e250c1c73d308610832de5eeca0f586adc98f249/packages/core/src/jpyc.ts#L102)

Returns nonce of `owner` for EIP-2612 "permit".

#### Parameters

##### owner

Owner address

###### owner

`` `0x${string}` ``

#### Returns

`Promise`\<`Uint256`\>

owner nonce

#### Implementation of

[`IJPYC`](../interfaces/IJPYC.md).[`nonces`](../interfaces/IJPYC.md#nonces)

---

### permit()

> **permit**(`owner`): `Promise`\<`` `0x${string}` ``\>

Defined in: [src/jpyc.ts:328](https://github.com/jcam1/sdks/blob/e250c1c73d308610832de5eeca0f586adc98f249/packages/core/src/jpyc.ts#L328)

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

#### Implementation of

[`IJPYC`](../interfaces/IJPYC.md).[`permit`](../interfaces/IJPYC.md#permit)

---

### receiveWithAuthorization()

> **receiveWithAuthorization**(`from`): `Promise`\<`` `0x${string}` ``\>

Defined in: [src/jpyc.ts:214](https://github.com/jcam1/sdks/blob/e250c1c73d308610832de5eeca0f586adc98f249/packages/core/src/jpyc.ts#L214)

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

#### Implementation of

[`IJPYC`](../interfaces/IJPYC.md).[`receiveWithAuthorization`](../interfaces/IJPYC.md#receivewithauthorization)

---

### totalSupply()

> **totalSupply**(): `Promise`\<`number`\>

Defined in: [src/jpyc.ts:78](https://github.com/jcam1/sdks/blob/e250c1c73d308610832de5eeca0f586adc98f249/packages/core/src/jpyc.ts#L78)

Returns total supply of JPYC.

#### Returns

`Promise`\<`number`\>

total supply

#### Implementation of

[`IJPYC`](../interfaces/IJPYC.md).[`totalSupply`](../interfaces/IJPYC.md#totalsupply)

---

### transfer()

> **transfer**(`to`): `Promise`\<`` `0x${string}` ``\>

Defined in: [src/jpyc.ts:140](https://github.com/jcam1/sdks/blob/e250c1c73d308610832de5eeca0f586adc98f249/packages/core/src/jpyc.ts#L140)

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

#### Implementation of

[`IJPYC`](../interfaces/IJPYC.md).[`transfer`](../interfaces/IJPYC.md#transfer)

---

### transferFrom()

> **transferFrom**(`from`): `Promise`\<`` `0x${string}` ``\>

Defined in: [src/jpyc.ts:152](https://github.com/jcam1/sdks/blob/e250c1c73d308610832de5eeca0f586adc98f249/packages/core/src/jpyc.ts#L152)

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

#### Implementation of

[`IJPYC`](../interfaces/IJPYC.md).[`transferFrom`](../interfaces/IJPYC.md#transferfrom)

---

### transferWithAuthorization()

> **transferWithAuthorization**(`from`): `Promise`\<`` `0x${string}` ``\>

Defined in: [src/jpyc.ts:172](https://github.com/jcam1/sdks/blob/e250c1c73d308610832de5eeca0f586adc98f249/packages/core/src/jpyc.ts#L172)

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

#### Implementation of

[`IJPYC`](../interfaces/IJPYC.md).[`transferWithAuthorization`](../interfaces/IJPYC.md#transferwithauthorization)
