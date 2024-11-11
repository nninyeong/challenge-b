import { MutableRefObject } from 'react';

export const calculateRelativePosition = (
  event: React.Touch | MouseEvent,
  offset: MutableRefObject<{ x: number; y: number }>,
  previewRef: MutableRefObject<HTMLDivElement | null>,
  stickerRef: MutableRefObject<HTMLDivElement | null>,
) => {
  if (!previewRef.current || !stickerRef.current) return { relativeX: 0, relativeY: 0 };

  const previewBounds = previewRef.current.getBoundingClientRect();

  const relativeX = ((event.clientX - previewBounds.left - offset.current.x) / previewBounds.width) * 100;
  const relativeY = ((event.clientY - previewBounds.top - offset.current.y) / previewBounds.height) * 100;

  return { relativeX, relativeY };
};
