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
  const startDegRef = useRef<number>(0); // 기준각도
  const previousRotationRef = useRef<number>(sticker.rotation || 0); // 이전 회전값

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

    startDegRef.current = currentAngle; // 회전 시작 기준각도
    previousRotationRef.current = sticker.rotation || 0; // 이전 회전값 저장

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

    let delta = currentAngle - startDegRef.current;
    if (delta < 0) delta += 360;

    // 이전 회전값에 delta를 추가하여 최종 회전값 계산
    const updatedRotation = previousRotationRef.current + delta;

    requestAnimationFrame(() => {
      if (!stickerRef.current) return;
      stickerRef.current.style.transform = `rotate(${updatedRotation}deg)`;
    });
  };

  const handleTouchRotationEnd = (e: TouchEvent) => {
    e.stopPropagation();
    if (!isActive || !stickerRef.current) return;

    const rotation = calculateComponentRotation(stickerRef); // 최종 회전값 계산
    const updatedSticker = stickersWatch.map((stickerItem: StickerType) => {
      if (stickerItem.id === sticker.id) {
        return { ...sticker, rotation };
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
