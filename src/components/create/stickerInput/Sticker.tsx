'use client';

import { StickerType } from '@/types/invitationFormType.type';
import Image from 'next/image';
import { MutableRefObject, useRef, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { clampValue } from '@/utils/clampValue';
import { NumberSize, Resizable } from 're-resizable';
import { Direction } from 're-resizable/lib/resizer';

const preventTouchScroll = (e: TouchEvent) => {
  e.preventDefault();
};

const calculateRelativePosition = (
  touch: React.Touch,
  touchOffset: MutableRefObject<{ x: number; y: number }>,
  previewRef: MutableRefObject<HTMLDivElement | null>,
) => {
  if (!previewRef.current) return { relativeX: 0, relativeY: 0 };

  const relativeX = clampValue(
    ((touch.clientX - previewRef.current.getBoundingClientRect().left - touchOffset.current.x) /
      previewRef.current.clientWidth) *
      100,
    0,
    100,
  );

  const relativeY = clampValue(
    ((touch.clientY - previewRef.current.getBoundingClientRect().top - touchOffset.current.y) /
      previewRef.current.clientHeight) *
      100,
    0,
    100,
  );

  return { relativeX, relativeY };
};

const Sticker = ({
  sticker,
  previewRef,
  activeStickerId,
  onActivate,
}: {
  sticker: StickerType;
  previewRef: MutableRefObject<HTMLDivElement | null>;
  activeStickerId: string | null;
  onActivate: (id?: string) => void;
}) => {
  const { setValue, control } = useFormContext();
  const stickersWatch = useWatch({
    control,
    name: 'stickers',
  }) as StickerType[];
  const touchOffset = useRef({ x: 0, y: 0 });
  const stickerRef = useRef<HTMLDivElement | null>(null); // 상위 div의 ref
  const [isResizing, setIsResizing] = useState(false);

  const handleTouchStart = (e: React.TouchEvent<HTMLImageElement>) => {
    if (isResizing) return;
    document.addEventListener('touchmove', preventTouchScroll, { passive: false });
    if (!previewRef.current) return;

    const touch = e.touches[0];
    const currentSticker = e.currentTarget.getBoundingClientRect();

    touchOffset.current = {
      x: touch.clientX - currentSticker.left,
      y: touch.clientY - currentSticker.top,
    };

    onActivate();
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLImageElement>) => {
    if (isResizing) return;
    document.removeEventListener('touchmove', preventTouchScroll);
    if (!previewRef.current || !stickerRef.current) return;

    const touch = e.changedTouches[0];
    const { relativeX, relativeY } = calculateRelativePosition(touch, touchOffset, previewRef);

    const updatedSticker = stickersWatch.map((stickerItem: StickerType) => {
      if (stickerItem.id === sticker.id) {
        return { ...sticker, posX: relativeX, posY: relativeY };
      } else {
        return stickerItem;
      }
    });

    setValue('stickers', [...updatedSticker]);
    onActivate(sticker.id);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLImageElement>) => {
    if (isResizing) return;
    if (!previewRef.current || !stickerRef.current) return;

    const touch = e.touches[0];
    const { relativeX, relativeY } = calculateRelativePosition(touch, touchOffset, previewRef);

    requestAnimationFrame(() => {
      if (!stickerRef.current) return;
      stickerRef.current.style.left = `${relativeX}%`;
      stickerRef.current.style.top = `${relativeY}%`;
    });
  };

  const handleDeleteSticker = () => {
    const filteredStickers = stickersWatch.filter((previousSticker) => previousSticker.id !== sticker.id);
    setValue('stickers', filteredStickers);
  };

  const handleResizeStart = () => {
    setIsResizing(true);
  };

  const handleResizeStop = (e: TouchEvent | MouseEvent, direction: Direction, ref: HTMLElement, d: NumberSize) => {
    setIsResizing(false);

    const newWidth = sticker.width + d.width;
    const newHeight = sticker.height + d.height;

    const updatedSticker = stickersWatch.map((stickerItem: StickerType) => {
      if (stickerItem.id === sticker.id) {
        return { ...sticker, width: newWidth, height: newHeight };
      } else {
        return stickerItem;
      }
    });

    setValue('stickers', [...updatedSticker]);
  };

  const isActive = activeStickerId === sticker.id;

  return (
    <>
      {isActive && (
        <button
          className={`bg-x-03 w-[24px] h-[24px]`}
          style={{
            position: 'absolute',
            top: `${+sticker.posY - 5}%`,
            left: `${+sticker.posX + 10}%`,
          }}
          onClick={handleDeleteSticker}
        />
      )}
      <div
        ref={stickerRef}
        style={{
          position: 'absolute',
          top: `${sticker.posY}%`,
          left: `${sticker.posX}%`,
          width: `${sticker.width}px`,
          height: `${sticker.height}px`,
        }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchMove={handleTouchMove}
        className={`${isActive && 'border-[1px] border-primary-300'}`}
      >
        <Resizable
          defaultSize={{ width: sticker.width, height: sticker.height }}
          onResizeStart={handleResizeStart}
          onResizeStop={handleResizeStop}
          enable={{ bottomRight: true }}
          lockAspectRatio={true}
        >
          <Image
            src={sticker.url}
            alt={sticker.stickerImageId}
            width={100}
            height={100}
            className='w-full h-full'
          />
        </Resizable>
      </div>
    </>
  );
};

export default Sticker;
