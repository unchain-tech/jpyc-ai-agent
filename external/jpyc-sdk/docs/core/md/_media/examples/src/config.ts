import { getRpcUrl, JPYC, SdkClient } from '@jpyc/sdk-core';

import {
  DEFAULT_ADDRESSES,
  EXAMPLE_PRIVATE_KEY,
  LOCAL_CHAIN_ID,
  LOCAL_PROXY_CONTRACT_ADDRESS,
} from './constants';

// 1. Initialize an `SdkClient` instance for the default local network
const sdkClient = new SdkClient({
  chainId: LOCAL_CHAIN_ID,
  rpcUrl: getRpcUrl({ chainId: LOCAL_CHAIN_ID }),
});

// 2. Configure EOAs
export const account = sdkClient.configurePrivateKeyAccount({ privateKey: EXAMPLE_PRIVATE_KEY });
export const receiver = DEFAULT_ADDRESSES[0];
export const spender = DEFAULT_ADDRESSES[1];

// 3. Configure wallet clients
export const client = sdkClient.configureClient({
  account,
});
export const clientReceiver = sdkClient.configureClient({
  account: receiver,
});
export const clientSpender = sdkClient.configureClient({
  account: spender,
});

// 4. Initialize `JPYC` instances
export const jpyc = new JPYC({
  env: 'local',
  contractType: 'jpyc',
  localContractAddress: LOCAL_PROXY_CONTRACT_ADDRESS,
  client,
});
export const jpycReceiver = new JPYC({
  env: 'local',
  contractType: 'jpyc',
  localContractAddress: LOCAL_PROXY_CONTRACT_ADDRESS,
  client: clientReceiver,
});
export const jpycSpender = new JPYC({
  env: 'local',
  contractType: 'jpyc',
  localContractAddress: LOCAL_PROXY_CONTRACT_ADDRESS,
  client: clientSpender,
});
