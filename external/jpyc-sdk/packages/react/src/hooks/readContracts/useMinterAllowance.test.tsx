import { Mock, afterEach, describe, expect, test, vi } from 'vitest';
import { renderHook } from '@testing-library/react';

import ArtifactsJPYCPrepaid from '../../artifacts/contracts/JPYCPrepaid.json';
import { useMinterAllowance } from './useMinterAllowance';

vi.mock('../', () => ({
  useConfig: vi.fn(),
}));

vi.mock('wagmi', () => ({
  useReadContract: vi.fn(),
}));

import { useReadContract } from 'wagmi';
import { useConfig } from '..';

describe("Unit tests of 'useMinterAllowance' hook", () => {
  const JPYC_PREPAID_PROXY_ADDRESS = '0x431D5dfF03120AFA4bDf332c61A6e1766eF37BDB';
  const userAddress = '0x70997970C51812dc3A010C7d01b50e0d17dc79C8';
  const minter = '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC';
  const isPending = false;
  const error = null;
  const refetch = vi.fn();

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('success: skip = false & minterAllowance = 10000', () => {
    const minterAllowance = 10000000000000000000000n;

    (useConfig as Mock).mockReturnValue({
      contractAbi: ArtifactsJPYCPrepaid.abi,
      contractAddress: JPYC_PREPAID_PROXY_ADDRESS,
      userAddress,
    });
    (useReadContract as Mock).mockReturnValue({
      data: minterAllowance,
      isPending,
      error,
      refetch,
    });

    const { result } = renderHook(() => useMinterAllowance({ minter }));

    expect(useConfig).toHaveBeenCalledOnce();
    expect(useConfig).toHaveBeenCalledWith();
    expect(useReadContract).toHaveBeenCalledOnce();
    expect(useReadContract).toHaveBeenCalledWith({
      abi: ArtifactsJPYCPrepaid.abi,
      address: JPYC_PREPAID_PROXY_ADDRESS,
      functionName: 'minterAllowance',
      args: [minter],
      query: { enabled: true },
      account: userAddress,
    });
    expect(result.current).toStrictEqual({
      data: '10000',
      isPending,
      error,
      refetch,
    });
  });

  test('success: skip = false & minterAllowance = 0', () => {
    const minterAllowance = 0n;

    (useConfig as Mock).mockReturnValue({
      contractAbi: ArtifactsJPYCPrepaid.abi,
      contractAddress: JPYC_PREPAID_PROXY_ADDRESS,
      userAddress,
    });
    (useReadContract as Mock).mockReturnValue({
      data: minterAllowance,
      isPending,
      error,
      refetch,
    });

    const { result } = renderHook(() => useMinterAllowance({ minter }));

    expect(useConfig).toHaveBeenCalledOnce();
    expect(useConfig).toHaveBeenCalledWith();
    expect(useReadContract).toHaveBeenCalledOnce();
    expect(useReadContract).toHaveBeenCalledWith({
      abi: ArtifactsJPYCPrepaid.abi,
      address: JPYC_PREPAID_PROXY_ADDRESS,
      functionName: 'minterAllowance',
      args: [minter],
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
    const minterAllowance = undefined;

    (useConfig as Mock).mockReturnValue({
      contractAbi: ArtifactsJPYCPrepaid.abi,
      contractAddress: JPYC_PREPAID_PROXY_ADDRESS,
      userAddress,
    });
    (useReadContract as Mock).mockReturnValue({
      data: minterAllowance,
      isPending,
      error,
      refetch,
    });

    const { result } = renderHook(() => useMinterAllowance({ minter, skip }));

    expect(useConfig).toHaveBeenCalledOnce();
    expect(useConfig).toHaveBeenCalledWith();
    expect(useReadContract).toHaveBeenCalledOnce();
    expect(useReadContract).toHaveBeenCalledWith({
      abi: ArtifactsJPYCPrepaid.abi,
      address: JPYC_PREPAID_PROXY_ADDRESS,
      functionName: 'minterAllowance',
      args: [minter],
      query: { enabled: false },
      account: userAddress,
    });
    expect(result.current).toStrictEqual({
      data: minterAllowance,
      isPending,
      error,
      refetch,
    });
  });

  test('success: contractAbi = undefined', () => {
    const minterAllowance = undefined;

    (useConfig as Mock).mockReturnValue({
      contractAbi: undefined,
      contractAddress: JPYC_PREPAID_PROXY_ADDRESS,
      userAddress,
    });
    (useReadContract as Mock).mockReturnValue({
      data: minterAllowance,
      isPending,
      error,
      refetch,
    });

    const { result } = renderHook(() => useMinterAllowance({ minter }));

    expect(useConfig).toHaveBeenCalledOnce();
    expect(useConfig).toHaveBeenCalledWith();
    expect(useReadContract).toHaveBeenCalledOnce();
    expect(useReadContract).toHaveBeenCalledWith({
      abi: undefined,
      address: JPYC_PREPAID_PROXY_ADDRESS,
      functionName: 'minterAllowance',
      args: [minter],
      query: { enabled: false },
      account: userAddress,
    });
    expect(result.current).toStrictEqual({
      data: minterAllowance,
      isPending,
      error,
      refetch,
    });
  });

  test('success: contractAddress = undefined', () => {
    const minterAllowance = undefined;

    (useConfig as Mock).mockReturnValue({
      contractAbi: ArtifactsJPYCPrepaid.abi,
      contractAddress: undefined,
      userAddress,
    });
    (useReadContract as Mock).mockReturnValue({
      data: minterAllowance,
      isPending,
      error,
      refetch,
    });

    const { result } = renderHook(() => useMinterAllowance({ minter }));

    expect(useConfig).toHaveBeenCalledOnce();
    expect(useConfig).toHaveBeenCalledWith();
    expect(useReadContract).toHaveBeenCalledOnce();
    expect(useReadContract).toHaveBeenCalledWith({
      abi: ArtifactsJPYCPrepaid.abi,
      address: undefined,
      functionName: 'minterAllowance',
      args: [minter],
      query: { enabled: false },
      account: userAddress,
    });
    expect(result.current).toStrictEqual({
      data: minterAllowance,
      isPending,
      error,
      refetch,
    });
  });

  test('success: userAddress = undefined', () => {
    const minterAllowance = undefined;

    (useConfig as Mock).mockReturnValue({
      contractAbi: ArtifactsJPYCPrepaid.abi,
      contractAddress: JPYC_PREPAID_PROXY_ADDRESS,
      userAddress: undefined,
    });
    (useReadContract as Mock).mockReturnValue({
      data: minterAllowance,
      isPending,
      error,
      refetch,
    });

    const { result } = renderHook(() => useMinterAllowance({ minter }));

    expect(useConfig).toHaveBeenCalledOnce();
    expect(useConfig).toHaveBeenCalledWith();
    expect(useReadContract).toHaveBeenCalledOnce();
    expect(useReadContract).toHaveBeenCalledWith({
      abi: ArtifactsJPYCPrepaid.abi,
      address: JPYC_PREPAID_PROXY_ADDRESS,
      functionName: 'minterAllowance',
      args: [minter],
      query: { enabled: false },
      account: undefined,
    });
    expect(result.current).toStrictEqual({
      data: minterAllowance,
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

    const { result } = renderHook(() => useMinterAllowance({ minter }));

    expect(useConfig).toHaveBeenCalledOnce();
    expect(useConfig).toHaveBeenCalledWith();
    expect(useReadContract).toHaveBeenCalledOnce();
    expect(useReadContract).toHaveBeenCalledWith({
      abi: ArtifactsJPYCPrepaid.abi,
      address: JPYC_PREPAID_PROXY_ADDRESS,
      functionName: 'minterAllowance',
      args: [minter],
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
