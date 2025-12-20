import { describe, expect, test } from 'vitest';

import { getContractAddress } from './addresses';

describe('Unit tests of address utility functions', () => {
  describe('Unit tests of getContractAddress()', () => {
    test('env = local & localContractAddress = some valid address => local proxy address', () => {
      const env = 'local';
      const contractType = 'jpyc';
      const localContractAddress = '0x431D5dfF03120AFA4bDf332c61A6e1766eF37BDB';
      const contractAddress = getContractAddress({ env, contractType, localContractAddress });
      expect(contractAddress).toStrictEqual(localContractAddress);
    });

    test('env = local & localContractAddress = some invalid address => undefined', () => {
      const env = 'local';
      const contractType = 'jpyc';
      const localContractAddress = 'INVALID_CONTRACT_ADDRESS';
      const contractAddress = getContractAddress({ env, contractType, localContractAddress });
      expect(contractAddress).toStrictEqual(undefined);
    });

    test('env = local & localContractAddress = undefined => undefined', () => {
      const env = 'local';
      const contractType = 'jpyc';
      const localContractAddress = undefined;
      const contractAddress = getContractAddress({ env, contractType, localContractAddress });
      expect(contractAddress).toStrictEqual(undefined);
    });

    test('env = prod & contractType = jpyc => 0xE7C3D8C9a439feDe00D2600032D5dB0Be71C3c29', () => {
      const env = 'prod';
      const contractType = 'jpyc';
      const localContractAddress = undefined;
      const contractAddress = getContractAddress({ env, contractType, localContractAddress });
      expect(contractAddress).toStrictEqual('0xE7C3D8C9a439feDe00D2600032D5dB0Be71C3c29');
    });

    test('env = prod & contractType = jpycPrepaid => 0x431D5dfF03120AFA4bDf332c61A6e1766eF37BDB', () => {
      const env = 'prod';
      const contractType = 'jpycPrepaid';
      const localContractAddress = undefined;
      const contractAddress = getContractAddress({ env, contractType, localContractAddress });
      expect(contractAddress).toStrictEqual('0x431D5dfF03120AFA4bDf332c61A6e1766eF37BDB');
    });

    test('env = some invalid env string => undefined', () => {
      const env = 'test';
      const contractType = 'jpyc';
      const localContractAddress = undefined;
      const contractAddress = getContractAddress({ env, contractType, localContractAddress });
      expect(contractAddress).toStrictEqual(undefined);
    });
  });
});
