import { Uint8, Uint256 } from 'soltypes';
import { hexToNumber, parseUnits, slice } from 'viem';

import { account, client, jpyc, spender } from './config';
import { LOCAL_CHAIN_ID, LOCAL_PROXY_CONTRACT_ADDRESS, TOKEN_DECIMALS } from './constants';

async function main(): Promise<void> {
  // 1. Prepare typed data
  const domain = {
    name: 'JPY Coin',
    version: '1',
    chainId: BigInt(LOCAL_CHAIN_ID),
    verifyingContract: LOCAL_PROXY_CONTRACT_ADDRESS,
  } as const;
  const types = {
    EIP712Domain: [
      { name: 'name', type: 'string' },
      { name: 'version', type: 'string' },
      { name: 'chainId', type: 'uint256' },
      { name: 'verifyingContract', type: 'address' },
    ],
    Permit: [
      { name: 'owner', type: 'address' },
      { name: 'spender', type: 'address' },
      { name: 'value', type: 'uint256' },
      { name: 'nonce', type: 'uint256' },
      { name: 'deadline', type: 'uint256' },
    ],
  } as const;
  const value = 300n;
  const deadline = BigInt(Date.now()) / 1000n + 3600n;
  const nonce = await jpyc.nonces({ owner: account.address });

  // 2. Sign data
  const signature = await client.signTypedData({
    account,
    domain,
    types,
    primaryType: 'Permit',
    message: {
      owner: account.address,
      spender: spender,
      value: parseUnits(value.toString(), TOKEN_DECIMALS),
      nonce: BigInt(nonce.toString()),
      deadline: deadline,
    },
  });

  const v = slice(signature, 64, 65);
  const r = slice(signature, 0, 32);
  const s = slice(signature, 32, 64);

  // 3. Permit (allows approvals via signatures)
  await jpyc.permit({
    owner: account.address,
    spender: spender,
    value: Number(value),
    deadline: Uint256.from(deadline.toString()),
    v: Uint8.from(hexToNumber(v).toString()),
    r: r,
    s: s,
  });

  // 4. Check allowance
  const allowance = await jpyc.allowance({
    owner: account.address,
    spender: spender,
  });
  console.log(`spender allowance: ${allowance.toString()}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
