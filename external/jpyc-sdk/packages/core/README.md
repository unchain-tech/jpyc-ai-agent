# JPYC Core (Node) SDK

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
![build](https://github.com/jcam1/sdks/actions/workflows/check.yml/badge.svg)
[![npm version](https://badge.fury.io/js/@jpyc%2Fsdk-core.svg)](https://badge.fury.io/js/@jpyc%2Fsdk-core)

This package implements NodeJS interface for interacting with the [JPYC contracts](https://github.com/jcam1/JPYCv2) on any supported chain. => 日本語版は[こちら](./README-jp.md)。

## ✅ Supported Contract Types & Networks

The SDK supports the following contract types and networks as of October 2025. Please use one of the chain IDs below when configuring the SDK client.

> [!NOTE]
> You could also configure your locally-deployed contracts for local development and/or testing. For chain ID, please use `31337`.

|                          | JPYC | JPYC Prepaid | Chain ID |
| -----------------------: | :--: | :----------: | :------: |
|         Ethereum Mainnet |  ✅  |      ✅      |    1     |
| Ethereum Sepolia Testnet |  ✅  |      ✅      | 11155111 |
|      Polygon PoS Mainnet |  ✅  |      ✅      |   137    |
|     Polygon Amoy Testnet |  ✅  |      ✅      |  80002   |
|           Gnosis Mainnet |  ✅  |      ✅      |   100    |
|    Gnosis Chiado Testnet |  ✅  |      ✅      |  10200   |
|        Avalanche Mainnet |  ✅  |      ✅      |  43114   |
|   Avalanche Fuji Testnet |  ✅  |      ✅      |  43113   |
|            Astar Mainnet |  ✅  |      ✅      |   592    |
|           Shiden Mainnet |  ✅  |      ✅      |   336    |

## 💡 Usage

Please follow the steps below to install, configure, and use the SDK.

### 1. Installation

Install our NPM package.

```sh
# yarn
$ yarn add @jpyc/sdk-core

# npm
$ npm i @jpyc/sdk-core
```

### 2. Configuration

Initialize and configure an SDK instance like below.

> [!TIP]
> The SDK avoids any implicit use of environment variables. We recommend securely loading sensitive data (e.g., private keys) when integrating the SDK to your app.

```ts
import { JPYC, SdkClient } from '@jpyc/sdk-core';

// 1. Initialize an `SdkClient` instance
const sdkClient = new SdkClient({
  chainId: 137, // Polygon PoS
  rpcUrl: 'YOUR_RPC_ENDPOINT_URL',
});

// 2. Configure an EOA from a private key (e.g., loaded from env var)
export const account = sdkClient.configurePrivateKeyAccount({
  privateKey: 'YOUR_PRIVATE_KEY',
});

// 3. Configure a wallet client using the account
export const client = sdkClient.configureClient({
  account,
});

// 4. Initialize a `JPYC` instance using the client
export const jpyc = new JPYC({
  env: 'prod', // 'prod' or 'local'
  contractType: 'jpyc', // 'jpyc' or 'jpycPrepaid'
  localContractAddress: undefined, // set only when using local network
  client,
});
```

### 3. Integration

Use the configured SDK wherever needed in your app or script.

```ts
import { jpyc } from './YOUR/PATH/TO/CONFIG/FILE';

// Fetch current `totalSupply` of JPYC
const totalSupply = await jpyc.totalSupply();
console.log(`totalSupply: ${totalSupply.toString()}`);
```

## ✨ Code Examples

For your reference, we've implemented code examples in a separate [`examples` directory](./examples/). Please follow the instructions there to get started.

## 🤖 Available Commands

The following commands are available as yarn scripts for local development & testing.

|          Command | Description                                            |
| ---------------: | :----------------------------------------------------- |
|        `compile` | Compile (transpile) SDK                                |
|           `test` | Run unit tests (using vitest)                          |
|           `lint` | Run Eslint                                             |
|   `lint:dry-run` | Run Eslint without fixing                              |
|         `format` | Run Prettier                                           |
| `format:dry-run` | Run Prettier without fixing                            |
|           `docs` | Generate developer documents in both Markdown and HTML |
|        `docs:md` | Generate developer documents in Markdown               |
|      `docs:html` | Generate developer documents in HTML                   |

## 📚 Documentation

You can find the auto-generated developer documents [here](https://jcam1.github.io/sdks/).
