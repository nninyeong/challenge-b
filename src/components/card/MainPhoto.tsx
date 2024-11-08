'use client';

import Image from 'next/image';
import { ArchSvg, EllipseSvg } from '@/components/create/CustomSVG';
import Sticker from '@/components/create/stickerInput/Sticker';
import { forwardRef, useRef, useState } from 'react';
import { InvitationFormType, StickerType } from '@/types/invitationFormType.type';
import { usePathname } from 'next/navigation';
import StickerOnSharedCard from '@/components/card/StickerOnSharedCard';
import { getDayOfWeek } from '@/utils/date/getDayOfWeek';

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
      <div className='w-full flex flex-col justify-center item-center mx-auto mt-[72px] mb-[59px] text-center text-black'>
        <div
          dangerouslySetInnerHTML={{
            __html: mainPhotoInfo?.introduceContent || '대표문구를 작성해주세요',
          }}
          className='text-center leading-9 mb-4'
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
              className='flex justify-center items-center relative w-full h-[600px] mb-[24px]'
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
        <div className='flex items-center justify-center mt-4 text-[24px] text-gray-900 font-semibold mb-[12px] text-center relative'>
          <p className='flex-1 text-right whitespace-nowrap pr-4'>{mainPhotoInfo?.leftName || '좌측 이름'}</p>
          <p className='absolute left-1/2 transform -translate-x-1/2 whitespace-nowrap'>
            {mainPhotoInfo?.icon || '♥︎'}
          </p>
          <p className='flex-1 text-left whitespace-nowrap pl-4'>{mainPhotoInfo?.rightName || '우측 이름'}</p>
        </div>

        <div className='text-[16px] text-gray-700 flex flex-col'>
          <div
            dangerouslySetInnerHTML={{
              __html: mainPhotoInfo?.introduceContent || '대표문구를 작성해주세요',
            }}
            className='text-center leading-9 mb-4'
          />
        </div>
      </div>
    );
  },
);

MainPhoto.displayName = 'MainPhoto';
export default MainPhoto;
