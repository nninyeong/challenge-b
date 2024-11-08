'use client';

import { StickerType } from '@/types/invitationFormType.type';
import { MutableRefObject, useEffect, useRef } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import useStickerMove from '@/hooks/invitation/sticker/useStickerMove';

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
  const isActive = activeStickerId === sticker.id; // 상위 컴포넌트에서 활성화된 스티커가 하나이도록 관리할 거기 때문에 상위에서 받아서 해당 컴포넌트의 아이디와 비교하는 것이 적합하다고 생각
  const { handleTouchStart } = useStickerMove({ sticker, previewRef, stickerRef, stickersWatch, setValue, onActivate });

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

  return (
    <div
      ref={stickerRef}
      style={{
        position: 'absolute',
        top: `${sticker.posY}%`,
        left: `${sticker.posX}%`,
        width: `${sticker.width}px`,
        height: `${sticker.height}px`,
        transform: `rotate(${sticker.rotation}deg)`,
      }}
    >
      <img
        src={sticker.url}
        alt={sticker.stickerImageId}
        className={`${isActive && 'border-[1px] border-primary-300'} w-full h-full touch-none`}
        onTouchStart={handleTouchStart}
      />
    </div>
  );
};

export default Sticker;
