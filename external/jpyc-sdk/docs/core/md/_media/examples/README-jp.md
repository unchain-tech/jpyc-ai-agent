# コードサンプル・実装例

このディレクトリでは、ローカルネットワークにデプロイされた `JPYC` コントラクトに対して、JPYC core SDK を用いて NodeJS 環境にてやりとりを行うコードサンプルを複数用意しています。まずは、以下の手順にしたがってローカル環境を立ち上げ、コードサンプルを実行してみましょう。

> [!IMPORTANT]
> 以下に記載のコマンドは全て `./packages/core/examples` ディレクトリ配下で実行する想定です。

### 1. コントラクトのコンパイル

`examples` ディレクトリ内に `contracts` という命名のサブモジュール（[JPYCv2](https://github.com/jcam1/JPYCv2)リポジトリを指す）が存在することを確認し、コントラクトをコンパイルしましょう。

> [!NOTE]
> git リポジトリのクローン時にサブモジュールを自動的に含めるには `--recursive` オプションを用います (e.g., `git clone --recursive https://github.com/xxx`).

```sh
$ yarn compile:contracts
```

### 2. ローカルネットワークの立ち上げ

Hardhat 経由（Foundry 等の他ツールでも同様だが、このディレクトリでは Hardhat を利用しているため）でローカルネットワークを立ち上げましょう。

```sh
$ yarn dev
```

### 3. コントラクトのデプロイメント

立ち上がったローカルネットワークに対してコントラクトをデプロイしましょう（ステップ2とは別のターミナルウィンドウを立ち上げてからコマンドを実行します）。デプロイが成功すると、`./ignition/deployments/chain-31337/deployed_addresses.json` というファイルが生成され、デプロイされた全てのコントラクトアドレスを確認することができます。

```sh
$ yarn deploy
```

### 4. コードサンプルの実行

全てのコードサンプルは yarn スクリプト経由で実行することができます。

|                      コマンド | 説明                                                          |
| ----------------------------: | :------------------------------------------------------------ |
|                        `mint` | 新しい JPYC の発行                                            |
|                `total-supply` | JPYC の発行総額の取得                                         |
|                    `transfer` | JPYC の送金                                                   |
|                     `approve` | allowance の許可                                              |
|                      `permit` | allowance の許可 (EIP-2612)                                   |
|               `transfer-from` | JPYC の送金（許可した第三者から）                             |
| `transfer-with-authorization` | JPYC の送金 (EIP-3009)                                        |
|  `receive-with-authorization` | JPYC の送金受け取り (EIP-3009)                                |
|        `cancel-authorization` | オフチェーンで署名済みのトランザクションの取り消し (EIP-3009) |

例えば、ローカルネットワーク上で JPYC を発行する（**実際の金銭的価値はありません**）には、以下のコマンドを実行します。

```sh
$ yarn mint
```
