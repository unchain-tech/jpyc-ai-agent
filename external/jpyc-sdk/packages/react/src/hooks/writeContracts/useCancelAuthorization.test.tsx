import { Uint8 } from 'soltypes';
import { Mock, afterEach, describe, expect, test, vi } from 'vitest';
import { act, renderHook } from '@testing-library/react';

import ArtifactsJPYCPrepaid from '../../artifacts/contracts/JPYCPrepaid.json';
import { useCancelAuthorization } from './useCancelAuthorization';

vi.mock('wagmi', () => ({
  useConfig: vi.fn(),
  useWriteContract: vi.fn(),
  useWaitForTransactionReceipt: vi.fn(),
}));

vi.mock('wagmi/actions', () => ({
  simulateContract: vi.fn(),
}));

vi.mock('../', () => ({
  useConfig: vi.fn(),
}));

import { useConfig as useWagmiConfig, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { simulateContract } from 'wagmi/actions';
import { useConfig } from '..';

describe("Unit tests of 'useCancelAuthorization' hook", () => {
  const JPYC_PREPAID_PROXY_ADDRESS = '0x431D5dfF03120AFA4bDf332c61A6e1766eF37BDB';
  const userAddress = '0x70997970C51812dc3A010C7d01b50e0d17dc79C8';

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('tx succeeds w/o any errors', async () => {
    const txHash = '0x123';
    const writeError = null;
    const writeContract = vi.fn();
    const resetWriteStates = vi.fn();
    const txError = null;

    const authorizer = '0x90F79bf6EB2c4f870365E785982E1f101E93b906';
    const nonce = '0x456';
    const v = Uint8.from('100');
    const r = '0x1234';
    const s = '0x5678';

    (useWagmiConfig as Mock).mockReturnValue({});
    (useConfig as Mock).mockReturnValue({
      contractAbi: ArtifactsJPYCPrepaid.abi,
      contractAddress: JPYC_PREPAID_PROXY_ADDRESS,
      userAddress,
    });
    (useWriteContract as Mock)
      .mockReturnValueOnce({
        // initial states
        data: undefined,
        isPending: false,
        error: writeError,
        writeContract,
        reset: resetWriteStates,
      })
      .mockReturnValueOnce({
        // right after calling `cancelAuthorization`
        data: txHash,
        isPending: true,
        error: writeError,
        writeContract,
        reset: resetWriteStates,
      })
      .mockReturnValueOnce({
        // when tx gets confirmed
        data: txHash,
        isPending: false,
        error: writeError,
        writeContract,
        reset: resetWriteStates,
      });
    (useWaitForTransactionReceipt as Mock)
      .mockReturnValueOnce({
        // initial states
        isLoading: false,
        isSuccess: false,
        error: txError,
      })
      .mockReturnValueOnce({
        // right after calling `cancelAuthorization`
        isLoading: true,
        isSuccess: false,
        error: txError,
      })
      .mockReturnValueOnce({
        // when tx gets confirmed
        isLoading: false,
        isSuccess: true,
        error: txError,
      });
    (simulateContract as Mock).mockResolvedValueOnce({ request: {} });

    const { result, rerender } = renderHook(() => useCancelAuthorization());

    expect(result.current.cancelAuthorization).toBeDefined();
    expect(result.current.isReady).toStrictEqual(true);
    expect(result.current.isLoading).toStrictEqual(false);
    expect(result.current.isSuccess).toStrictEqual(false);
    expect(result.current.error).toBeNull();
    expect(result.current.hash).toStrictEqual(undefined);
    expect(result.current.reset).toBeDefined();

    await act(async () => {
      await result.current.cancelAuthorization!({
        authorizer,
        nonce,
        v,
        r,
        s,
      });
      rerender();
    });

    expect(result.current.cancelAuthorization).toBeDefined();
    expect(result.current.isReady).toStrictEqual(true);
    expect(result.current.isLoading).toStrictEqual(true);
    expect(result.current.isSuccess).toStrictEqual(false);
    expect(result.current.error).toBeNull();
    expect(result.current.hash).toStrictEqual(txHash);
    expect(result.current.reset).toBeDefined();

    expect(simulateContract).toHaveBeenCalledOnce();
    expect(simulateContract).toHaveBeenCalledWith(
      {},
      {
        abi: ArtifactsJPYCPrepaid.abi,
        address: JPYC_PREPAID_PROXY_ADDRESS,
        functionName: 'cancelAuthorization',
        args: [authorizer, nonce, v, r, s],
        account: userAddress,
      },
    );

    expect(writeContract).toHaveBeenCalledOnce();
    expect(writeContract).toHaveBeenCalledWith({});

    rerender();

    expect(result.current.cancelAuthorization).toBeDefined();
    expect(result.current.isReady).toStrictEqual(true);
    expect(result.current.isLoading).toStrictEqual(false);
    expect(result.current.isSuccess).toStrictEqual(true);
    expect(result.current.error).toBeNull();
    expect(result.current.hash).toStrictEqual(txHash);
    expect(result.current.reset).toBeDefined();
  });

  test('tx simulation fails', async () => {
    const writeError = null;
    const writeContract = vi.fn();
    const resetWriteStates = vi.fn();
    const txError = null;

    const authorizer = '0x90F79bf6EB2c4f870365E785982E1f101E93b906';
    const nonce = '0x456';
    const v = Uint8.from('100');
    const r = '0x1234';
    const s = '0x5678';

    (useWagmiConfig as Mock).mockReturnValue({});
    (useConfig as Mock).mockReturnValue({
      contractAbi: ArtifactsJPYCPrepaid.abi,
      contractAddress: JPYC_PREPAID_PROXY_ADDRESS,
      userAddress,
    });
    (useWriteContract as Mock).mockReturnValue({
      data: undefined,
      isPending: false,
      error: writeError,
      writeContract,
      reset: resetWriteStates,
    });
    (useWaitForTransactionReceipt as Mock).mockReturnValue({
      isLoading: false,
      isSuccess: false,
      error: txError,
    });
    (simulateContract as Mock).mockRejectedValue(new Error('tx simulation failed'));

    const { result } = renderHook(() => useCancelAuthorization());

    expect(result.current.cancelAuthorization).toBeDefined();
    expect(result.current.isReady).toStrictEqual(true);
    expect(result.current.isLoading).toStrictEqual(false);
    expect(result.current.isSuccess).toStrictEqual(false);
    expect(result.current.error).toBeNull();
    expect(result.current.hash).toBeUndefined();
    expect(result.current.reset).toBeDefined();

    await act(async () => {
      await result.current.cancelAuthorization!({
        authorizer,
        nonce,
        v,
        r,
        s,
      });
    });

    expect(result.current.cancelAuthorization).toBeDefined();
    expect(result.current.isReady).toStrictEqual(true);
    expect(result.current.isLoading).toStrictEqual(true);
    expect(result.current.isSuccess).toStrictEqual(false);
    expect(result.current.error).not.toBeNull();
    expect(result.current.hash).toBeUndefined();
    expect(result.current.reset).toBeDefined();

    expect(simulateContract).toHaveBeenCalledOnce();
    expect(simulateContract).toHaveBeenCalledWith(
      {},
      {
        abi: ArtifactsJPYCPrepaid.abi,
        address: JPYC_PREPAID_PROXY_ADDRESS,
        functionName: 'cancelAuthorization',
        args: [authorizer, nonce, v, r, s],
        account: userAddress,
      },
    );

    expect(writeContract).not.toHaveBeenCalled();

    act(() => result.current.reset!());

    expect(result.current.cancelAuthorization).toBeDefined();
    expect(result.current.isReady).toStrictEqual(true);
    expect(result.current.isLoading).toStrictEqual(false);
    expect(result.current.isSuccess).toStrictEqual(false);
    expect(result.current.error).toBeNull();
    expect(result.current.hash).toBeUndefined();
    expect(result.current.reset).toBeDefined();
  });

  test('tx fails due to some `writeError`', async () => {
    const txHash = '0x123';
    const writeError = null;
    const writeContract = vi.fn();
    const resetWriteStates = vi.fn();
    const txError = null;

    const authorizer = '0x90F79bf6EB2c4f870365E785982E1f101E93b906';
    const nonce = '0x456';
    const v = Uint8.from('100');
    const r = '0x1234';
    const s = '0x5678';

    (useWagmiConfig as Mock).mockReturnValue({});
    (useConfig as Mock).mockReturnValue({
      contractAbi: ArtifactsJPYCPrepaid.abi,
      contractAddress: JPYC_PREPAID_PROXY_ADDRESS,
      userAddress,
    });
    (useWriteContract as Mock)
      .mockReturnValueOnce({
        // initial states
        data: undefined,
        isPending: false,
        error: writeError,
        writeContract,
        reset: resetWriteStates,
      })
      .mockReturnValueOnce({
        // right after calling `cancelAuthorization`
        data: txHash,
        isPending: true,
        error: writeError,
        writeContract: writeContract.mockImplementation(() => {
          throw new Error('tx failed');
        }),
        reset: resetWriteStates,
      })
      .mockReturnValue({
        // default (initial) states
        data: undefined,
        isPending: false,
        error: writeError,
        writeContract,
        reset: resetWriteStates,
      });
    (useWaitForTransactionReceipt as Mock)
      .mockReturnValueOnce({
        // initial states
        isLoading: false,
        isSuccess: false,
        error: txError,
      })
      .mockReturnValueOnce({
        // right after calling `cancelAuthorization`
        isLoading: true,
        isSuccess: false,
        error: txError,
      })
      .mockReturnValue({
        // default (initial) states
        isLoading: false,
        isSuccess: false,
        error: txError,
      });
    (simulateContract as Mock).mockResolvedValue({ request: {} });

    const { result, rerender } = renderHook(() => useCancelAuthorization());

    expect(result.current.cancelAuthorization).toBeDefined();
    expect(result.current.isReady).toStrictEqual(true);
    expect(result.current.isLoading).toStrictEqual(false);
    expect(result.current.isSuccess).toStrictEqual(false);
    expect(result.current.error).toBeNull();
    expect(result.current.hash).toBeUndefined();
    expect(result.current.reset).toBeDefined();

    await act(async () => {
      await result.current.cancelAuthorization!({
        authorizer,
        nonce,
        v,
        r,
        s,
      });
      rerender();
    });

    expect(result.current.cancelAuthorization).toBeDefined();
    expect(result.current.isReady).toStrictEqual(true);
    expect(result.current.isLoading).toStrictEqual(true);
    expect(result.current.isSuccess).toStrictEqual(false);
    expect(result.current.error).not.toBeNull();
    expect(result.current.hash).toStrictEqual(txHash);
    expect(result.current.reset).toBeDefined();

    expect(simulateContract).toHaveBeenCalledOnce();
    expect(simulateContract).toHaveBeenCalledWith(
      {},
      {
        abi: ArtifactsJPYCPrepaid.abi,
        address: JPYC_PREPAID_PROXY_ADDRESS,
        functionName: 'cancelAuthorization',
        args: [authorizer, nonce, v, r, s],
        account: userAddress,
      },
    );

    expect(writeContract).toHaveBeenCalledOnce();
    expect(writeContract).toHaveBeenCalledWith({});

    act(() => {
      result.current.reset!();
      rerender();
    });

    expect(result.current.cancelAuthorization).toBeDefined();
    expect(result.current.isReady).toStrictEqual(true);
    expect(result.current.isLoading).toStrictEqual(false);
    expect(result.current.isSuccess).toStrictEqual(false);
    expect(result.current.error).toBeNull();
    expect(result.current.hash).toBeUndefined();
    expect(result.current.reset).toBeDefined();
  });

  test('tx fails due to some `txError`', async () => {
    const txHash = '0x123';
    const writeError = null;
    const writeContract = vi.fn();
    const resetWriteStates = vi.fn();

    const authorizer = '0x90F79bf6EB2c4f870365E785982E1f101E93b906';
    const nonce = '0x456';
    const v = Uint8.from('100');
    const r = '0x1234';
    const s = '0x5678';

    (useWagmiConfig as Mock).mockReturnValue({});
    (useConfig as Mock).mockReturnValue({
      contractAbi: ArtifactsJPYCPrepaid.abi,
      contractAddress: JPYC_PREPAID_PROXY_ADDRESS,
      userAddress,
    });
    (useWriteContract as Mock)
      .mockReturnValueOnce({
        // initial states
        data: undefined,
        isPending: false,
        error: writeError,
        writeContract,
        reset: resetWriteStates,
      })
      .mockReturnValueOnce({
        // right after calling `cancelAuthorization`
        data: txHash,
        isPending: true,
        error: writeError,
        writeContract,
        reset: resetWriteStates,
      })
      .mockReturnValueOnce({
        // after `writeContract` succeeds
        data: txHash,
        isPending: false,
        error: writeError,
        writeContract,
        reset: resetWriteStates,
      })
      .mockReturnValue({
        // default (initial) states
        data: undefined,
        isPending: false,
        error: writeError,
        writeContract,
        reset: resetWriteStates,
      });
    (useWaitForTransactionReceipt as Mock)
      .mockReturnValueOnce({
        // initial states
        isLoading: false,
        isSuccess: false,
        error: null,
      })
      .mockReturnValueOnce({
        // right after calling `cancelAuthorization`
        isLoading: true,
        isSuccess: false,
        error: null,
      })
      .mockReturnValueOnce({
        // after `writeContract` succeeds
        isLoading: true,
        isSuccess: false,
        error: new Error('failed to confirm tx'),
      })
      .mockReturnValue({
        // default (initial) states
        isLoading: false,
        isSuccess: false,
        error: null,
      });
    (simulateContract as Mock).mockResolvedValue({ request: {} });

    const { result, rerender } = renderHook(() => useCancelAuthorization());

    expect(result.current.cancelAuthorization).toBeDefined();
    expect(result.current.isReady).toStrictEqual(true);
    expect(result.current.isLoading).toStrictEqual(false);
    expect(result.current.isSuccess).toStrictEqual(false);
    expect(result.current.error).toBeNull();
    expect(result.current.hash).toBeUndefined();
    expect(result.current.reset).toBeDefined();

    await act(async () => {
      await result.current.cancelAuthorization!({
        authorizer,
        nonce,
        v,
        r,
        s,
      });
      rerender();
    });

    expect(result.current.cancelAuthorization).toBeDefined();
    expect(result.current.isReady).toStrictEqual(true);
    expect(result.current.isLoading).toStrictEqual(true);
    expect(result.current.isSuccess).toStrictEqual(false);
    expect(result.current.error).toBeNull();
    expect(result.current.hash).toStrictEqual(txHash);
    expect(result.current.reset).toBeDefined();

    expect(simulateContract).toHaveBeenCalledOnce();
    expect(simulateContract).toHaveBeenCalledWith(
      {},
      {
        abi: ArtifactsJPYCPrepaid.abi,
        address: JPYC_PREPAID_PROXY_ADDRESS,
        functionName: 'cancelAuthorization',
        args: [authorizer, nonce, v, r, s],
        account: userAddress,
      },
    );

    expect(writeContract).toHaveBeenCalledOnce();
    expect(writeContract).toHaveBeenCalledWith({});

    rerender();

    expect(result.current.cancelAuthorization).toBeDefined();
    expect(result.current.isReady).toStrictEqual(true);
    expect(result.current.isLoading).toStrictEqual(true);
    expect(result.current.isSuccess).toStrictEqual(false);
    expect(result.current.error).not.toBeNull();
    expect(result.current.hash).toStrictEqual(txHash);
    expect(result.current.reset).toBeDefined();

    act(() => {
      result.current.reset!();
      rerender();
    });

    expect(result.current.cancelAuthorization).toBeDefined();
    expect(result.current.isReady).toStrictEqual(true);
    expect(result.current.isLoading).toStrictEqual(false);
    expect(result.current.isSuccess).toStrictEqual(false);
    expect(result.current.error).toBeNull();
    expect(result.current.hash).toBeUndefined();
    expect(result.current.reset).toBeDefined();
  });

  test('hook not ready: `contractAbi` undefined', async () => {
    const writeContract = vi.fn();
    const resetWriteStates = vi.fn();

    (useWagmiConfig as Mock).mockReturnValue({});
    (useConfig as Mock).mockReturnValue({
      contractAbi: undefined,
      contractAddress: JPYC_PREPAID_PROXY_ADDRESS,
      userAddress,
    });
    (useWriteContract as Mock).mockReturnValue({
      data: undefined,
      isPending: false,
      error: null,
      writeContract,
      reset: resetWriteStates,
    });
    (useWaitForTransactionReceipt as Mock).mockReturnValue({
      isLoading: false,
      isSuccess: false,
      error: null,
    });

    const { result } = renderHook(() => useCancelAuthorization());

    // `writeContract` function should be undefined
    expect(result.current.cancelAuthorization).toBeUndefined();
    expect(result.current.isReady).toStrictEqual(false);
    expect(result.current.isLoading).toStrictEqual(false);
    expect(result.current.isSuccess).toStrictEqual(false);
    // `writeContract` function should not be callable, thus error should not be thrown
    expect(result.current.error).toBeNull();
    expect(result.current.hash).toBeUndefined();
    expect(result.current.reset).toBeDefined();
  });

  test('hook not ready: `contractAddress` undefined', async () => {
    const writeContract = vi.fn();
    const resetWriteStates = vi.fn();

    (useWagmiConfig as Mock).mockReturnValue({});
    (useConfig as Mock).mockReturnValue({
      contractAbi: ArtifactsJPYCPrepaid.abi,
      contractAddress: undefined,
      userAddress,
    });
    (useWriteContract as Mock).mockReturnValue({
      data: undefined,
      isPending: false,
      error: null,
      writeContract,
      reset: resetWriteStates,
    });
    (useWaitForTransactionReceipt as Mock).mockReturnValue({
      isLoading: false,
      isSuccess: false,
      error: null,
    });

    const { result } = renderHook(() => useCancelAuthorization());

    // `writeContract` function should be undefined
    expect(result.current.cancelAuthorization).toBeUndefined();
    expect(result.current.isReady).toStrictEqual(false);
    expect(result.current.isLoading).toStrictEqual(false);
    expect(result.current.isSuccess).toStrictEqual(false);
    // `writeContract` function should not be callable, thus error should not be thrown
    expect(result.current.error).toBeNull();
    expect(result.current.hash).toBeUndefined();
    expect(result.current.reset).toBeDefined();
  });

  test('hook not ready: `userAddress` undefined', async () => {
    const writeContract = vi.fn();
    const resetWriteStates = vi.fn();

    (useWagmiConfig as Mock).mockReturnValue({});
    (useConfig as Mock).mockReturnValue({
      contractAbi: ArtifactsJPYCPrepaid.abi,
      contractAddress: JPYC_PREPAID_PROXY_ADDRESS,
      userAddress: undefined,
    });
    (useWriteContract as Mock).mockReturnValue({
      data: undefined,
      isPending: false,
      error: null,
      writeContract,
      reset: resetWriteStates,
    });
    (useWaitForTransactionReceipt as Mock).mockReturnValue({
      isLoading: false,
      isSuccess: false,
      error: null,
    });

    const { result } = renderHook(() => useCancelAuthorization());

    // `writeContract` function should be undefined
    expect(result.current.cancelAuthorization).toBeUndefined();
    expect(result.current.isReady).toStrictEqual(false);
    expect(result.current.isLoading).toStrictEqual(false);
    expect(result.current.isSuccess).toStrictEqual(false);
    // `writeContract` function should not be callable, thus error should not be thrown
    expect(result.current.error).toBeNull();
    expect(result.current.hash).toBeUndefined();
    expect(result.current.reset).toBeDefined();
  });
});
