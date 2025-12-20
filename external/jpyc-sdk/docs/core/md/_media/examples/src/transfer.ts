import { account, jpyc, receiver } from './config';

async function main(): Promise<void> {
  // 1. Transfer tokens
  await jpyc.transfer({
    to: receiver,
    value: 1000,
  });

  // 2. Check balances
  const balanceSender = await jpyc.balanceOf({
    account: account.address,
  });
  console.log(`balance (sender): ${balanceSender.toString()}`);

  const balanceReceiver = await jpyc.balanceOf({
    account: receiver,
  });
  console.log(`balance (receiver): ${balanceReceiver.toString()}`);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
