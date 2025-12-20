import { ReactElement } from 'react';
import { WagmiProvider, http, createConfig, createStorage } from 'wagmi';
import { injected, metaMask } from 'wagmi/connectors';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import type { JpycSdkProviderProps } from '../utils';
import { SUPPORTED_CHAINS } from '../utils';
import { SdkContext } from './';

/** Configures JPYC SDK provider.
 *
 * @param env Env string (either `prod` or `local`)
 * @param contractType Contract type (either `jpyc` or `jpycPrepaid`)
 * @param localContractAddress Locally-deployed contract address
 * @param rpcs Custom RPC endpoints
 * @param children Any children blocks to be wrapped
 * @returns Configured SDK provider
 */
export function JpycSdkProvider({
  env = 'local',
  contractType = 'jpyc',
  localContractAddress = undefined,
  rpcs = {},
  children,
}: JpycSdkProviderProps): ReactElement {
  const queryClient = new QueryClient();

  const wagmiConfig = createConfig({
    chains: SUPPORTED_CHAINS,
    connectors: [injected(), metaMask()],
    multiInjectedProviderDiscovery: true,
    ssr: false,
    storage: createStorage({
      storage: typeof window !== 'undefined' ? window.localStorage : undefined,
    }),
    syncConnectedChain: true,
    batch: { multicall: true },
    cacheTime: 4_000,
    pollingInterval: 4_000,
    transports: Object.fromEntries(
      SUPPORTED_CHAINS.map((chain) => [chain.id, http(rpcs[chain.id] ?? undefined)]),
    ),
  });

  return (
    <SdkContext.Provider value={{ env, contractType, localContractAddress }}>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </WagmiProvider>
    </SdkContext.Provider>
  );
}
