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

const DELETE_BUTTON_SIZE = 24;
const calculateRelativePosition = (
  touch: React.Touch,
  touchOffset: MutableRefObject<{ x: number; y: number }>,
  previewRef: MutableRefObject<HTMLDivElement | null>,
  stickerRef: MutableRefObject<HTMLDivElement | null>,
) => {
  if (!previewRef.current || !stickerRef.current) return { relativeX: 0, relativeY: 0 };

  const previewBounds = previewRef.current.getBoundingClientRect();
  const stickerBounds = stickerRef.current.getBoundingClientRect();
  const offsetY = (DELETE_BUTTON_SIZE / previewBounds.height) * 100;

  let relativeX = ((touch.clientX - previewBounds.left - touchOffset.current.x) / previewBounds.width) * 100;
  let relativeY = ((touch.clientY - previewBounds.top - touchOffset.current.y) / previewBounds.height) * 100;

  relativeX = clampValue(relativeX, 0, 100 - (stickerBounds.width / previewBounds.width) * 100);
  relativeY = clampValue(relativeY - offsetY, 0, 100 - (stickerBounds.height / previewBounds.height) * 100);

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
    const { relativeX, relativeY } = calculateRelativePosition(touch, touchOffset, previewRef, stickerRef);

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
    const { relativeX, relativeY } = calculateRelativePosition(touch, touchOffset, previewRef, stickerRef);

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

  const handleResize = (e: MouseEvent | TouchEvent, direction: Direction, ref: HTMLElement) => {
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

  const isActive = activeStickerId === sticker.id;

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
