import { StickerType } from '@/types/invitationFormType.type';
import { FieldValues, UseFormSetValue } from 'react-hook-form';
import { useRef } from 'react';
import { calculateAngle } from '@/utils/calculate/calculateAngle';
import { calculateDistance } from '@/utils/calculate/calculateDistance';

type UseStickerRotationProps = {
  sticker: StickerType;
  stickerRef: React.MutableRefObject<HTMLDivElement | null>;
  stickersWatch: StickerType[];
  setValue: UseFormSetValue<FieldValues>;
  isActive: boolean;
};

const useStickerTransform = ({ sticker, stickerRef, stickersWatch, setValue, isActive }: UseStickerRotationProps) => {
  const pivotRef = useRef({ x: 0, y: 0 });
  const startDegRef = useRef<number>(0); // 회전 기준 각도
  const previousRotationRef = useRef<number>(sticker.rotation || 0); // 이전 회전값
  const startDistanceRef = useRef<number>(0); // 초기 거리
  const startScaleRef = useRef<number>(1); // 초기 스케일 값

  const handleTouchTransformStart = (e: React.TouchEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!isActive || !stickerRef.current) return;

    const stickerBound = stickerRef.current.getBoundingClientRect();
    const pivotX = stickerBound.left - window.scrollX + stickerBound.width / 2;
    const pivotY = stickerBound.top - window.scrollY + stickerBound.height / 2;
    pivotRef.current = { x: pivotX, y: pivotY };

    const touch = e.touches[0];
    startDegRef.current = calculateAngle(pivotRef.current, {
      x: touch.pageX,
      y: touch.pageY,
    });
    previousRotationRef.current = sticker.rotation || 0;
    startDistanceRef.current = calculateDistance(pivotRef.current, { x: touch.pageX, y: touch.pageY });
    startScaleRef.current = parseFloat(stickerRef.current.style.transform.match(/scale\(([^)]+)\)/)?.[1] || '1');

    document.addEventListener('touchmove', handleTouchTransformMove);
    document.addEventListener('touchend', handleTouchTransformEnd);
  };

  const handleMouseTransformStart = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!isActive || !stickerRef.current) return;

    const stickerBound = stickerRef.current.getBoundingClientRect();
    const pivotX = stickerBound.left + stickerBound.width / 2;
    const pivotY = stickerBound.top + stickerBound.height / 2;
    pivotRef.current = { x: pivotX, y: pivotY };

    startDegRef.current = calculateAngle(pivotRef.current, { x: e.pageX, y: e.pageY });
    previousRotationRef.current = sticker.rotation || 0;
    startDistanceRef.current = calculateDistance(pivotRef.current, { x: e.pageX, y: e.pageY });
    startScaleRef.current = sticker.scale || 1;

    document.addEventListener('mousemove', handleMouseTransformMove);
    document.addEventListener('mouseup', handleMouseTransformEnd);
  };

  const handleTouchTransformMove = (e: TouchEvent) => {
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
    const updatedScale = startScaleRef.current * scaleFactor;

    const updatedSticker = stickersWatch.map((stickerItem: StickerType) => {
      if (stickerItem.id === sticker.id) {
        return {
          ...sticker,
          rotation: updatedRotation,
          scale: updatedScale,
        };
      } else {
        return stickerItem;
      }
    });

    setValue('stickers', [...updatedSticker]);
  };

  const handleMouseTransformMove = (e: MouseEvent) => {
    e.stopPropagation();
    if (!isActive || !stickerRef.current) return;

    const currentAngle = calculateAngle(pivotRef.current, {
      x: e.pageX,
      y: e.pageY,
    });
    const currentDistance = calculateDistance(pivotRef.current, { x: e.pageX, y: e.pageY });

    // 회전 계산
    let delta = currentAngle - startDegRef.current;
    if (delta < 0) delta += 360;
    const updatedRotation = previousRotationRef.current + delta;

    // 스케일 조정 계산
    const scaleFactor = currentDistance / startDistanceRef.current;
    const updatedScale = startScaleRef.current * scaleFactor;

    const updatedSticker = stickersWatch.map((stickerItem: StickerType) => {
      if (stickerItem.id === sticker.id) {
        return {
          ...sticker,
          rotation: updatedRotation,
          scale: updatedScale,
        };
      } else {
        return stickerItem;
      }
    });

    setValue('stickers', [...updatedSticker]);
  };

  const handleTouchTransformEnd = (e: TouchEvent) => {
    e.stopPropagation();

    document.removeEventListener('touchmove', handleTouchTransformMove);
    document.removeEventListener('touchend', handleTouchTransformEnd);
  };

  const handleMouseTransformEnd = (e: MouseEvent) => {
    e.stopPropagation();

    document.removeEventListener('mousemove', handleMouseTransformMove);
    document.removeEventListener('mouseup', handleMouseTransformEnd);
  };

  return { handleTouchTransformStart, handleMouseTransformStart };
};

export default useStickerTransform;
