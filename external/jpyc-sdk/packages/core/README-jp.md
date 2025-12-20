# JPYC Core (Node) SDK

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
![build](https://github.com/jcam1/sdks/actions/workflows/check.yml/badge.svg)
[![npm version](https://badge.fury.io/js/@jpyc%2Fsdk-core.svg)](https://badge.fury.io/js/@jpyc%2Fsdk-core)

JPYC core SDK は、各ネットワーク上にデプロイされた JPYC コントラクトとやりとりをするための NodeJS インターフェースです。=> 英語版は[こちら](./README.md)。

## ✅ 対応しているコントラクト種別・ネットワーク

この SDK は2025年10月現在、以下のコントラクト種別とネットワークに対応しています。SDK クライアントを設定する際は、以下のいずれかのチェーン ID を指定してください。

> [!NOTE]
> 以下のネットワーク以外にも、ローカルネットワーク（チェーンID: `31337`）にデプロイした JPYC コントラクトのアドレスを設定して、ローカル環境での開発や検証に使うこともできます。

|                               | JPYC | JPYC Prepaid | チェーンID |
| ----------------------------: | :--: | :----------: | :--------: |
|         Ethereum メインネット |  ✅  |      ✅      |     1      |
| Ethereum Sepolia テストネット |  ✅  |      ✅      |  11155111  |
|      Polygon PoS メインネット |  ✅  |      ✅      |    137     |
|     Polygon Amoy テストネット |  ✅  |      ✅      |   80002    |
|           Gnosis メインネット |  ✅  |      ✅      |    100     |
|    Gnosis Chiado テストネット |  ✅  |      ✅      |   10200    |
|        Avalanche メインネット |  ✅  |      ✅      |   43114    |
|   Avalanche Fuji テストネット |  ✅  |      ✅      |   43113    |
|            Astar メインネット |  ✅  |      ✅      |    592     |
|           Shiden メインネット |  ✅  |      ✅      |    336     |

## 💡 使い方

以下の手順にしたがって SDK をインストール・設定し、使用できる状態にセットアップしてみましょう。

### 1. インストール

NPM パッケージをインストールします。

```sh
# yarn
$ yarn add @jpyc/sdk-core

# npm
$ npm i @jpyc/sdk-core
```

### 2. 設定

SDK の初期化・設定を行います。

> [!TIP]
> SDK の内部では設計上の観点から環境変数を用いていません。一方で、アプリケーション側から SDK インスタンスに対して秘匿性の高いデータ（e.g., プライベートキー）を渡す際には、ハードコードせず、環境変数を使用するなどの考慮が別途必要です。

```ts
import { JPYC, SdkClient } from '@jpyc/sdk-core';

// 1. `SdkClient`インスタンスを初期化
const sdkClient = new SdkClient({
  chainId: 137, // Polygon PoS
  rpcUrl: 'YOUR_RPC_ENDPOINT_URL',
});

// 2. プライベートキーからEOAを作成
export const account = sdkClient.configurePrivateKeyAccount({
  privateKey: 'YOUR_PRIVATE_KEY',
});

// 3. 2で作成したEOAを用いてウォレットクライアントを作成
export const client = sdkClient.configureClient({
  account,
});

// 4. 3で作成したウォレットクライアントを用いて`JPYC`インスタンスを初期化
export const jpyc = new JPYC({
  env: 'prod', // 'prod' または 'local'
  contractType: 'jpyc', // 'jpyc' または 'jpycPrepaid'
  localContractAddress: undefined, // ローカルネットワークを利用する場合のみ設定
  client,
});
```

### 3. 組み込み

2 で設定した `jpyc` インスタンスを用いることで、アプリケーションやスクリプトに JPYC コントラクトのロジックを組み込むことができます。

```ts
import { jpyc } from './PATH/TO/SDK-CONFIG';

...

// 呼び出し時点でのJPYCの`totalSupply`を取得
const totalSupply = await jpyc.totalSupply();
console.log(`totalSupply: ${totalSupply.toString()}`);

...
```

## ✨ 実装例

[`examples`ディレクトリ](./examples/)に SDK を使ったコードの実装例を多数用意しています。ディレクトリ内の `README` にしたがって、サンプルコードを実行するための環境構築等を進めることができます。

## 🤖 開発用コマンド

ローカル環境での開発・検証用に、以下の yarn スクリプトが用意されています。

|         コマンド | 説明                                               |
| ---------------: | :------------------------------------------------- |
|        `compile` | SDK のコンパイル                                   |
|           `test` | テストコードの実行 (vitest経由)                    |
|           `lint` | Eslint の実行                                      |
|   `lint:dry-run` | Eslint の実行（修正なし）                          |
|         `format` | Prettier の実行                                    |
| `format:dry-run` | Prettier の実行（修正なし）                        |
|           `docs` | 開発者向けドキュメントの生成（マークダウン・HTML） |
|        `docs:md` | 開発者向けドキュメントの生成（マークダウン）       |
|      `docs:html` | 開発者向けドキュメントの生成（HTML）               |

## 📚 開発者向けドキュメント

ソースコードから自動生成された開発者向けドキュメントは[ここ](https://jcam1.github.io/sdks/)からアクセスできます。
