import {
  Chain,
  createWalletClient,
  http,
  PrivateKeyAccount,
  publicActions,
  WalletClient,
} from 'viem';
import { privateKeyToAccount } from 'viem/accounts';

import { ISdkClient } from './interfaces';
import {
  AddressString,
  Bytes32,
  getRpcUrl,
  isSupportedChain,
  InvalidChainIdError,
  SUPPORTED_CHAINS,
} from './utils';

export class SdkClient implements ISdkClient {
  private chain: Chain;
  private rpcUrl: string;
  private account: PrivateKeyAccount;
  private client: WalletClient;

  /**
   * Constructor of an `SdkClient` instance.
   *
   * @param chainId Chain ID
   * @param rpcUrl Custom RPC endpoint URL (in any)
   */
  constructor({ chainId, rpcUrl }: { chainId: number; rpcUrl?: string }) {
    if (!isSupportedChain({ chainId })) {
      throw new InvalidChainIdError({ chainId });
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.chain = SUPPORTED_CHAINS.find((chain) => chain.id === chainId)!;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.rpcUrl = rpcUrl ?? getRpcUrl({ chainId })!;
  }

  configurePrivateKeyAccount({ privateKey }: { privateKey: Bytes32 }): PrivateKeyAccount {
    this.account = privateKeyToAccount(privateKey);

    return this.account;
  }

  configureClient({ account }: { account: PrivateKeyAccount | AddressString }): WalletClient {
    this.client = createWalletClient({
      account: account,
      chain: this.chain,
      transport: http(this.rpcUrl),
    }).extend(publicActions);

    return this.client;
  }
}
