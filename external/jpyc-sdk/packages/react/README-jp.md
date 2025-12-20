# JPYC React SDK

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
![build](https://github.com/jcam1/sdks/actions/workflows/check.yml/badge.svg)
[![npm version](https://badge.fury.io/js/@jpyc%2Fsdk-react.svg)](https://badge.fury.io/js/@jpyc%2Fsdk-react)

JPYC React SDK は、各ネットワーク上にデプロイされた JPYC コントラクトとやりとりをするための React インターフェース（i.e., React hooks ライブラリー）です。=> 英語版は[こちら](./README.md)。

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
$ yarn add @jpyc/sdk-react

# npm
$ npm i @jpyc/sdk-react
```

### 2. 設定

SDK の初期化・設定を行います。アプリケーション全体をもつコンポーネントを `JpycSdkProvider` でラップします。

> [!TIP]
> SDK の内部では設計上の観点から環境変数を用いていません。一方で、アプリケーション側から SDK プロバイダーに対して秘匿性の高いデータ（e.g., APIキー等が直接埋め込まれた RPC URL）を渡す際には、ハードコードしないなどの考慮が別途必要です。

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

コントラクト呼び出しや状態管理を抽象化したカスタムフックスは、ラップされたコンポーネント内（e.g., 上記の `App` コンポーネント配下）であればどこでも使うことができます。

```tsx
import { useApprove, useTransfer } from '@jpyc/sdk-react';

// フックスは `App` 配下のあらゆるページ・コンポーネントで使用可能
```

## ✨ 実装例

[`examples`ディレクトリ](./examples/)に SDK を使ったコードの実装例を多数用意しています（現状は別リポジトリで管理）。

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

ソースコードから自動生成された開発者向けドキュメントは[ここ](../../docs/react/html/index.html)からアクセスできます。
