import { describe, expect, test } from 'vitest';

import { getRpcUrl, isSupportedChain } from './chains';

describe('Unit tests of chain utility functions', () => {
  describe('Unit tests of isSupportedChain()', () => {
    test('returns true if chainID = 1 (Ethereum mainnet)', () => {
      const chainId = 1;
      expect(isSupportedChain({ chainId })).toStrictEqual(true);
    });

    test('returns true if chainID = 11155111 (Ethereum Sepolia)', () => {
      const chainId = 11155111;
      expect(isSupportedChain({ chainId })).toStrictEqual(true);
    });

    test('returns true if chainID = 137 (Polygon PoS)', () => {
      const chainId = 137;
      expect(isSupportedChain({ chainId })).toStrictEqual(true);
    });

    test('returns true if chainID = 80002 (Polygon Amoy)', () => {
      const chainId = 80002;
      expect(isSupportedChain({ chainId })).toStrictEqual(true);
    });

    test('returns true if chainID = 100 (Gnosis)', () => {
      const chainId = 100;
      expect(isSupportedChain({ chainId })).toStrictEqual(true);
    });

    test('returns true if chainID = 10200 (Gnosis Chiado)', () => {
      const chainId = 10200;
      expect(isSupportedChain({ chainId })).toStrictEqual(true);
    });

    test('returns true if chainID = 43114 (Avalanche)', () => {
      const chainId = 43114;
      expect(isSupportedChain({ chainId })).toStrictEqual(true);
    });

    test('returns true if chainID = 43113 (Avalanche Fuji)', () => {
      const chainId = 43113;
      expect(isSupportedChain({ chainId })).toStrictEqual(true);
    });

    test('returns true if chainID = 592 (Astar)', () => {
      const chainId = 592;
      expect(isSupportedChain({ chainId })).toStrictEqual(true);
    });

    test('returns true if chainID = 336 (Shiden)', () => {
      const chainId = 336;
      expect(isSupportedChain({ chainId })).toStrictEqual(true);
    });

    test('returns true if chainID = 31337 (Local network)', () => {
      const chainId = 31337;
      expect(isSupportedChain({ chainId })).toStrictEqual(true);
    });

    test('returns false if chainID is not supported', () => {
      const chainId = 0;
      expect(isSupportedChain({ chainId })).toStrictEqual(false);
    });
  });

  describe('Unit tests of getRpcUrl()', () => {
    test('returns the default RPC endpoint URL of Ethereum mainnet if chainId = 1', () => {
      const rpcUrl = getRpcUrl({ chainId: 1 });
      expect(rpcUrl).toStrictEqual('https://eth.merkle.io');
    });

    test('returns undefined if chainId is invalid', () => {
      const rpcUrl = getRpcUrl({ chainId: 0 });
      expect(rpcUrl).toStrictEqual(undefined);
    });
  });
});
