import { describe, expect, test } from 'vitest';

import ArtifactsJPYC from '../artifacts/contracts/JPYC.json';
import ArtifactsJPYCPrepaid from '../artifacts/contracts/JPYCPrepaid.json';
import { getContractAbi } from './abis';

describe('Unit tests of getContractAbi()', () => {
  test("returns ABI if contractType = 'jpyc'", () => {
    const contractType = 'jpyc';
    expect(getContractAbi({ contractType })).toStrictEqual(ArtifactsJPYC.abi);
  });

  test("returns ABI if contractType = 'jpycPrepaid'", () => {
    const contractType = 'jpycPrepaid';
    expect(getContractAbi({ contractType })).toStrictEqual(ArtifactsJPYCPrepaid.abi);
  });

  test("returns 'undefined' if contractType is invalid", () => {
    const contractType = 'jpycV2';
    expect(getContractAbi({ contractType })).toStrictEqual(undefined);
  });
});
