/* eslint-disable @typescript-eslint/no-explicit-any */

import type { TTypographyProperties, TBodyStyles } from "./types/typographyTypes";

export function camelCaseToKebabCase(str: string): string {
  return str
    .split('')
    .map((char, index) =>
      char.toUpperCase() === char
        ? `${index !== 0 ? '-' : ''}${char.toLowerCase()}`
        : char,
    )
    .join('');
}

export function parseFontFaces(fontFaces: TTypographyProperties[]): string {
  return fontFaces.reduce((acc, face) => {
    return `${acc}@font-face {\n    ${Object.keys(face)
      .map((key) => `${camelCaseToKebabCase(key)}: ${face[key]};`)
      .join('\n')}\n}\n`;
  }, '');
}

export function bodyOverride(styles: TBodyStyles): string {
  return `body {\n  ${Object.keys(styles)
    .map((key) => `${camelCaseToKebabCase(key)}: ${styles[key]};`)
    .join('\n')}\n}\n`;
}

export function joinStringOverrides(...parts: string[]): string {
  return parts.reduce((acc, part) => `${acc}${part}`, '');
}