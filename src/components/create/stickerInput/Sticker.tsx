'use client';

import { StickerType } from '@/types/invitationFormType.type';
import { MutableRefObject, useEffect, useRef } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import useStickerMove from '@/hooks/invitation/sticker/useStickerMove';
import useStickerTransform from '@/hooks/invitation/sticker/useStickerTransform';

const Sticker = ({
  sticker,
  previewRef,
  activeStickerId,
  onActivate,
}: {
  sticker: StickerType;
  previewRef: MutableRefObject<HTMLDivElement | null>;
  activeStickerId: string | null;
  onActivate: (id: string | null) => void;
}) => {
  const { setValue, control } = useFormContext();
  const stickersWatch = useWatch({
    control,
    name: 'stickers',
  }) as StickerType[];
  const stickerRef = useRef<HTMLDivElement | null>(null);
  const isActive = activeStickerId === sticker.id;
  const { handleTouchStart, handleMouseDown } = useStickerMove({
    sticker,
    previewRef,
    stickerRef,
    stickersWatch,
    setValue,
    onActivate,
  });

  const { handleTouchTransformStart, handleMouseTransformStart } = useStickerTransform({
    sticker,
    stickerRef,
    stickersWatch,
    setValue,
    isActive,
  });

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (activeStickerId === sticker.id && stickerRef.current && !stickerRef.current.contains(e.target as Node)) {
        onActivate(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [activeStickerId]);

  const handleDeleteSticker = () => {
    const filteredStickers = stickersWatch.filter((previousSticker) => previousSticker.id !== sticker.id);
    setValue('stickers', filteredStickers);
  };

  return (
    <div
      ref={stickerRef}
      className={`${isActive && 'border-[1px] border-primary-300'} box-content origin-center transform`}
      style={{
        position: 'absolute',
        top: `${sticker.posY}%`,
        left: `${sticker.posX}%`,
        width: `${sticker.width}px`,
        height: `${sticker.height}px`,
        transform: `translate(-50%, -50%) rotate(${sticker.rotation}deg) scale(${sticker.scale ?? 1})`,
      }}
    >
      {isActive && (
        <>
          <button
            className={`absolute bg-x-circle-contained w-[24px] h-[24px] z-10`}
            style={{
              top: '-12px',
              right: '-12px',
              transform: `scale(${1 / (sticker.scale ?? 1)})`,
            }}
            onClick={handleDeleteSticker}
          ></button>
          <div
            className='absolute bg-primary-300 w-[9px] h-[9px] rounded-full touch-none'
            style={{
              top: '-4.5px',
              left: '-4.5px',
              transform: `scale(${1 / (sticker.scale ?? 1)})`,
            }}
            onTouchStart={handleTouchTransformStart}
            onMouseDown={handleMouseTransformStart}
          ></div>
          <div
            className='absolute bg-primary-300 w-[9px] h-[9px] rounded-full touch-none'
            style={{
              bottom: '-4.5px',
              left: '-4.5px',
              transform: `scale(${1 / (sticker.scale ?? 1)})`,
            }}
            onTouchStart={handleTouchTransformStart}
            onMouseDown={handleMouseTransformStart}
          ></div>
          <div
            className='absolute bg-primary-300 w-[9px] h-[9px] rounded-full touch-none'
            style={{
              bottom: '-4.5px',
              right: '-4.5px',
              transform: `scale(${1 / (sticker.scale ?? 1)})`,
            }}
            onTouchStart={handleTouchTransformStart}
            onMouseDown={handleMouseTransformStart}
          ></div>
        </>
      )}
      <img
        src={sticker.url}
        alt={sticker.stickerImageId}
        className='w-full h-full touch-none select-none'
        draggable={false}
        onTouchStart={handleTouchStart}
        onMouseDown={handleMouseDown}
      />
    </div>
  );
};

export default Sticker;
