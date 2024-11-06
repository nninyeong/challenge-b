'use client';
import { uploadGalleryImageToSupabaseStorage } from '@/utils/uploadImg';
import { useFormContext, useWatch } from 'react-hook-form';
import { FaPlus } from 'react-icons/fa6';
import { IoIosInformationCircleOutline } from 'react-icons/io';
import GalleryButton from '../gallery/GalleryButton';
import { Notify } from 'notiflix';

const MAX_FILES = 18;

const GalleryInput = () => {
  const { setValue, getValues } = useFormContext();

  const ratio = useWatch({ name: 'gallery.ratio' });
  const gridType = useWatch({ name: 'gallery.grid' });

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    const existingImages = getValues('gallery.images') || [];

    if (files && files.length + existingImages.length > MAX_FILES) {
      Notify.failure(`사진은 최대 ${MAX_FILES}장까지 등록할 수 있습니다.`);
      return;
    }

    if (files && files.length > 0) {
      const fileArray = Array.from(files);

      try {
        const urls = await Promise.all(fileArray.map((file) => uploadGalleryImageToSupabaseStorage(file)));
        const publicUrls = urls.filter((url) => url !== null);
        setValue('gallery.images', [...existingImages, ...publicUrls]);
      } catch (error) {
        console.error('이미지 업로드 중 오류가 발생했습니다:', error);
      }
    }
  };

  const handleImgCutStyle = (style: string) => {
    setValue('gallery.ratio', style);
  };

  const handleGridTypeStyle = (type: number) => {
    setValue('gallery.grid', type);
  };

  return (
    <div className='text-black'>
      <div className='flex items-center mb-3'>
        <p className='mr-4'>사진비율</p>
        <GalleryButton
          onClick={() => handleImgCutStyle('square')}
          isActive={ratio === 'square'}
        >
          정사각형
        </GalleryButton>
        <GalleryButton
          onClick={() => handleImgCutStyle('rectangle')}
          isActive={ratio === 'rectangle'}
        >
          직사각형
        </GalleryButton>
      </div>
      <div className='flex items-center'>
        <p className='mr-4'>배치방법</p>
        <GalleryButton
          onClick={() => handleGridTypeStyle(2)}
          isActive={gridType === 2}
        >
          2단그리드
        </GalleryButton>
        <GalleryButton
          onClick={() => handleGridTypeStyle(3)}
          isActive={gridType === 3}
        >
          3단그리드
        </GalleryButton>
      </div>

      <div className='flex gap-2 items-end mt-7'>
        <label
          htmlFor='file'
          className='bg-white text-center cursor-pointer px-2 py-1 rounded-xl text-black h-[80px] w-[80px] flex justify-center items-center border border-dashed border-gray-600'
        >
          <FaPlus size={20} />
        </label>
        <div className='flex'>
          <input
            type='file'
            id='file'
            className='hidden'
            accept='image/*'
            onChange={handleFileChange}
            multiple
          />
          <div className='flex gap-2'>
            <IoIosInformationCircleOutline />
            <p className='text-[12px] text-gray-600'>최대 18장까지 등록할 수 있습니다.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryInput;
