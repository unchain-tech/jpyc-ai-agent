import { Uint256 } from 'soltypes';
import { describe, expect, test } from 'vitest';

import { scaleDown, scaleUp } from './decimals';

describe('Unit tests of decimals utility functions', () => {
  describe('Unit tests of scaleDown()', () => {
    test('10000000000000000000000 => 10000', () => {
      const value = 10000000000000000000000n;
      expect(scaleDown({ value })).toStrictEqual('10000');
    });

    test('1000000000000000000000000 => 1000000', () => {
      const value = 1000000000000000000000000n;
      expect(scaleDown({ value })).toStrictEqual('1000000');
    });
  });
  describe('Unit tests of scaleUp()', () => {
    test('10000 => 10000000000000000000000', () => {
      const value = '10000';
      expect(scaleUp({ value })).toStrictEqual(Uint256.from(10000000000000000000000n.toString()));
    });

    test('1000000 => 1000000000000000000000000', () => {
      const value = '1000000';
      expect(scaleUp({ value })).toStrictEqual(Uint256.from(1000000000000000000000000n.toString()));
    });
  });
});
