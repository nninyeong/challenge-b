import { MutableRefObject } from 'react';

export const clampValue = (value: number, min: number, max: number): number => {
  return Math.max(min, Math.min(value, max));
};

export const calculateRelativePosition = (
  touch: React.Touch,
  touchOffset: MutableRefObject<{ x: number; y: number }>,
  previewRef: MutableRefObject<HTMLDivElement | null>,
  stickerRef: MutableRefObject<HTMLDivElement | null>,
) => {
  if (!previewRef.current || !stickerRef.current) return { relativeX: 0, relativeY: 0 };

  const previewBounds = previewRef.current.getBoundingClientRect();
  const stickerBounds = stickerRef.current.getBoundingClientRect();

  let relativeX = ((touch.clientX - previewBounds.left - touchOffset.current.x) / previewBounds.width) * 100;
  let relativeY = ((touch.clientY - previewBounds.top - touchOffset.current.y) / previewBounds.height) * 100;

  relativeX = clampValue(relativeX, 0, 100 - (stickerBounds.width / previewBounds.width) * 100);
  relativeY = clampValue(relativeY, 0, 100 - (stickerBounds.height / previewBounds.height) * 100);

  return { relativeX, relativeY };
};
