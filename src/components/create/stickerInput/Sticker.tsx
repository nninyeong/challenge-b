'use client';

import { StickerType } from '@/types/invitationFormType.type';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { NumberSize, Resizable } from 're-resizable';
import { Direction } from 're-resizable/lib/resizer';
import { calculateRelativePosition } from '@/utils/calculate/calculateRelativePosition';
import { calculateAngle } from '@/utils/calculate/calculateAngle';
import { calculateComponentRotation } from '@/utils/calculate/calculateComponentRotation';

const preventTouchScroll = (e: TouchEvent) => {
  e.preventDefault();
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
  const [isRotating, setIsRotating] = useState<boolean>(false);
  const originRef = useRef({ x: 0, y: 0 });
  const rotationStartPosition = useRef({ x: 0, y: 0 });
  const rotationStartDeg = useRef<number>(sticker.rotation || 0);
  const accumulatedRotation = useRef<number>(sticker.rotation || 0);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent | TouchEvent) => {
      if (activeStickerId === sticker.id && stickerRef.current && !stickerRef.current.contains(e.target as Node)) {
        onActivate(null);
        document.removeEventListener('touchmove', preventTouchScroll);
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
    if (isResizing || !previewRef.current) return;
    document.addEventListener('touchmove', preventTouchScroll, { passive: false });

    const touch = e.touches[0];
    const currentSticker = e.currentTarget.getBoundingClientRect();

    touchOffset.current = {
      x: touch.clientX - currentSticker.left,
      y: touch.clientY - currentSticker.top,
    };

    onActivate(null);
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLImageElement>) => {
    if (isRotating || isResizing || !previewRef.current || !stickerRef.current) return;
    document.removeEventListener('touchmove', preventTouchScroll);

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
    if (isRotating || isResizing || !previewRef.current || !stickerRef.current) return;

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
    if (!isActive || !previewRef.current || !stickerRef.current) return;

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

  const handleRotationStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isActive || isResizing || !stickerRef.current) return;
    e.stopPropagation();
    setIsRotating(true);
    document.addEventListener('touchmove', preventTouchScroll, { passive: false });

    const stickerBound = stickerRef.current.getBoundingClientRect();
    const originX = stickerBound.left - window.scrollX + stickerBound.width / 2;
    const originY = stickerBound.top - window.scrollY + stickerBound.height / 2;
    originRef.current = { x: originX, y: originY };
    rotationStartDeg.current = sticker.rotation;

    const touch = e.touches[0];
    rotationStartPosition.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleRotationMove = (e: React.TouchEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!isRotating || isResizing || !stickerRef.current) return;

    const touch = e.touches[0];
    const angleAtCurrent = calculateAngle(originRef.current, { x: touch.clientX, y: touch.clientY });
    let delta = angleAtCurrent - rotationStartDeg.current;
    if (delta < 0) delta += 360;
    const updatedRotation = accumulatedRotation.current + delta;

    requestAnimationFrame(() => {
      if (!stickerRef.current) return;
      stickerRef.current.style.transform = `rotate(${updatedRotation}deg)`;
    });
  };

  const handleRotationStop = () => {
    if (!stickerRef.current || !isRotating || isResizing) return;
    const rotation = calculateComponentRotation(stickerRef);
    accumulatedRotation.current = rotation;
    const updatedSticker = stickersWatch.map((stickerItem: StickerType) => {
      if (stickerItem.id === sticker.id) {
        return { ...sticker, rotation };
      } else {
        return stickerItem;
      }
    });

    setValue('stickers', [...updatedSticker]);

    setIsRotating(false);
    document.removeEventListener('touchmove', preventTouchScroll);
  };

  return (
    <>
      <div
        ref={stickerRef}
        style={{
          position: 'absolute',
          top: `${sticker.posY}%`,
          left: `${sticker.posX}%`,
          transform: `rotate(${sticker.rotation}deg)`,
        }}
      >
        <div className='relative w-full h-full'>
          {isActive && (
            <>
              <button
                className={`absolute bg-x-circle-contained top-[-12px] right-[-12px] w-[24px] h-[24px] z-10`}
                onClick={handleDeleteSticker}
              ></button>
              <div className='absolute top-[-3px] left-[-3px] bg-primary-300 w-[6px] h-[6px] rounded-[8px]'></div>
              <div className='absolute bottom-[-3px] left-[-3px] bg-primary-300 w-[6px] h-[6px] rounded-[8px]'></div>
              <div
                className='absolute bottom-[-12px] right-[-12px] bg-yellow-300 w-[24px] h-[24px] rounded-[8px] z-10'
                onTouchStart={handleRotationStart}
                onTouchMove={handleRotationMove}
                onTouchEnd={handleRotationStop}
              ></div>
            </>
          )}

          <Resizable
            defaultSize={{ width: sticker.width, height: sticker.height }}
            onResizeStart={handleResizeStart}
            onResize={handleResize}
            onResizeStop={handleResizeStop}
            enable={{ bottomRight: true, topLeft: false, bottomLeft: false, topRight: false }}
            lockAspectRatio={true}
          >
            <img
              src={sticker.url}
              alt={sticker.stickerImageId}
              style={{ width: sticker.width, height: sticker.height }}
              className={`${isActive && 'border-[1px] border-primary-300'} w-full h-full`}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
              onTouchMove={handleTouchMove}
            />
          </Resizable>
        </div>
      </div>
    </>
  );
};

export default Sticker;
