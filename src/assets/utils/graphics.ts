import { Color, type IUniform } from 'three';

/**
 * Converts a list of colors into a THREE.JS compatible Color array.
 * @param colors The list of colors in the gradient in hexadecimal format.
 * @returns The constructed colors.
 */
export const convertColors = (colors: string[]) => {
    return colors.map(c => new Color(c))
}

/**
 * Represents a collection of shader uniforms.
 */
export type ShaderUniforms = {[uniform: string]: IUniform<any>}