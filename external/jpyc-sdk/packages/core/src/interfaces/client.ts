import { PrivateKeyAccount, WalletClient } from 'viem';

import { AddressString, Bytes32 } from '../utils';

export interface ISdkClient {
  /**
   * Configures an EOA from a private key.
   *
   * @param privateKey Private key
   * @returns PrivateKeyAccount
   */
  configurePrivateKeyAccount({ privateKey }: { privateKey: Bytes32 }): PrivateKeyAccount;

  /**
   * Configures a wallet client from an EOA.
   *
   * @returns WalletClient
   */
  configureClient({ account }: { account: PrivateKeyAccount | AddressString }): WalletClient;
}
