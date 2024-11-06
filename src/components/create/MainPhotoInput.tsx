'use client';
import { useFormContext, useWatch } from 'react-hook-form';
import TextEditor from './TextEditor';
import { FaPlus } from 'react-icons/fa6';
import { Font } from '@/types/mainFont.type';
import { uploadImageToSupabaseStorage } from '@/utils/uploadImg';

const FONTMENU = [
  { name: '나눔손글씨', font: 'NanumPen' },
  { name: '카페24 아네모네', font: 'Cafe24' },
  { name: '제주고딕', font: 'JejuGothic' },
  { name: '배달의민족 도현체', font: 'Bmdohyeon' },
  { name: '에스코어 드림', font: 'SCDream1' },
  { name: '눈누 난나체', font: 'Main' },
];

const MainPhotoInput = () => {
  const { register, setValue } = useFormContext();
  const introduceContent = useWatch({ name: 'mainPhotoInfo.introduceContent' });

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const publicUrl = await uploadImageToSupabaseStorage(file);
      if (publicUrl) {
        setValue('mainPhotoInfo.imageUrl', publicUrl);
      }
    }
  };

  const handleSelectFontname = (font: Font) => {
    setValue('mainPhotoInfo.fontName', font.font);
  };

  const handleSetContent = (value: string) => {
    setValue('mainPhotoInfo.introduceContent', value);
  };
  return (
    <div className='w-full flex flex-col '>
      <div className='w-full flex items-center'>
        <label className='font-bold text-gray-700 text-[14px]  text-center mr-5'>이름</label>
        <div className='gap-2'>
          <input
            type='text'
            placeholder='좌측'
            {...register('mainPhotoInfo.leftName')}
            className='h-[32px] w-[72px] pl-[8px] py-[9px] border text-[12px] rounded-[8px] text-black mr-2'
          />
          <input
            type='text'
            placeholder='♥︎'
            {...register('mainPhotoInfo.icon')}
            className='h-[32px] w-[48px] pl-4 pr-4 border text-[12px] rounded-[8px]  text-black mr-2'
          />
          <input
            type='text'
            placeholder='우측'
            {...register('mainPhotoInfo.rightName')}
            className='h-[32px] w-[72px] pl-[8px] py-[9px] border text-[12px] rounded-[8px] text-black'
          />
        </div>
      </div>

      <div className='flex mt-3 mb-5'>
        <label className='font-bold text-gray-700 text-[14px] mr-5'>글꼴</label>
        <div className='w-[208px] flex flex-wrap'>
          {FONTMENU.map((font) => (
            <p
              key={font.name}
              onClick={() => handleSelectFontname(font)}
              className=' pt-1 pb-1 pl-2 pr-2 text-gray-400 bg-gray-100 hover:bg-primary300 hover:text-white rounded-3xl font-bold text-center cursor-pointer text-[14px] mr-2 mb-2'
            >
              {font.name}
            </p>
          ))}
        </div>
      </div>

      <div className='h-[80px] flex gap-2 justify-center   '>
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
          style={{ width: '200px', height: '48px' }}
        />
      </div>
    </div>
  );
};

export default MainPhotoInput;
