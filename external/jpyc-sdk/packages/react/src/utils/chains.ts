import { type Chain, defineChain } from 'viem';
import {
  mainnet,
  sepolia,
  polygon,
  polygonAmoy,
  gnosis,
  gnosisChiado,
  avalanche,
  avalancheFuji,
  astar,
  shiden,
} from 'wagmi/chains';

/** Local chain configs (e.g., anvil, hardhat). */
const localChains: Chain[] = [
  defineChain({
    id: 31337,
    name: 'Local Network',
    nativeCurrency: {
      decimals: 18,
      name: 'Ether',
      symbol: 'ETH',
    },
    rpcUrls: {
      default: {
        http: ['http://127.0.0.1:8545/'],
        webSocket: ['http://127.0.0.1:8545/'],
      },
    },
  }),
];

/** Supported chains. */
export const SUPPORTED_CHAINS: [Chain, ...Chain[]] = [
  mainnet,
  sepolia,
  polygon,
  polygonAmoy,
  gnosis,
  gnosisChiado,
  avalanche,
  avalancheFuji,
  astar,
  shiden,
  ...localChains,
];

/** Checks if the given chain is supported by the SDK.
 *
 * @param chainId Chain ID
 * @returns True if supported chain, false otherwise
 */
export function isSupportedChain({ chainId }: { chainId: number }): boolean {
  return SUPPORTED_CHAINS.map((chain) => chain.id).includes(chainId);
}
