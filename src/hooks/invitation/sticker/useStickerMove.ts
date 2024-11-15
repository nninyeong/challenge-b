import { FieldValues, UseFormSetValue } from 'react-hook-form';
import { StickerType } from '@/types/invitationFormType.type';
import { useRef } from 'react';
import { calculateRelativePosition } from '@/utils/calculate/calculateRelativePosition';

type UseStickerMovementProps = {
  sticker: StickerType;
  previewRef: React.MutableRefObject<HTMLDivElement | null>;
  stickerRef: React.MutableRefObject<HTMLDivElement | null>;
  stickersWatch: StickerType[];
  setValue: UseFormSetValue<FieldValues>;
  onActivate: (id: string | null) => void;
};
const useStickerMove = ({
  sticker,
  previewRef,
  stickerRef,
  stickersWatch,
  setValue,
  onActivate,
}: UseStickerMovementProps) => {
  const offset = useRef({ x: 0, y: 0 });
  const isDragging = useRef(false);

  const handleTouchStart = (e: React.TouchEvent<HTMLImageElement>) => {
    if (!previewRef.current) return;
    isDragging.current = false;

    const touch = e.touches[0];
    const stickerBounds = e.currentTarget.getBoundingClientRect();

    // 스티커의 중심 좌표 계산
    const centerX = stickerBounds.left + stickerBounds.width / 2;
    const centerY = stickerBounds.top + stickerBounds.height / 2;

    // 터치한 위치와 중심점 사이의 offset 계산
    offset.current = {
      x: touch.clientX - centerX,
      y: touch.clientY - centerY,
    };

    onActivate(null);

    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!previewRef.current || !stickerRef.current) return;
    isDragging.current = true;

    const touch = e.touches[0];
    const { relativeX, relativeY } = calculateRelativePosition(touch, offset, previewRef, stickerRef);

    requestAnimationFrame(() => {
      stickerRef.current!.style.left = `${relativeX}%`;
      stickerRef.current!.style.top = `${relativeY}%`;
    });
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (!previewRef.current || !stickerRef.current) return;

    if (!isDragging.current) {
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
      onActivate(sticker.id);
      return;
    }

    isDragging.current = false;
    const touch = e.changedTouches[0];
    const { relativeX, relativeY } = calculateRelativePosition(touch, offset, previewRef, stickerRef);

    const updatedSticker = stickersWatch.map((stickerItem: StickerType) => {
      if (stickerItem.id === sticker.id) return { ...sticker, posX: relativeX, posY: relativeY };
      else return stickerItem;
    });

    setValue('stickers', [...updatedSticker]);
    onActivate(sticker.id);

    document.removeEventListener('touchmove', handleTouchMove);
    document.removeEventListener('touchend', handleTouchEnd);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    isDragging.current = false;
    if (!stickerRef.current || !previewRef.current) return;

    const stickerBounds = e.currentTarget.getBoundingClientRect();
    const centerX = stickerBounds.left + stickerBounds.width / 2;
    const centerY = stickerBounds.top + stickerBounds.height / 2;

    offset.current = {
      x: e.clientX - centerX,
      y: e.clientY - centerY,
    };

    onActivate(null);

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!stickerRef.current || !previewRef.current) return;
    isDragging.current = true;

    const { relativeX, relativeY } = calculateRelativePosition(e, offset, previewRef, stickerRef);
    requestAnimationFrame(() => {
      stickerRef.current!.style.left = `${relativeX}%`;
      stickerRef.current!.style.top = `${relativeY}%`;
    });
  };

  const handleMouseUp = (e: MouseEvent) => {
    isDragging.current = false;
    if (!previewRef.current || !stickerRef.current) return;

    const { relativeX, relativeY } = calculateRelativePosition(e, offset, previewRef, stickerRef);
    const updatedSticker = stickersWatch.map((stickerItem: StickerType) => {
      if (stickerItem.id === sticker.id) return { ...sticker, posX: relativeX, posY: relativeY };
      else return stickerItem;
    });

    setValue('stickers', [...updatedSticker]);
    onActivate(sticker.id);

    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  return {
    handleTouchStart,
    handleMouseDown,
  };
};

export default useStickerMove;
