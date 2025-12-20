import { Mock, afterEach, describe, expect, test, vi } from 'vitest';
import { renderHook } from '@testing-library/react';

import ArtifactsJPYCPrepaid from '../../artifacts/contracts/JPYCPrepaid.json';
import { useTotalSupply } from './useTotalSupply';

vi.mock('../', () => ({
  useConfig: vi.fn(),
}));

vi.mock('wagmi', () => ({
  useReadContract: vi.fn(),
}));

import { useReadContract } from 'wagmi';
import { useConfig } from '..';

describe("Unit tests of 'useTotalSupply' hook", () => {
  const JPYC_PREPAID_PROXY_ADDRESS = '0x431D5dfF03120AFA4bDf332c61A6e1766eF37BDB';
  const userAddress = '0x70997970C51812dc3A010C7d01b50e0d17dc79C8';
  const isPending = false;
  const error = null;
  const refetch = vi.fn();

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('success: skip = false & totalSupply = 100000000', () => {
    const totalSupply = 100000000000000000000000000n;

    (useConfig as Mock).mockReturnValue({
      contractAbi: ArtifactsJPYCPrepaid.abi,
      contractAddress: JPYC_PREPAID_PROXY_ADDRESS,
      userAddress,
    });
    (useReadContract as Mock).mockReturnValue({
      data: totalSupply,
      isPending,
      error,
      refetch,
    });

    const { result } = renderHook(() => useTotalSupply({}));

    expect(useConfig).toHaveBeenCalledOnce();
    expect(useConfig).toHaveBeenCalledWith();
    expect(useReadContract).toHaveBeenCalledOnce();
    expect(useReadContract).toHaveBeenCalledWith({
      abi: ArtifactsJPYCPrepaid.abi,
      address: JPYC_PREPAID_PROXY_ADDRESS,
      functionName: 'totalSupply',
      args: [],
      query: { enabled: true },
      account: userAddress,
    });
    expect(result.current).toStrictEqual({
      data: '100000000',
      isPending,
      error,
      refetch,
    });
  });

  test('success: skip = false & totalSupply = 0', () => {
    const totalSupply = 0n;

    (useConfig as Mock).mockReturnValue({
      contractAbi: ArtifactsJPYCPrepaid.abi,
      contractAddress: JPYC_PREPAID_PROXY_ADDRESS,
      userAddress,
    });
    (useReadContract as Mock).mockReturnValue({
      data: totalSupply,
      isPending,
      error,
      refetch,
    });

    const { result } = renderHook(() => useTotalSupply({}));

    expect(useConfig).toHaveBeenCalledOnce();
    expect(useConfig).toHaveBeenCalledWith();
    expect(useReadContract).toHaveBeenCalledOnce();
    expect(useReadContract).toHaveBeenCalledWith({
      abi: ArtifactsJPYCPrepaid.abi,
      address: JPYC_PREPAID_PROXY_ADDRESS,
      functionName: 'totalSupply',
      args: [],
      query: { enabled: true },
      account: userAddress,
    });
    expect(result.current).toStrictEqual({
      data: '0',
      isPending,
      error,
      refetch,
    });
  });

  test('success: skip = true', () => {
    const skip = true;
    const totalSupply = undefined;

    (useConfig as Mock).mockReturnValue({
      contractAbi: ArtifactsJPYCPrepaid.abi,
      contractAddress: JPYC_PREPAID_PROXY_ADDRESS,
      userAddress,
    });
    (useReadContract as Mock).mockReturnValue({
      data: totalSupply,
      isPending,
      error,
      refetch,
    });

    const { result } = renderHook(() => useTotalSupply({ skip }));

    expect(useConfig).toHaveBeenCalledOnce();
    expect(useConfig).toHaveBeenCalledWith();
    expect(useReadContract).toHaveBeenCalledOnce();
    expect(useReadContract).toHaveBeenCalledWith({
      abi: ArtifactsJPYCPrepaid.abi,
      address: JPYC_PREPAID_PROXY_ADDRESS,
      functionName: 'totalSupply',
      args: [],
      query: { enabled: false },
      account: userAddress,
    });
    expect(result.current).toStrictEqual({
      data: totalSupply,
      isPending,
      error,
      refetch,
    });
  });

  test('success: contractAbi = undefined', () => {
    const totalSupply = undefined;

    (useConfig as Mock).mockReturnValue({
      contractAbi: undefined,
      contractAddress: JPYC_PREPAID_PROXY_ADDRESS,
      userAddress,
    });
    (useReadContract as Mock).mockReturnValue({
      data: totalSupply,
      isPending,
      error,
      refetch,
    });

    const { result } = renderHook(() => useTotalSupply({}));

    expect(useConfig).toHaveBeenCalledOnce();
    expect(useConfig).toHaveBeenCalledWith();
    expect(useReadContract).toHaveBeenCalledOnce();
    expect(useReadContract).toHaveBeenCalledWith({
      abi: undefined,
      address: JPYC_PREPAID_PROXY_ADDRESS,
      functionName: 'totalSupply',
      args: [],
      query: { enabled: false },
      account: userAddress,
    });
    expect(result.current).toStrictEqual({
      data: totalSupply,
      isPending,
      error,
      refetch,
    });
  });

  test('success: contractAddress = undefined', () => {
    const totalSupply = undefined;

    (useConfig as Mock).mockReturnValue({
      contractAbi: ArtifactsJPYCPrepaid.abi,
      contractAddress: undefined,
      userAddress,
    });
    (useReadContract as Mock).mockReturnValue({
      data: totalSupply,
      isPending,
      error,
      refetch,
    });

    const { result } = renderHook(() => useTotalSupply({}));

    expect(useConfig).toHaveBeenCalledOnce();
    expect(useConfig).toHaveBeenCalledWith();
    expect(useReadContract).toHaveBeenCalledOnce();
    expect(useReadContract).toHaveBeenCalledWith({
      abi: ArtifactsJPYCPrepaid.abi,
      address: undefined,
      functionName: 'totalSupply',
      args: [],
      query: { enabled: false },
      account: userAddress,
    });
    expect(result.current).toStrictEqual({
      data: totalSupply,
      isPending,
      error,
      refetch,
    });
  });

  test('success: userAddress = undefined', () => {
    const totalSupply = undefined;

    (useConfig as Mock).mockReturnValue({
      contractAbi: ArtifactsJPYCPrepaid.abi,
      contractAddress: JPYC_PREPAID_PROXY_ADDRESS,
      userAddress: undefined,
    });
    (useReadContract as Mock).mockReturnValue({
      data: totalSupply,
      isPending,
      error,
      refetch,
    });

    const { result } = renderHook(() => useTotalSupply({}));

    expect(useConfig).toHaveBeenCalledOnce();
    expect(useConfig).toHaveBeenCalledWith();
    expect(useReadContract).toHaveBeenCalledOnce();
    expect(useReadContract).toHaveBeenCalledWith({
      abi: ArtifactsJPYCPrepaid.abi,
      address: JPYC_PREPAID_PROXY_ADDRESS,
      functionName: 'totalSupply',
      args: [],
      query: { enabled: false },
      account: undefined,
    });
    expect(result.current).toStrictEqual({
      data: totalSupply,
      isPending,
      error,
      refetch,
    });
  });

  test('some error from `useReadContract`', () => {
    const isPending = true;
    const error = new Error('Failed to read contract');

    (useConfig as Mock).mockReturnValue({
      contractAbi: ArtifactsJPYCPrepaid.abi,
      contractAddress: JPYC_PREPAID_PROXY_ADDRESS,
      userAddress,
    });
    (useReadContract as Mock).mockReturnValue({
      data: undefined,
      isPending,
      error,
      refetch,
    });

    const { result } = renderHook(() => useTotalSupply({}));

    expect(useConfig).toHaveBeenCalledOnce();
    expect(useConfig).toHaveBeenCalledWith();
    expect(useReadContract).toHaveBeenCalledOnce();
    expect(useReadContract).toHaveBeenCalledWith({
      abi: ArtifactsJPYCPrepaid.abi,
      address: JPYC_PREPAID_PROXY_ADDRESS,
      functionName: 'totalSupply',
      args: [],
      query: { enabled: true },
      account: userAddress,
    });
    expect(result.current).toStrictEqual({
      data: undefined,
      isPending,
      error,
      refetch,
    });
  });
});
