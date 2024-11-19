'use client';

import Image from 'next/image';
import { ArchSvg, EllipseSvg } from '@/components/create/CustomSVG';
import Sticker from '@/components/create/stickerInput/Sticker';
import { forwardRef, useRef, useState, useEffect } from 'react';
import { InvitationFormType, StickerType } from '@/types/invitationFormType.type';
import { usePathname } from 'next/navigation';
import StickerOnSharedCard from '@/components/card/StickerOnSharedCard';
import colorConverter from '@/utils/colorConverter';
import { useMainImagePreviewStore } from '@/store/useCompressedImages';

const preventDefaultBehaviour = (e: React.DragEvent<HTMLDivElement>) => {
  e.preventDefault();
  e.stopPropagation();
};

type MainPhotoPropType = Pick<InvitationFormType, 'mainPhotoInfo' | 'bgColor' | 'mainView' | 'stickers' | 'fontInfo'>;

const MainPhoto = forwardRef<HTMLDivElement, MainPhotoPropType>(
  ({ mainPhotoInfo, bgColor, mainView, stickers, fontInfo }, ref) => {
    const [mainPhotoUrl, setMainPhotoUrl] = useState('');
    const [loading, setLoading] = useState<boolean>(false);
    const { mainPreviewUrl } = useMainImagePreviewStore();
    const previewRef = useRef<HTMLDivElement | null>(null);
    const [activeStickerId, setActiveStickerId] = useState<string | null>(null);
    const handleActiveSticker = (id: string | null) => {
      setActiveStickerId(id);
    };
    const path = usePathname();
    const { size, color } = fontInfo;
    const rgbaColor = colorConverter(color);

    useEffect(() => {
      if (path === '/card/') {
        setMainPhotoUrl(mainPhotoInfo.imageUrl);
        setLoading(false);
      }
      if (path === '/create/card') {
        if (mainPhotoInfo.imageUrl) {
          setMainPhotoUrl(mainPhotoInfo.imageUrl);
          setLoading(false);
        }
        if (mainPreviewUrl) {
          setMainPhotoUrl(mainPreviewUrl); // 원본 이미지 없으면 압축된 이미지 사용
          // 압축된 이미지는 바로 로드됨
          setLoading(true);
        }
      }
    }, [mainPhotoInfo.imageUrl, mainPreviewUrl, path, loading, mainPhotoUrl]);

    const handleImageLoad = () => {
      setLoading(false); // 원본 이미지 로드 완료
    };
    console.log(mainPhotoInfo.imageUrl);
    console.log(loading);
    return (
      <div
        style={{ fontSize: `${16 + size}px`, color: `${rgbaColor}` }}
        className='overflow-hidden w-full flex flex-col justify-center item-center mx-auto pt-[72px] mb-[59px] text-center text-black'
      >
        <div
          className={`flex justify-center items-center w-[375px] self-center overflow-hidden ${mainView.type === 'fill' ? 'px-0' : 'px-[20px]'} `}
        >
          {!mainPhotoUrl ? (
            <p className='text-gray-500 w-[375px] h-[728px] bg-gray text-center'>청첩장 대표사진을 등록해주세요</p>
          ) : (
            <div
              ref={ref}
              className='flex justify-center items-center relative w-full h-[600px] mb-[24px]'
              onDrop={preventDefaultBehaviour}
              onDragOver={preventDefaultBehaviour}
            >
              {loading && mainPhotoUrl ? (
                <div className='w-full h-[600px] flex justify-center items-center text-gray-500'>
                  <Image
                    src={mainPreviewUrl}
                    alt='Main Image Preview'
                    objectFit='cover'
                    fill
                    className='z-0'
                  />
                  <p>Loading...</p>
                </div>
              ) : (
                <Image
                  src={mainPhotoUrl}
                  alt='Main Image'
                  objectFit='cover'
                  fill
                  className='z-0'
                  onLoad={handleImageLoad}
                />
              )}

              <div className='absolute inset-0 flex justify-center items-center'>
                {mainView.type === 'arch' && <ArchSvg color={bgColor} />}
                {mainView.type === 'ellipse' && <EllipseSvg color={bgColor} />}
              </div>
              <div
                ref={previewRef}
                className='w-full h-full relative'
              >
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
            </div>
          )}
        </div>

        <div
          style={{ fontSize: `${16 + size}px`, color: `${rgbaColor}` }}
          className='flex items-center justify-center mt-4 text-[24px] font-semibold mb-[12px] text-center relative'
        >
          <p className='flex-1 text-right whitespace-nowrap pr-4'>{mainPhotoInfo?.leftName || '좌측 이름'}</p>
          <p className='absolute left-1/2 transform -translate-x-1/2 whitespace-nowrap'>
            {mainPhotoInfo?.icon || '♥︎'}
          </p>
          <p className='flex-1 text-left whitespace-nowrap pl-4'>{mainPhotoInfo?.rightName || '우측 이름'}</p>
        </div>

        <div className='text-opacity-75 flex flex-col'>
          <div
            style={{ fontSize: `${16 + size}px`, color: `${rgbaColor}` }}
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
