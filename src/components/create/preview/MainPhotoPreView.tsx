import { InvitationFormType } from '@/types/invitationFormType.type';
import Image from 'next/image';
import { Control, useWatch } from 'react-hook-form';
import { ArchSvg, EllipseSvg } from '../CustomSVG';
import colorConverter from '@/utils/colorConverter';

const MainPhotoPreView = ({ control }: { control: Control<InvitationFormType> }) => {
  const mainPhotoInfo = useWatch({
    control,
    name: 'mainPhotoInfo',
  });

  const svgBgColor = useWatch({
    control,
    name: 'bgColor',
  });

  return (
    <div className='w-full flex flex-col justify-center item-center mx-auto text-center text-black'>
      <div
        className='quill-preview'
        dangerouslySetInnerHTML={{
          __html: mainPhotoInfo?.introduceContent || '대표문구를 작성해주세요',
        }}
      />
      <div className='flex justify-center items-center'>
        {!mainPhotoInfo?.imageUrl ? (
          <p className='text-gray-500 w-[375px] h-[728px] bg-gray text-center'>이미지가 업로드되지 않았습니다.</p>
        ) : (
          <div className='flex justify-center items-center relative w-[375px] h-[600px]'>
            <Image
              src={mainPhotoInfo.imageUrl}
              alt='mainImg'
              objectFit='cover'
              fill
              className='z-0 rounded-md'
            />
            <div className='absolute inset-0 flex justify-center items-center'>
              <ArchSvg color={svgBgColor} />
              {/* <EllipseSvg color={svgBgColor} /> */}
            </div>
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
