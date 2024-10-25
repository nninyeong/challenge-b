'use client';
import { useFormContext } from 'react-hook-form';
const FONTMENU = [
  {
    name: '나눔손글씨',
    font: '',
  },
  {
    name: '카페24 아네모네',
    font: '',
  },
  {
    name: '제주고딕',
    font: '',
  },
  {
    name: '배달의민족 도현체',
    font: '',
  },
  {
    name: '에스코어 드림',
    font: '',
  },
  {
    name: '눈누 난나체',
    font: '',
  },
];

const MainPhotoInput = () => {
  const { register } = useFormContext();
  return (
    <div className='flex flex-col justify-center items-center'>
      <h2 className='text-2xl font-bold text-black'>청첩장 대표 사진</h2>
      <div className='flex gap-4'>
        <label>이름</label>
        <input
          type='text'
          placeholder='좌측'
          {...register('mainPhotoInfo.groom.leftName')}
          className='h-[32px] w-[92px] pl-[8px] py-[9px] border text-[12px] rounded-[8px]'
        />
        <input
          type='text'
          placeholder='♥︎'
          {...register('mainPhotoInfo.groom.icon')}
          className='h-[32px] w-[40px] pl-[8px] py-[9px] border text-[12px] rounded-[8px] placeholder:text-center'
        />
        <input
          type='text'
          placeholder='우측'
          {...register('mainPhotoInfo.groom.rightName')}
          className='h-[32px] w-[92px] pl-[8px] py-[9px] border text-[12px] rounded-[8px]'
        />
      </div>
      <div className='flex gap-4 '>
        <label>글꼴</label>
        <div className='grid grid-cols-2 gap-4 '>
          {FONTMENU.map((font) => (
            <button className='p-2 text-black bg-gray-100 hover:bg-primary300 hover:text-white rounded-full font-bold'>
              {font.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainPhotoInput;
