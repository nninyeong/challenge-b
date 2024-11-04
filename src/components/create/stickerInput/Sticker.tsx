'use client';

import { StickerType } from '@/types/invitationFormType.type';
import Image from 'next/image';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { NumberSize, Resizable } from 're-resizable';
import { Direction } from 're-resizable/lib/resizer';
import { calculateRelativePosition } from '@/utils/calculate/calculateRelativePosition';

const preventTouchScroll = (e: TouchEvent) => {
  e.preventDefault();
};

const DELETE_BUTTON_SIZE = 24;

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
  const touchOffset = useRef({ x: 0, y: 0 });
  const stickerRef = useRef<HTMLDivElement | null>(null); // 상위 div의 ref
  const [isResizing, setIsResizing] = useState<boolean>(false);

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

    onActivate(null);
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLImageElement>) => {
    if (isResizing) return;
    document.removeEventListener('touchmove', preventTouchScroll);
    if (!previewRef.current || !stickerRef.current) return;

    const touch = e.changedTouches[0];
    const { relativeX, relativeY } = calculateRelativePosition(
      touch,
      touchOffset,
      previewRef,
      stickerRef,
      DELETE_BUTTON_SIZE,
    );

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
    const { relativeX, relativeY } = calculateRelativePosition(
      touch,
      touchOffset,
      previewRef,
      stickerRef,
      DELETE_BUTTON_SIZE,
    );

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

  const isActive = activeStickerId === sticker.id;
  const handleResizeStart = () => {
    if (!isActive) return;
    setIsResizing(true);
  };

  const handleResizeStop = (e: TouchEvent | MouseEvent, direction: Direction, ref: HTMLElement, d: NumberSize) => {
    if (!isActive) return;
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

  const handleResize = (e: MouseEvent | TouchEvent, direction: Direction, ref: HTMLElement) => {
    if (!isActive) return;
    if (!previewRef.current || !stickerRef.current) return;

    const aspectRatio = sticker.width / sticker.height;

    const previewBounds = previewRef.current.getBoundingClientRect();
    const stickerBounds = stickerRef.current.getBoundingClientRect();

    let maxWidth = previewBounds.right - stickerBounds.left;
    let maxHeight = maxWidth / aspectRatio;

    if (stickerBounds.top + maxHeight > previewBounds.bottom) {
      maxHeight = previewBounds.bottom - stickerBounds.top;
      maxWidth = maxHeight * aspectRatio;
    }

    ref.style.maxWidth = `${maxWidth}px`;
    ref.style.maxHeight = `${maxHeight}px`;
  };

  return (
    <>
      <div
        ref={stickerRef}
        style={{
          position: 'absolute',
          top: `${sticker.posY}%`,
          left: `${sticker.posX}%`,
        }}
      >
        <div className={`w-full text-right h-[${DELETE_BUTTON_SIZE}px]`}>
          {isActive && (
            <button
              className={`bg-x-03 w-[${DELETE_BUTTON_SIZE}px] h-full`}
              onClick={handleDeleteSticker}
            />
          )}
        </div>
        <Resizable
          defaultSize={{ width: sticker.width, height: sticker.height }}
          onResizeStart={handleResizeStart}
          onResize={handleResize}
          onResizeStop={handleResizeStop}
          enable={{ bottomRight: true }}
          lockAspectRatio={true}
        >
          <Image
            src={sticker.url}
            alt={sticker.stickerImageId}
            width={sticker.width}
            height={sticker.height}
            className={`${isActive && 'border-[1px] border-primary-300'} w-full h-full`}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onTouchMove={handleTouchMove}
          />
        </Resizable>
      </div>
    </>
  );
};

export default Sticker;
