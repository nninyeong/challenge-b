import { FieldValue, FieldValues, UseFormSetValue } from 'react-hook-form';
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
  const touchOffset = useRef({ x: 0, y: 0 });

  const handleTouchStart = (e: React.TouchEvent<HTMLImageElement>) => {
    if (!previewRef.current) return;

    const touch = e.touches[0];
    const currentSticker = e.currentTarget.getBoundingClientRect();

    touchOffset.current = {
      x: touch.clientX - currentSticker.left,
      y: touch.clientY - currentSticker.top,
    };

    onActivate(null);

    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);
  };

  const handleTouchMove = (e: TouchEvent) => {
    e.preventDefault();
    if (!previewRef.current || !stickerRef.current) return;

    const touch = e.touches[0];
    const { relativeX, relativeY } = calculateRelativePosition(touch, touchOffset, previewRef, stickerRef);

    requestAnimationFrame(() => {
      stickerRef.current!.style.left = `${relativeX}%`;
      stickerRef.current!.style.top = `${relativeY}%`;
    });
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (!previewRef.current || !stickerRef.current) return;

    const touch = e.changedTouches[0];
    const { relativeX, relativeY } = calculateRelativePosition(touch, touchOffset, previewRef, stickerRef);

    const updatedSticker = stickersWatch.map((stickerItem: StickerType) => {
      if (stickerItem.id === sticker.id) return { ...sticker, posX: relativeX, posY: relativeY };
      else return stickerItem;
    });

    setValue('stickers', [...updatedSticker]);
    onActivate(sticker.id);

    document.removeEventListener('touchmove', handleTouchMove);
    document.removeEventListener('touchend', handleTouchEnd);
  };

  return {
    handleTouchStart,
  };
};

export default useStickerMove;
