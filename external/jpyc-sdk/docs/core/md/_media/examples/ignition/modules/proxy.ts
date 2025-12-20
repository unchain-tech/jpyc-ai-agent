import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';
import { Uint8 } from 'soltypes';
import { encodeFunctionData } from 'viem';
import { privateKeyToAccount } from 'viem/accounts';

import { getContractAbi } from '@jpyc/sdk-core';

export const proxyModule = buildModule('ProxyModule', (m) => {
  // deploy JPYC contract
  const jpycContract = m.contract('FiatTokenV1');

  // deploy proxy contract & initialize JPYC contract
  const account = privateKeyToAccount(
    '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80',
  );
  const encodedInitializationCall = encodeFunctionData({
    abi: getContractAbi({ contractType: 'jpyc' })!,
    functionName: 'initialize',
    args: [
      'JPY Coin',
      'JPYC',
      'Yen',
      Uint8.from('18'),
      account.address,
      account.address,
      account.address,
      account.address,
      account.address,
    ],
  });

  const proxyContract = m.contract('ERC1967Proxy', [jpycContract, encodedInitializationCall]);

  return { proxyContract };
});
