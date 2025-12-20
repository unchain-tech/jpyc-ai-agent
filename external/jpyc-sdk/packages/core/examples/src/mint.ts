import { account, jpyc } from './config';

async function main(): Promise<void> {
  const minterAllowanceBefore = await jpyc.minterAllowance({ minter: account.address });
  console.log(
    `minterAllowance before calling "configureMinter()": ${minterAllowanceBefore.toString()}`,
  );

  // 1. Configure a minter
  await jpyc.configureMinter({
    minter: account.address,
    minterAllowedAmount: 1000000,
  });

  const minterAllowanceAfter = await jpyc.minterAllowance({ minter: account.address });
  console.log(
    `minterAllowance after calling "configureMinter()": ${minterAllowanceAfter.toString()}`,
  );

  const balanceOfBefore = await jpyc.balanceOf({ account: account.address });
  console.log(`Balance before minting: ${balanceOfBefore.toString()}`);

  // 2. Mint JPYC
  await jpyc.mint({
    to: account.address,
    amount: 10000,
  });

  const balanceOfAfter = await jpyc.balanceOf({ account: account.address });
  console.log(`Balance after minting: ${balanceOfAfter.toString()}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
