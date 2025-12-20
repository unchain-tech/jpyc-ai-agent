/**
 * Next.jsアプリケーション用のシンプルなJPYCヘルパー
 *
 * このファイルはUI表示用の軽量な情報取得のみを提供します。
 * - チェーン情報の取得
 * - アカウントアドレスの取得
 *
 * 注: JPYC操作（残高照会、送金など）はMCPサーバー側で実装されています。
 */

import type { Hex } from "viem";
import { privateKeyToAccount } from "viem/accounts";

// サポートするチェーン
export type SupportedChain = "sepolia" | "amoy" | "fuji";

const CHAIN_NAMES: Record<SupportedChain, string> = {
	sepolia: "Ethereum Sepolia",
	amoy: "Polygon Amoy",
	fuji: "Avalanche Fuji",
};

// 現在選択されているチェーン（デフォルトはSepolia）
// 注: MCPサーバー側でチェーン切り替えが行われた場合、この値は同期されません
let _currentChain: SupportedChain = "sepolia";
let _account: ReturnType<typeof privateKeyToAccount> | null = null;

/**
 * 現在のチェーンを取得する関数
 * @returns
 */
export function getCurrentChain(): SupportedChain {
	return _currentChain;
}

/**
 * チェーンの表示名を取得する関数
 * @param chain
 * @returns
 */
export function getChainName(chain?: SupportedChain): string {
	const targetChain = chain || _currentChain;
	return CHAIN_NAMES[targetChain] || "Ethereum Sepolia";
}

/**
 * 現在のアカウントアドレスを取得する関数
 * @returns
 */
export function getCurrentAddress(): Hex {
	if (!process.env.PRIVATE_KEY) {
		throw new Error("PRIVATE_KEY environment variable is required");
	}
	if (!_account) {
		_account = privateKeyToAccount(process.env.PRIVATE_KEY as Hex);
	}
	return _account.address;
}
