'use client';
import { useFormContext, useWatch } from 'react-hook-form';
import TextEditor from './TextEditor';
import { FaPlus } from 'react-icons/fa6';
import { compressImageTwice } from '@/utils/compressImg';
import { uploadImageToSupabaseStorage } from '@/utils/uploadImg';

const MainPhotoInput = () => {
  const { register, setValue } = useFormContext();
  const introduceContent = useWatch({ name: 'mainPhotoInfo.introduceContent' });

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const compressImg = await compressImageTwice(file);
      const publicUrl = await uploadImageToSupabaseStorage(compressImg);

      if (publicUrl) {
        setValue('mainPhotoInfo.imageUrl', publicUrl);
      }
    }
  };

  const handleSetContent = (value: string) => {
    setValue('mainPhotoInfo.introduceContent', value);
  };
  return (
    <div className='w-full flex flex-col gap-3 justify-center mt-3.5'>
      <div className='w-full flex justify-center items-center'>
        <label className='font-bold text-gray-700 text-[14px]  text-center mr-5 whitespace-nowrap'>이름</label>
        <div className='gap-2 w-full justify-center'>
          <input
            type='text'
            placeholder='좌측'
            {...register('mainPhotoInfo.leftName')}
            maxLength={5}
            className='h-[32px] w-[72px] pl-[8px] py-[9px] border text-[12px] rounded-[8px] text-black mr-2'
          />
          <input
            type='text'
            placeholder='♥︎'
            {...register('mainPhotoInfo.icon')}
            className='text-center h-[32px] w-[48px] pl-4 pr-4 border text-[12px] rounded-[8px]  text-black mr-2'
            maxLength={1}
          />
          <input
            type='text'
            placeholder='우측'
            {...register('mainPhotoInfo.rightName')}
            className='h-[32px] w-[72px] pl-[8px] py-[9px] border text-[12px] rounded-[8px] text-black'
            maxLength={5}
          />
        </div>
      </div>

      <div className='h-[80px] flex gap-2   '>
        <label
          htmlFor='file'
          className='bg-white text-center cursor-pointer px-2 py-1 rounded-xl text-black h-[80px] w-[80px] flex justify-center items-center border border-dashed border-gray-400'
        >
          <FaPlus size={18} />
        </label>
        <input
          type='file'
          id='file'
          className='hidden'
          accept='image/*'
          onChange={handleFileChange}
        />

        <TextEditor
          placeholder='메인화면 문구를 설정해주세요'
          value={introduceContent || ''}
          onChange={handleSetContent}
          style={{ width: '200px', height: '95px' }}
        />
      </div>
    </div>
  );
};

export default MainPhotoInput;
