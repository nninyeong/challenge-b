'use client';

import { StickerType } from '@/types/invitationFormType.type';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { useMemo } from 'react';

const Sticker = ({ sticker }: { sticker: StickerType }) => {
  const pathname = usePathname();
  const isDraggable = useMemo(() => pathname === '/create/card', [pathname]);

  return (
    <Image
      src={sticker.url}
      draggable={isDraggable}
      alt={sticker.stickerImageId}
      width={100}
      height={100}
      className={`absolute top-[${sticker.posY}] left-[${sticker.posX}]`}
    />
  );
};

export default Sticker;
