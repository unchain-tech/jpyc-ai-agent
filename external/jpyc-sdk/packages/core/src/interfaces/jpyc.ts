import { Uint256, Uint8 } from 'soltypes';
import { Hash } from 'viem';

import { AddressString, Bytes32 } from '../utils';

export interface IJPYC {
  /** View Functions */

  /**
   * Returns true if `account` is a minter.
   *
   * @param account Account address
   * @returns true if minter, false otherwise
   */
  isMinter({ account }: { account: AddressString }): Promise<boolean>;

  /**
   * Returns allowance (for minting) of `minter`.
   *
   * @param minter Minter address
   * @returns minter allowance
   */
  minterAllowance({ minter }: { minter: AddressString }): Promise<number>;

  /**
   * Returns total supply of JPYC.
   *
   * @returns total supply
   */
  totalSupply(): Promise<number>;

  /**
   * Returns balance of `account`.
   *
   * @param account Account address
   * @returns account balance
   */
  balanceOf({ account }: { account: AddressString }): Promise<number>;

  /**
   * Returns allowance (for spending) of `spender` from the balance of `owner`.
   *
   * @param owner Owner address
   * @param spender Spender address
   * @returns spender allowance
   */
  allowance({ owner, spender }: { owner: AddressString; spender: AddressString }): Promise<number>;

  /**
   * Returns nonce of `owner` for EIP-2612 "permit".
   *
   * @param owner Owner address
   * @returns owner nonce
   */
  nonces({ owner }: { owner: AddressString }): Promise<Uint256>;

  /** Mutation Functions */

  /**
   * Configures `minter` with allowance of `minterAllowedAmount`.
   *
   * @param minter Minter address
   * @param minterAllowedAmount Minter allowance
   * @returns transaction hash
   */
  configureMinter({
    minter,
    minterAllowedAmount,
  }: {
    minter: AddressString;
    minterAllowedAmount: number;
  }): Promise<Hash>;

  /**
   * Mints `amount` JPYC to `to`.
   *
   * @param to Receiver address
   * @param amount Amount of JPYC to mint
   * @returns transaction hash
   */
  mint({ to, amount }: { to: AddressString; amount: number }): Promise<Hash>;

  /**
   * Transfers `value` JPYC to `to`.
   *
   * @param to Receiver address
   * @param value Amount of JPYC to transfer
   * @returns transaction hash
   */
  transfer({ to, value }: { to: AddressString; value: number }): Promise<Hash>;

  /**
   * Transfers `value` JPYC from `from` to `to`.
   *
   * @param from Sender address
   * @param to Receiver address
   * @param value Amount of JPYC to transfer
   * @returns transaction hash
   */
  transferFrom({
    from,
    to,
    value,
  }: {
    from: AddressString;
    to: AddressString;
    value: number;
  }): Promise<Hash>;

  /**
   * Transfers `value` JPYC from `from` to `to` with off-chain authorization.
   *
   * @param from Sender address
   * @param to Receiver address
   * @param value Amount of JPYC to transfer
   * @param validAfter Unix timestamp when transaction becomes valid
   * @param validBefore Unix timestamp when transaction becomes invalid
   * @param nonce Unique nonce
   * @param v v of ECDSA
   * @param r r of ECDSA
   * @param s s of ECDSA
   * @returns transaction hash
   */
  transferWithAuthorization({
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
  }): Promise<Hash>;

  /**
   * Receives `value` JPYC from `from` to `to` with off-chain authorization.
   *
   * @param from Sender address
   * @param to Receiver address
   * @param value Amount of JPYC to transfer
   * @param validAfter Unix timestamp when transaction becomes valid
   * @param validBefore Unix timestamp when transaction becomes invalid
   * @param nonce Unique nonce
   * @param v v of ECDSA
   * @param r r of ECDSA
   * @param s s of ECDSA
   * @returns transaction hash
   */
  receiveWithAuthorization({
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
  }): Promise<Hash>;

  /**
   * Cancels off-chain authorization.
   *
   * @param authorizer Sender address
   * @param nonce Unique nonce
   * @param v v of ECDSA
   * @param r r of ECDSA
   * @param s s of ECDSA
   * @returns transaction hash
   */
  cancelAuthorization({
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
  }): Promise<Hash>;

  /**
   * Sets allowance of `spender` from the balance of `owner`.
   *
   * @param spender Spender address
   * @param value Amount of allowance
   * @returns transaction hash
   */
  approve({ spender, value }: { spender: AddressString; value: number }): Promise<Hash>;

  /**
   * Increases allowance of `spender` by `increment`.
   *
   * @param spender Spender address
   * @param increment Amount of allowance to increase
   * @returns transaction hash
   */
  increaseAllowance({
    spender,
    increment,
  }: {
    spender: AddressString;
    increment: number;
  }): Promise<Hash>;

  /**
   * Decreases allowance of `spender` by `increment`.
   *
   * @param spender Spender address
   * @param increment Amount of allowance to decrease
   * @returns transaction hash
   */
  decreaseAllowance({
    spender,
    decrement,
  }: {
    spender: AddressString;
    decrement: number;
  }): Promise<Hash>;

  /**
   * Sets allowance of `spender` from the balance of `owner` with off-chain approval.
   *
   * @param owner Owner address
   * @param spender Spender address
   * @param value Amount of allowance
   * @param deadline Unix timestamp when transaction becomes invalid
   * @param v v of ECDSA
   * @param r r of ECDSA
   * @param s s of ECDSA
   * @returns transaction hash
   */
  permit({
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
  }): Promise<Hash>;
}
