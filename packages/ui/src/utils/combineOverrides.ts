/**
 * Merges a MUI `classes` object with an extra `className` string.
 * Appends `className` to `classes.root`, creating the root key if it
 * doesn't exist yet.
 *
 * Used by wrapper components to support both the MUI `classes` prop
 * and a plain `className` prop simultaneously.
 */
export default function combineOverrides(
  classes?: Record<string, string>,
  className?: string,
): Record<string, string> {
  const merged = classes || {};
  if (className) {
    merged.root = merged.root ? ''.concat(merged.root, ' ').concat(className) : className;
  }
  return merged;
}