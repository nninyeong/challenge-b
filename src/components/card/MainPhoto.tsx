'use client';

import Image from 'next/image';
import { ArchSvg, EllipseSvg } from '@/components/create/CustomSVG';
import Sticker from '@/components/create/stickerInput/Sticker';
import { forwardRef, useRef, useState } from 'react';
import { InvitationFormType, StickerType } from '@/types/invitationFormType.type';
import { usePathname } from 'next/navigation';
import StickerOnSharedCard from '@/components/card/StickerOnSharedCard';

const preventDefaultBehaviour = (e: React.DragEvent<HTMLDivElement>) => {
  e.preventDefault();
  e.stopPropagation();
};

type MainPhotoPropType = Pick<InvitationFormType, 'mainPhotoInfo' | 'bgColor' | 'mainView' | 'stickers'>;

const MainPhoto = forwardRef<HTMLDivElement, MainPhotoPropType>(
  ({ mainPhotoInfo, bgColor, mainView, stickers }, ref) => {
    const previewRef = useRef<HTMLDivElement | null>(null);
    const [activeStickerId, setActiveStickerId] = useState<string | null>(null);
    const handleActiveSticker = (id: string | null) => {
      setActiveStickerId(id);
    };
    const path = usePathname();

    return (
      <div className='w-full flex flex-col justify-center item-center mx-auto text-center text-black'>
        <div
          className='quill-preview'
          dangerouslySetInnerHTML={{
            __html: mainPhotoInfo?.introduceContent || '대표문구를 작성해주세요',
          }}
        />
        <div
          ref={previewRef}
          className={`flex justify-center items-center w-full overflow-hidden ${mainView.type === 'fill' ? 'px-0' : 'px-[20px]'} `}
        >
          {!mainPhotoInfo?.imageUrl ? (
            <p className='text-gray-500 w-[375px] h-[728px] bg-gray text-center'>이미지가 업로드되지 않았습니다.</p>
          ) : (
            <div
              ref={ref}
              className='flex justify-center items-center relative w-full h-[600px]'
              onDrop={preventDefaultBehaviour}
              onDragOver={preventDefaultBehaviour}
            >
              <Image
                src={mainPhotoInfo.imageUrl}
                alt='mainImg'
                objectFit='cover'
                fill
                className='z-0'
              />
              <div className='absolute inset-0 flex justify-center items-center'>
                {mainView.type === 'arch' && <ArchSvg color={bgColor} />}
                {mainView.type === 'ellipse' && <EllipseSvg color={bgColor} />}
              </div>
              {path === '/create/card'
                ? stickers?.map((sticker: StickerType) => (
                    <Sticker
                      key={sticker.id}
                      sticker={sticker}
                      previewRef={previewRef}
                      activeStickerId={activeStickerId}
                      onActivate={handleActiveSticker}
                    />
                  ))
                : stickers?.map((sticker: StickerType) => (
                    <StickerOnSharedCard
                      key={sticker.id}
                      sticker={sticker}
                    />
                  ))}
            </div>
          )}
        </div>
        <div className='flex justify-center items-center gap-2 mt-4'>
          <p className='text-xl'>{mainPhotoInfo?.leftName || '좌측 이름'}</p>
          <p className='text-xl'>{mainPhotoInfo?.icon || '♥︎'}</p>
          <p className='text-xl'>{mainPhotoInfo?.rightName || '우측 이름'}</p>
        </div>
      </div>
    );
  },
);

MainPhoto.displayName = 'MainPhoto';
export default MainPhoto;
