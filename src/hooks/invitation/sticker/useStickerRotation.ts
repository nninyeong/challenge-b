import { StickerType } from '@/types/invitationFormType.type';
import { FieldValues, UseFormSetValue } from 'react-hook-form';
import { useRef } from 'react';
import { calculateAngle } from '@/utils/calculate/calculateAngle';
import { calculateComponentRotation } from '@/utils/calculate/calculateComponentRotation';

type UseStickerRotationProps = {
  sticker: StickerType;
  stickerRef: React.MutableRefObject<HTMLDivElement | null>;
  stickersWatch: StickerType[];
  setValue: UseFormSetValue<FieldValues>;
  isActive: boolean;
};

const useStickerRotation = ({ sticker, stickerRef, stickersWatch, setValue, isActive }: UseStickerRotationProps) => {
  const pivotRef = useRef({ x: 0, y: 0 });
  const startDegRef = useRef<number>(0); // 회전 기준 각도
  const previousRotationRef = useRef<number>(sticker.rotation || 0); // 이전 회전값
  const startDistanceRef = useRef<number>(0); // 초기 거리
  const initialScaleRef = useRef<number>(1); // 초기 스케일 값

  const handleTouchRotationStart = (e: React.TouchEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!isActive || !stickerRef.current) return;

    const stickerBound = stickerRef.current.getBoundingClientRect();
    const pivotX = stickerBound.left - window.scrollX + stickerBound.width / 2;
    const pivotY = stickerBound.top - window.scrollY + stickerBound.height / 2;
    pivotRef.current = { x: pivotX, y: pivotY };

    const touch = e.touches[0];
    const currentAngle = calculateAngle(pivotRef.current, {
      x: touch.pageX,
      y: touch.pageY,
    });

    startDegRef.current = currentAngle;
    previousRotationRef.current = sticker.rotation || 0;
    startDistanceRef.current = calculateDistance(pivotRef.current, { x: touch.pageX, y: touch.pageY });
    initialScaleRef.current = parseFloat(stickerRef.current.style.transform.match(/scale\(([^)]+)\)/)?.[1] || '1');

    document.addEventListener('touchmove', handleTouchRotationMove);
    document.addEventListener('touchend', handleTouchRotationEnd);
  };

  const handleTouchRotationMove = (e: TouchEvent) => {
    e.stopPropagation();
    if (!isActive || !stickerRef.current) return;

    const touch = e.touches[0];
    const currentAngle = calculateAngle(pivotRef.current, {
      x: touch.pageX,
      y: touch.pageY,
    });
    const currentDistance = calculateDistance(pivotRef.current, { x: touch.pageX, y: touch.pageY });

    // 회전 계산
    let delta = currentAngle - startDegRef.current;
    if (delta < 0) delta += 360;
    const updatedRotation = previousRotationRef.current + delta;

    // 스케일 조정 계산
    const scaleFactor = currentDistance / startDistanceRef.current;
    const updatedScale = initialScaleRef.current * scaleFactor;

    requestAnimationFrame(() => {
      if (!stickerRef.current) return;
      stickerRef.current.style.transform = `rotate(${updatedRotation}deg) scale(${updatedScale})`;
    });
  };

  const handleTouchRotationEnd = (e: TouchEvent) => {
    e.stopPropagation();
    if (!isActive || !stickerRef.current) return;

    const rotation = calculateComponentRotation(stickerRef); // 최종 회전값 계산
    const updatedSticker = stickersWatch.map((stickerItem: StickerType) => {
      if (stickerItem.id === sticker.id) {
        return {
          ...sticker,
          rotation,
          scale: parseFloat(stickerRef.current?.style.transform.match(/scale\(([^)]+)\)/)?.[1] || '1'),
        };
      } else {
        return stickerItem;
      }
    });

    setValue('stickers', [...updatedSticker]);
    document.removeEventListener('touchmove', handleTouchRotationMove);
    document.removeEventListener('touchend', handleTouchRotationEnd);
  };

  return { handleTouchRotationStart };
};

export default useStickerRotation;

// 거리 계산 함수
function calculateDistance(point1: { x: number; y: number }, point2: { x: number; y: number }): number {
  const dx = point2.x - point1.x;
  const dy = point2.y - point1.y;
  return Math.sqrt(dx * dx + dy * dy);
}
