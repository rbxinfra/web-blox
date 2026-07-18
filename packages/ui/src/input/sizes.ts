// Slider/switch size constants shared across input components

export const THUMB_SIZE_MEDIUM  = 20;
export const THUMB_SIZE_SMALL   = 16;
export const TRACK_HEIGHT       = 44;
export const PROGRESS_SIZE_MEDIUM = 24;
export const PROGRESS_SIZE_SMALL  = 18;

export function getThumbSize(size?: string): number {
  return size === 'small' ? THUMB_SIZE_SMALL : THUMB_SIZE_MEDIUM;
}

export function getProgressSize(size?: string): number {
  return size === 'small' ? PROGRESS_SIZE_SMALL : PROGRESS_SIZE_MEDIUM;
}

export function getProgressThickness(size?: string): number {
  const progress = getProgressSize(size);
  const thumb    = getThumbSize(size);
  return ((progress - thumb) * TRACK_HEIGHT) / (2 * progress);
}