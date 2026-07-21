/**
 * Clamps a given number to the range [min, max].
 * @param x The number to clamp.
 * @param min The minimum value.
 * @param max The maximum value.
 * @returns The clamped value.
 */
export const clamp = (x: number, min: number, max: number) => Math.min(Math.max(x, min), max);