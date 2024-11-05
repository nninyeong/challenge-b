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

  // 터치 위치에서 스티커 위치 오프셋을 빼고 프리뷰 기준 상대 위치를 계산
  const relativeX = ((touch.clientX - previewBounds.left - touchOffset.current.x) / previewBounds.width) * 100;
  const relativeY = ((touch.clientY - previewBounds.top - touchOffset.current.y) / previewBounds.height) * 100;

  return { relativeX, relativeY };
};
