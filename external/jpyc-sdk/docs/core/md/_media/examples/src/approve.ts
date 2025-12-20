import { account, jpyc, spender } from './config';

async function main(): Promise<void> {
  // 1. Approve to spend allowance
  await jpyc.approve({
    spender: spender,
    value: 5000,
  });

  // 2. Check allowance
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
