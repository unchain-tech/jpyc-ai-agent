import { Uint256, Uint8 } from 'soltypes';
import type { Abi } from 'viem';
import { getContract, GetContractReturnType, Hash, WalletClient } from 'viem';

import { IJPYC } from './interfaces';
import {
  AddressString,
  Bytes32,
  ContractType,
  FailedTransactionSimulationError,
  getContractAbi,
  getContractAddress,
  JpycSdkEnv,
  OptAddressString,
  scaleDown,
  scaleUp,
  UndefinedContractAbiError,
  UndefinedContractAddressError,
} from './utils';

export class JPYC implements IJPYC {
  private readonly contract: GetContractReturnType<Abi, WalletClient>;

  /**
   * Constructor of a `JPYC` instance.
   *
   * @param env Environment string (either `prod` or `local`)
   * @param contractType Contract type (either `jpyc` or `jpycPrepaid`)
   * @param localContractAddress Locally-deployed contract address (if any)
   * @param client Wallet client
   */
  constructor({
    env,
    contractType,
    localContractAddress,
    client,
  }: {
    env: JpycSdkEnv;
    contractType: ContractType;
    localContractAddress: OptAddressString;
    client: WalletClient;
  }) {
    const contractAbi = getContractAbi({ contractType });
    if (contractAbi === undefined) {
      throw new UndefinedContractAbiError();
    }

    const contractAddress = getContractAddress({
      env,
      contractType,
      localContractAddress,
    });
    if (contractAddress === undefined) {
      throw new UndefinedContractAddressError();
    }

    this.contract = getContract({
      address: contractAddress,
      abi: contractAbi,
      client: client,
    });
  }

  /** View Functions */

  async isMinter({ account }: { account: AddressString }): Promise<boolean> {
    const resp = await this.contract.read.isMinter([account]);

    return resp as boolean;
  }

  async minterAllowance({ minter }: { minter: AddressString }): Promise<number> {
    const resp = await this.contract.read.minterAllowance([minter]);

    return +scaleDown({ value: resp as bigint });
  }

  async totalSupply(): Promise<number> {
    const resp = await this.contract.read.totalSupply();

    return +scaleDown({ value: resp as bigint });
  }

  async balanceOf({ account }: { account: AddressString }): Promise<number> {
    const resp = await this.contract.read.balanceOf([account]);

    return +scaleDown({ value: resp as bigint });
  }

  async allowance({
    owner,
    spender,
  }: {
    owner: AddressString;
    spender: AddressString;
  }): Promise<number> {
    const resp = await this.contract.read.allowance([owner, spender]);

    return +scaleDown({ value: resp as bigint });
  }

  async nonces({ owner }: { owner: AddressString }): Promise<Uint256> {
    const resp = await this.contract.read.nonces([owner]);

    return Uint256.from((resp as bigint).toString());
  }

  /** Mutation Functions */

  async configureMinter({
    minter,
    minterAllowedAmount,
  }: {
    minter: AddressString;
    minterAllowedAmount: number;
  }): Promise<Hash> {
    const args = [minter, scaleUp({ value: minterAllowedAmount.toString() })];

    try {
      await this.contract.simulate.configureMinter(args);
    } catch (error: unknown) {
      throw new FailedTransactionSimulationError({ message: error as string });
    }

    return await this.contract.write.configureMinter(args);
  }

  async mint({ to, amount }: { to: AddressString; amount: number }): Promise<Hash> {
    const args = [to, scaleUp({ value: amount.toString() })];

    try {
      await this.contract.simulate.mint(args);
    } catch (error: unknown) {
      throw new FailedTransactionSimulationError({ message: error as string });
    }

    return await this.contract.write.mint(args);
  }

  async transfer({ to, value }: { to: AddressString; value: number }): Promise<Hash> {
    const args = [to, scaleUp({ value: value.toString() })];

    try {
      await this.contract.simulate.transfer(args);
    } catch (error: unknown) {
      throw new FailedTransactionSimulationError({ message: error as string });
    }

    return await this.contract.write.transfer(args);
  }

  async transferFrom({
    from,
    to,
    value,
  }: {
    from: AddressString;
    to: AddressString;
    value: number;
  }): Promise<Hash> {
    const args = [from, to, scaleUp({ value: value.toString() })];

    try {
      await this.contract.simulate.transferFrom(args);
    } catch (error: unknown) {
      throw new FailedTransactionSimulationError({ message: error as string });
    }

    return await this.contract.write.transferFrom(args);
  }

  async transferWithAuthorization({
    from,
    to,
    value,
    validAfter,
    validBefore,
    nonce,
    v,
    r,
    s,
  }: {
    from: AddressString;
    to: AddressString;
    value: number;
    validAfter: Uint256;
    validBefore: Uint256;
    nonce: Bytes32;
    v: Uint8;
    r: Bytes32;
    s: Bytes32;
  }): Promise<Hash> {
    const args = [
      from,
      to,
      scaleUp({ value: value.toString() }),
      validAfter,
      validBefore,
      nonce,
      v,
      r,
      s,
    ];

    try {
      await this.contract.simulate.transferWithAuthorization(args);
    } catch (error: unknown) {
      throw new FailedTransactionSimulationError({ message: error as string });
    }

    return await this.contract.write.transferWithAuthorization(args);
  }

  async receiveWithAuthorization({
    from,
    to,
    value,
    validAfter,
    validBefore,
    nonce,
    v,
    r,
    s,
  }: {
    from: AddressString;
    to: AddressString;
    value: number;
    validAfter: Uint256;
    validBefore: Uint256;
    nonce: Bytes32;
    v: Uint8;
    r: Bytes32;
    s: Bytes32;
  }): Promise<Hash> {
    const args = [
      from,
      to,
      scaleUp({ value: value.toString() }),
      validAfter,
      validBefore,
      nonce,
      v,
      r,
      s,
    ];

    try {
      await this.contract.simulate.receiveWithAuthorization(args);
    } catch (error: unknown) {
      throw new FailedTransactionSimulationError({ message: error as string });
    }

    return await this.contract.write.receiveWithAuthorization(args);
  }

  async cancelAuthorization({
    authorizer,
    nonce,
    v,
    r,
    s,
  }: {
    authorizer: AddressString;
    nonce: Bytes32;
    v: Uint8;
    r: Bytes32;
    s: Bytes32;
  }): Promise<Hash> {
    const args = [authorizer, nonce, v, r, s];

    try {
      await this.contract.simulate.cancelAuthorization(args);
    } catch (error: unknown) {
      throw new FailedTransactionSimulationError({ message: error as string });
    }

    return await this.contract.write.cancelAuthorization(args);
  }

  async approve({ spender, value }: { spender: AddressString; value: number }): Promise<Hash> {
    const args = [spender, scaleUp({ value: value.toString() })];

    try {
      await this.contract.simulate.approve(args);
    } catch (error: unknown) {
      throw new FailedTransactionSimulationError({ message: error as string });
    }

    return await this.contract.write.approve(args);
  }

  async increaseAllowance({
    spender,
    increment,
  }: {
    spender: AddressString;
    increment: number;
  }): Promise<Hash> {
    const args = [spender, scaleUp({ value: increment.toString() })];

    try {
      await this.contract.simulate.increaseAllowance(args);
    } catch (error: unknown) {
      throw new FailedTransactionSimulationError({ message: error as string });
    }

    return await this.contract.write.increaseAllowance(args);
  }

  async decreaseAllowance({
    spender,
    decrement,
  }: {
    spender: AddressString;
    decrement: number;
  }): Promise<Hash> {
    const args = [spender, scaleUp({ value: decrement.toString() })];

    try {
      await this.contract.simulate.decreaseAllowance(args);
    } catch (error: unknown) {
      throw new FailedTransactionSimulationError({ message: error as string });
    }

    return await this.contract.write.decreaseAllowance(args);
  }

  async permit({
    owner,
    spender,
    value,
    deadline,
    v,
    r,
    s,
  }: {
    owner: AddressString;
    spender: AddressString;
    value: number;
    deadline: Uint256;
    v: Uint8;
    r: Bytes32;
    s: Bytes32;
  }): Promise<Hash> {
    const args = [owner, spender, scaleUp({ value: value.toString() }), deadline, v, r, s];

    try {
      await this.contract.simulate.permit(args);
    } catch (error: unknown) {
      throw new FailedTransactionSimulationError({ message: error as string });
    }

    return await this.contract.write.permit(args);
  }
}
