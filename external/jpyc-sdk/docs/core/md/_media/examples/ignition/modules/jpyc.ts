import { buildModule } from '@nomicfoundation/hardhat-ignition/modules';

import { proxyModule } from './proxy';

export const jpycModule = buildModule('jpycModule', (m) => {
  const { proxyContract } = m.useModule(proxyModule);

  const jpycContract = m.contractAt('FiatTokenV1', proxyContract);

  return { jpycContract };
});
