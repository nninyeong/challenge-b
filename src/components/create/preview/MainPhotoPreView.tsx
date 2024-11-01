import { InvitationFormType } from '@/types/invitationFormType.type';
import Image from 'next/image';
import { Control, useWatch } from 'react-hook-form';
import { ArchSvg, EllipseSvg } from '../CustomSVG';
import { useRef, useState } from 'react';
import Sticker from '@/components/create/stickerInput/Sticker';

const preventDefaultBehaviour = (e: React.DragEvent<HTMLDivElement>) => {
  e.preventDefault();
  e.stopPropagation();
};

const MainPhotoPreView = ({ control }: { control: Control<InvitationFormType> }) => {
  const mainPhotoInfo = useWatch({
    control,
    name: 'mainPhotoInfo',
  });

  const svgBgColor = useWatch({
    control,
    name: 'bgColor',
  });

  const mainViewType = useWatch({
    control,
    name: 'mainView',
  });

  const stickersWatch = useWatch({
    control,
    name: 'stickers',
  });

  const previewRef = useRef<HTMLDivElement | null>(null);

  const [activeStickerId, setActiveStickerId] = useState<string | null>(null);
  const handleActiveSticker = (id?: string) => {
    setActiveStickerId(id || null);
  };

  return (
    <div className='w-full flex flex-col justify-center item-center mx-auto text-center text-black'>
      <div
        className='quill-preview'
        dangerouslySetInnerHTML={{
          __html: mainPhotoInfo?.introduceContent || '대표문구를 작성해주세요',
        }}
      />
      <div
        className={`flex justify-center items-center w-full ${mainViewType.type === 'fill' ? 'px-0' : 'px-[20px]'} `}
      >
        {!mainPhotoInfo?.imageUrl ? (
          <p className='text-gray-500 w-[375px] h-[728px] bg-gray text-center'>이미지가 업로드되지 않았습니다.</p>
        ) : (
          <div
            className='flex justify-center items-center relative w-full h-[600px]'
            ref={previewRef}
            onDrop={preventDefaultBehaviour}
            onDragOver={preventDefaultBehaviour}
          >
            <Image
              src={mainPhotoInfo.imageUrl}
              alt='mainImg'
              fill
              className='z-0 object-cover'
            />
            <div className='absolute inset-0 flex justify-center items-center'>
              {mainViewType.type === 'arch' && <ArchSvg color={svgBgColor} />}
              {mainViewType.type === 'ellipse' && <EllipseSvg color={svgBgColor} />}
            </div>
            {stickersWatch?.map((sticker) => (
              <Sticker
                key={sticker.id}
                sticker={sticker}
                previewRef={previewRef}
                activeStickerId={activeStickerId}
                onActivate={handleActiveSticker}
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
};

export default MainPhotoPreView;
