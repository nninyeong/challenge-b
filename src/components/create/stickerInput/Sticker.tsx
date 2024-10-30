'use client';

import { StickerType } from '@/types/invitationFormType.type';
import Image from 'next/image';
import { MutableRefObject, useRef } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { clampValue } from '@/utils/clampValue';

const preventTouchScroll = (e: TouchEvent) => {
  e.preventDefault();
};

const Sticker = ({
  sticker,
  previewRef,
}: {
  sticker: StickerType;
  previewRef: MutableRefObject<HTMLDivElement | null>;
}) => {
  const { setValue, control } = useFormContext();
  const stickersWatch = useWatch({
    control,
    name: 'stickers',
  });

  const stickerRef = useRef<HTMLImageElement | null>(null);
  const touchOffset = useRef({ x: 0, y: 0 });

  const handleTouchStart = (e: React.TouchEvent<HTMLImageElement>) => {
    document.addEventListener('touchmove', preventTouchScroll, { passive: false });
    if (!previewRef.current) return;

    const touch = e.touches[0];
    const currentSticker = e.currentTarget.getBoundingClientRect();

    touchOffset.current = {
      x: touch.clientX - currentSticker.left,
      y: touch.clientY - currentSticker.top,
    };
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLImageElement>) => {
    document.removeEventListener('touchmove', preventTouchScroll);
    if (!previewRef.current || !stickerRef.current) return;

    const touch = e.changedTouches[0];
    const relativeX = clampValue(
      ((touch.clientX - previewRef.current.getBoundingClientRect().left - touchOffset.current.x) /
        previewRef.current.clientWidth) *
        100,
      0,
      previewRef.current.clientWidth - stickerRef.current.offsetWidth,
    );

    const relativeY = clampValue(
      ((touch.clientY - previewRef.current.getBoundingClientRect().top - touchOffset.current.y) /
        previewRef.current.clientHeight) *
        100,
      0,
      previewRef.current.clientHeight - stickerRef.current.offsetHeight,
    );

    const updatedSticker = stickersWatch.map((stickerItem: StickerType) => {
      if (stickerItem.id === sticker.id) {
        return { ...sticker, posX: relativeX, posY: relativeY };
      } else {
        return stickerItem;
      }
    });

    setValue('stickers', [...updatedSticker]);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLImageElement>) => {
    if (!previewRef.current || !stickerRef.current) return;

    const touch = e.touches[0];
    const relativeX = clampValue(
      ((touch.clientX - previewRef.current.getBoundingClientRect().left - touchOffset.current.x) /
        previewRef.current.clientWidth) *
        100,
      0,
      previewRef.current.clientWidth - stickerRef.current.offsetWidth,
    );

    const relativeY = clampValue(
      ((touch.clientY - previewRef.current.getBoundingClientRect().top - touchOffset.current.y) /
        previewRef.current.clientHeight) *
        100,
      0,
      previewRef.current.clientHeight - stickerRef.current.offsetHeight,
    );

    requestAnimationFrame(() => {
      if (!stickerRef.current) return;
      stickerRef.current.style.left = `${relativeX}%`;
      stickerRef.current.style.top = `${relativeY}%`;
    });
  };

  return (
    <Image
      src={sticker.url}
      alt={sticker.stickerImageId}
      width={100}
      height={100}
      ref={stickerRef}
      style={{
        position: 'absolute',
        top: `${sticker.posY}%`,
        left: `${sticker.posX}%`,
      }}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
    />
  );
};

export default Sticker;
