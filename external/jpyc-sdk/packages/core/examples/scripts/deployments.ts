import hre from 'hardhat';

import { jpycModule } from '../ignition/modules/main';

async function main(): Promise<void> {
  await hre.ignition.deploy(jpycModule);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
