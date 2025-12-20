# Code Examples

We provide code examples that use JPYC core SDK as the interface to locally-deployed `JPYC` contracts. Please read and follow the instructions below to learn how to set up local environment as well as how to run our code examples.

> [!IMPORTANT]
> cd into `./packages/core/examples` directory before running any commands below.

### 1. Compile contracts

You first need to make sure that the submodule (should be pointing to the [JPYCv2](https://github.com/jcam1/JPYCv2) repo) exists, then compile contracts.

> [!NOTE]
> To include submodules when cloning the repo, add `--recursive` option (e.g., `git clone --recursive https://github.com/xxx`).

```sh
$ yarn compile:contracts
```

### 2. Run Local Network

Start running a Hardhat network & node locally.

```sh
$ yarn dev
```

### 3. Deploy Contracts

**Open a different terminal window**, and run the following command to deploy JPYC contracts to the local network. Once successfully deployed, a new directory will be created, and you can find the deployed contract addresses at `./ignition/deployments/chain-31337/deployed_addresses.json`.

```sh
$ yarn deploy
```

### 4. Run Code Examples

You can run our code examples via yarn scripts below.

|                       Command | Description                                        |
| ----------------------------: | :------------------------------------------------- |
|                        `mint` | mint new JPYC                                      |
|                `total-supply` | fetch total-supply                                 |
|                    `transfer` | transfer JPYC                                      |
|                     `approve` | approve allowance                                  |
|                      `permit` | permit allowance (EIP-2612)                        |
|               `transfer-from` | transfer JPYC from spender                         |
| `transfer-with-authorization` | transfer JPYC with off-chain signatures (EIP-3009) |
|  `receive-with-authorization` | receive JPYC with off-chain signatures (EIP-3009)  |
|        `cancel-authorization` | cancel authorizations (EIP-3009)                   |

For instance, to mint JPYC on the local network (i.e., no real values), run the following command.

```sh
$ yarn mint
```
