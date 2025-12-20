import { FC, ReactNode } from 'react';
import { Mock, afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { renderHook } from '@testing-library/react';

import ArtifactsJPYC from '../artifacts/contracts/JPYC.json';
import ArtifactsJPYCPrepaid from '../artifacts/contracts/JPYCPrepaid.json';
import { SdkContext } from '../configs';
import {
  ConnectedChainNotSupported,
  ContractTypeInvalid,
  ContractTypeUndefined,
  JpycSdkContextUndefined,
  JpycSdkEnvInvalid,
  JpycSdkEnvUndefined,
} from '../utils';
import { useConfig } from './useConfig';

vi.mock('wagmi', () => ({
  useAccount: vi.fn(),
  useChainId: vi.fn(),
}));

import { useAccount, useChainId } from 'wagmi';

describe("Unit tests of 'useConfig' hook", () => {
  const JPYC_PROXY_ADDRESS = '0xE7C3D8C9a439feDe00D2600032D5dB0Be71C3c29';
  const JPYC_PREPAID_PROXY_ADDRESS = '0x431D5dfF03120AFA4bDf332c61A6e1766eF37BDB';
  const userAddress = '0x70997970C51812dc3A010C7d01b50e0d17dc79C8';
  const connectionStatus = 'connected';
  const chainId = 1;

  beforeEach(() => {
    (useAccount as Mock).mockReturnValue({ address: userAddress, status: connectionStatus });
    (useChainId as Mock).mockReturnValue(chainId);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('success: local-jpyc', () => {
    const env = 'local';
    const contractType = 'jpyc';
    const localContractAddress = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512';

    const wrapper: FC<{ children: ReactNode }> = ({ children }) => (
      <SdkContext.Provider value={{ env, contractType, localContractAddress }}>
        {children}
      </SdkContext.Provider>
    );

    const { result } = renderHook(() => useConfig(), { wrapper });

    expect(result.current).toStrictEqual({
      contractAbi: ArtifactsJPYC.abi,
      contractAddress: localContractAddress,
      chainId: chainId,
      userAddress: userAddress,
      connectionStatus: connectionStatus,
    });
  });

  test('success: local-jpycPrepaid', () => {
    const env = 'local';
    const contractType = 'jpycPrepaid';
    const localContractAddress = '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512';

    const wrapper: FC<{ children: ReactNode }> = ({ children }) => (
      <SdkContext.Provider value={{ env, contractType, localContractAddress }}>
        {children}
      </SdkContext.Provider>
    );

    const { result } = renderHook(() => useConfig(), { wrapper });

    expect(result.current).toStrictEqual({
      contractAbi: ArtifactsJPYCPrepaid.abi,
      contractAddress: localContractAddress,
      chainId: chainId,
      userAddress: userAddress,
      connectionStatus: connectionStatus,
    });
  });

  test('success: prod-jpyc', () => {
    const env = 'prod';
    const contractType = 'jpyc';

    const wrapper: FC<{ children: ReactNode }> = ({ children }) => (
      <SdkContext.Provider value={{ env, contractType }}>{children}</SdkContext.Provider>
    );

    const { result } = renderHook(() => useConfig(), { wrapper });

    expect(result.current).toStrictEqual({
      contractAbi: ArtifactsJPYC.abi,
      contractAddress: JPYC_PROXY_ADDRESS,
      chainId: chainId,
      userAddress: userAddress,
      connectionStatus: connectionStatus,
    });
  });

  test('success: prod-jpycPrepaid', () => {
    const env = 'prod';
    const contractType = 'jpycPrepaid';

    const wrapper: FC<{ children: ReactNode }> = ({ children }) => (
      <SdkContext.Provider value={{ env, contractType }}>{children}</SdkContext.Provider>
    );

    const { result } = renderHook(() => useConfig(), { wrapper });

    expect(result.current).toStrictEqual({
      contractAbi: ArtifactsJPYC.abi,
      contractAddress: JPYC_PREPAID_PROXY_ADDRESS,
      chainId: chainId,
      userAddress: userAddress,
      connectionStatus: connectionStatus,
    });
  });

  test("error: throws 'JpycSdkContextUndefined'", () => {
    expect(() => {
      renderHook(() => useConfig());
    }).toThrow(JpycSdkContextUndefined);
  });

  test("error: throws 'JpycSdkEnvUndefined'", () => {
    const contractType = 'jpyc';

    const wrapper: FC<{ children: ReactNode }> = ({ children }) => (
      <SdkContext.Provider value={{ contractType }}>{children}</SdkContext.Provider>
    );

    expect(() => {
      renderHook(() => useConfig(), { wrapper });
    }).toThrow(JpycSdkEnvUndefined);
  });

  test("error: throws 'JpycSdkEnvInvalid'", () => {
    const env = 'test';
    const contractType = 'jpyc';

    const wrapper: FC<{ children: ReactNode }> = ({ children }) => (
      <SdkContext.Provider value={{ env, contractType }}>{children}</SdkContext.Provider>
    );

    expect(() => {
      renderHook(() => useConfig(), { wrapper });
    }).toThrow(JpycSdkEnvInvalid);
  });

  test("error: throws 'ContractTypeUndefined'", () => {
    const env = 'local';

    const wrapper: FC<{ children: ReactNode }> = ({ children }) => (
      <SdkContext.Provider value={{ env }}>{children}</SdkContext.Provider>
    );

    expect(() => {
      renderHook(() => useConfig(), { wrapper });
    }).toThrow(ContractTypeUndefined);
  });

  test("error: throws 'ContractTypeInvalid'", () => {
    const env = 'local';
    const contractType = 'jpycV2';

    const wrapper: FC<{ children: ReactNode }> = ({ children }) => (
      <SdkContext.Provider value={{ env, contractType }}>{children}</SdkContext.Provider>
    );

    expect(() => {
      renderHook(() => useConfig(), { wrapper });
    }).toThrow(ContractTypeInvalid);
  });

  test('error: chain not supported', () => {
    (useChainId as Mock).mockReturnValue(0);

    const env = 'prod';
    const contractType = 'jpyc';

    const wrapper: FC<{ children: ReactNode }> = ({ children }) => (
      <SdkContext.Provider value={{ env, contractType }}>{children}</SdkContext.Provider>
    );

    expect(() => {
      renderHook(() => useConfig(), { wrapper });
    }).toThrow(ConnectedChainNotSupported);
  });
});
