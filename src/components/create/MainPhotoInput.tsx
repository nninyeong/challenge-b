'use client';
import { useFormContext } from 'react-hook-form';
import TextEditor from './TextEditor';
import { FaPlus } from 'react-icons/fa6';

const FONTMENU = [
  { name: '나눔손글씨', font: 'NanumPen' },
  { name: '카페24 아네모네', font: 'Cafe24' },
  { name: '제주고딕', font: 'JejuGothic' },
  { name: '배달의민족 도현체', font: 'Bmdohyeon' },
  { name: '에스코어 드림', font: 'SCDream1' },
  { name: '눈누 난나체', font: 'Main' },
];

const MainPhotoInput = () => {
  const { register, watch, setValue } = useFormContext();
  const introduceContent = watch('mainPhotoInfo.introduceContent');

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setValue('mainPhotoInfo.imageUrl', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className='flex flex-col justify-center items-center gap-2'>
      <h2 className='text-[18px] font-bold text-black text-center '>청첩장 대표 사진</h2>

      <div className='flex justify-center items-center gap-2'>
        <label className='font-bold text-black text-[14px] w-[48px] text-center'>이름</label>
        <div className='gap-2 flex justify-center items-center w-[221px]'>
          <input
            type='text'
            placeholder='좌측'
            {...register('mainPhotoInfo.leftName')}
            className='h-[32px] w-[72px] pl-[8px] py-[9px] border text-[12px] rounded-[8px] text-black'
          />
          <input
            type='text'
            placeholder='♥︎'
            {...register('mainPhotoInfo.icon')}
            className='h-[32px] w-[48px] pl-4 pr-4 border text-[12px] rounded-[8px] placeholder:text-center text-black'
          />
          <input
            type='text'
            placeholder='우측'
            {...register('mainPhotoInfo.rightName')}
            className='h-[32px] w-[72px] pl-[8px] py-[9px] border text-[12px] rounded-[8px] text-black'
          />
        </div>
      </div>

      <div className='flex justify-center items-center gap-2'>
        <label className='font-bold text-black text-[14px] w-[48px] text-center'>글꼴</label>
        <div className='grid grid-cols-2 gap-1'>
          {FONTMENU.map((font) => (
            <div
              key={font.name}
              onClick={() => setValue('mainPhotoInfo.fontName', font.font)}
              className=' p-1 text-black bg-gray-100 hover:bg-primary300 hover:text-white rounded-md font-bold text-center cursor-pointer text-[14px] '
            >
              {font.name}
            </div>
          ))}
        </div>
      </div>

      <div className=' flex gap-4 justify-center items-center mt-2 '>
        <label
          htmlFor='file'
          className='bg-white text-center cursor-pointer px-2 py-1 rounded-md text-black h-[80px] w-[80px] flex justify-center items-center border border-dashed border-gray-600'
        >
          <FaPlus size={20} />
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
          onChange={(value) => setValue('mainPhotoInfo.introduceContent', value)}
        />
      </div>
    </div>
  );
};

export default MainPhotoInput;
