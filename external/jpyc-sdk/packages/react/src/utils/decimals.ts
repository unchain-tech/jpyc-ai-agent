import { formatUnits, parseUnits } from 'viem';

const TOKEN_DECIMALS = 18;

/**
 * Converts the unscaled (off-chain) value to scaled (on-chain) value.
 *
 * @param value Value to be scaled up
 * @returns Value being scaled up
 */
export function scaleUp({ value }: { value: string }): bigint {
  return parseUnits(value, TOKEN_DECIMALS);
}

/**
 * Converts the scaled (on-chain) value to unscaled (off-chain) value.
 *
 * @param value Value to be scaled down
 * @returns Value being scaled down
 */
export function scaleDown({ value }: { value: bigint }): string {
  return formatUnits(value, TOKEN_DECIMALS);
}
