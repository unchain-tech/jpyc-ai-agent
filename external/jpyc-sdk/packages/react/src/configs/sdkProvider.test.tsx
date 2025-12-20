import { useContext } from 'react';
import { afterEach, describe, test, expect, vi } from 'vitest';
import { useConfig } from 'wagmi';
import { cleanup, render, screen } from '@testing-library/react';

import { SdkContext } from './sdkContext';
import { JpycSdkProvider } from './sdkProvider';
import { SUPPORTED_CHAINS } from '../utils';

const httpMock = vi.fn();

vi.mock('wagmi', async () => {
  const actual = await vi.importActual<typeof import('wagmi')>('wagmi');
  return {
    ...actual,
    http: (url?: string) => {
      httpMock(url);
      return actual.http(url);
    },
  };
});

describe('Unit tests of `JpycSdkProvider`', () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  test('renders children inside provider', () => {
    render(
      <JpycSdkProvider env="prod" contractType="jpyc">
        <div data-testid="children-prod-jpyc"></div>
      </JpycSdkProvider>,
    );

    expect(screen.getByTestId('children-prod-jpyc')).toBeDefined();

    render(
      <JpycSdkProvider env="prod" contractType="jpycPrepaid">
        <div data-testid="children-prod-jpycPrepaid"></div>
      </JpycSdkProvider>,
    );

    expect(screen.getByTestId('children-prod-jpycPrepaid')).toBeDefined();

    render(
      <JpycSdkProvider env="local" contractType="jpyc" localContractAddress="0x123">
        <div data-testid="children-local-jpyc"></div>
      </JpycSdkProvider>,
    );

    expect(screen.getByTestId('children-local-jpyc')).toBeDefined();

    render(
      <JpycSdkProvider env="local" contractType="jpycPrepaid" localContractAddress="0x123">
        <div data-testid="children-local-jpycPrepaid"></div>
      </JpycSdkProvider>,
    );

    expect(screen.getByTestId('children-local-jpycPrepaid')).toBeDefined();
  });

  test('provides SdkContext values', () => {
    vi.spyOn(window, 'localStorage', 'get').mockReturnValue({
      getItem: vi.fn(),
      setItem: vi.fn(),
      removeItem: vi.fn(),
      key: 'wagmi',
      length: 0,
    } as any);

    const ethereumCustomRpc = 'http://eth-custom';
    const polygonCustomRpc = 'http://pol-custom';

    function SdkContextConsumer() {
      const ctx = useContext(SdkContext);
      return <div data-testid="sdk-ctx">{JSON.stringify(ctx)}</div>;
    }

    function WagmiConfigConsumer() {
      const config = useConfig();
      return (
        <div data-testid="wagmi-config">
          {JSON.stringify({
            chainIds: config.chains.map((c) => c.id),
            connectorIds: config.connectors.map((c) => c.id),
            storage: config.storage,
          })}
        </div>
      );
    }

    render(
      <JpycSdkProvider
        env="prod"
        contractType="jpyc"
        rpcs={{
          1: ethereumCustomRpc,
          137: polygonCustomRpc,
        }}
      >
        <SdkContextConsumer />
        <WagmiConfigConsumer />
      </JpycSdkProvider>,
    );

    const ctx = JSON.parse(screen.getByTestId('sdk-ctx').textContent);

    expect(ctx.env).toStrictEqual('prod');
    expect(ctx.contractType).toStrictEqual('jpyc');

    const wagmiConfig = JSON.parse(screen.getByTestId('wagmi-config').textContent);

    expect(wagmiConfig.chainIds).toStrictEqual(SUPPORTED_CHAINS.map((c) => c.id));
    expect(wagmiConfig.connectorIds).toStrictEqual(['injected', 'metaMaskSDK']);
    expect(wagmiConfig.storage).toBeDefined();
    expect(httpMock).toHaveBeenCalledTimes(11);
    expect(httpMock).toHaveBeenNthCalledWith(1, ethereumCustomRpc);
    expect(httpMock).toHaveBeenNthCalledWith(2, undefined);
    expect(httpMock).toHaveBeenNthCalledWith(3, polygonCustomRpc);
    expect(httpMock).toHaveBeenNthCalledWith(4, undefined);
    expect(httpMock).toHaveBeenNthCalledWith(5, undefined);
    expect(httpMock).toHaveBeenNthCalledWith(6, undefined);
    expect(httpMock).toHaveBeenNthCalledWith(7, undefined);
    expect(httpMock).toHaveBeenNthCalledWith(8, undefined);
    expect(httpMock).toHaveBeenNthCalledWith(9, undefined);
    expect(httpMock).toHaveBeenNthCalledWith(10, undefined);
    expect(httpMock).toHaveBeenNthCalledWith(11, undefined);
  });
});
