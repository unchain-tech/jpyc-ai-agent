**@jpyc/sdk-react**

---

# JPYC React SDK

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
![build](https://github.com/jcam1/sdks/actions/workflows/check.yml/badge.svg)
[![npm version](https://badge.fury.io/js/@jpyc%2Fsdk-react.svg)](https://badge.fury.io/js/@jpyc%2Fsdk-react)

This package implements React hooks for interacting with the JPYC contracts on any supported chains. => 日本語版は[こちら](_media/README-jp.md)。

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

Please follow the steps below to install & configure the SDK.

### 1. Installation

Install our NPM package.

```sh
# yarn
$ yarn add @jpyc/sdk-react

# npm
$ npm i @jpyc/sdk-react
```

### 2. Configuration

Wrap your entire app by `JpycSdkProvider`.

> [!TIP]
> The SDK avoids any implicit use of environment variables. We recommend securely loading sensitive data (e.g., RPC URL with explicit access token) when integrating the SDK into your app.

```tsx
<JpycSdkProvider
  env="prod"
  contractType="jpyc"
  localContractAddress="0x..."
  rpcs={{
    137: 'YOUR_RPC_ENDPOINT_URL',
  }}
>
  <App />
</JpycSdkProvider>
```

Hooks can be used within the wrapped component (e.g., anything within `App` in the above code snippet).

```tsx
import { useApprove, useTransfer } from '@jpyc/sdk-react';

// imported hooks can then be used in your components or pages
```

## ✨ Code Examples

For your reference, we've implemented code examples in a separate [`examples` directory](_media/examples). Please follow the instructions there to get started.

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

You can find the auto-generated developer documents [here](../../docs/react/globals.md).
