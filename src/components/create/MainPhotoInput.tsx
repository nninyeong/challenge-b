'use client';
import { useFormContext } from 'react-hook-form';
import TextEditor from './TextEditor';
import { MainPhotoType } from '@/types/invitationFormType.type';
// import { postMainImg } from '@/utils/invitationUploadImg';
import { FaPlus } from 'react-icons/fa6';

const FONTMENU = [
  { name: '나눔손글씨', font: '' },
  { name: '카페24 아네모네', font: '' },
  { name: '제주고딕', font: '' },
  { name: '배달의민족 도현체', font: '' },
  { name: '에스코어 드림', font: '' },
  { name: '눈누 난나체', font: '' },
];

const MainPhotoInput = () => {
  const { register, watch, setValue } = useFormContext();
  const introduceContent = watch('mainPhotoInfo.introduceContent');

  const onSubmit = async (data: MainPhotoType) => {
    const mainPhotoInfo = {
      leftName: data.leftName,
      rightName: data.rightName,
      icon: data.icon,
      introduceContent: data.introduceContent,
      imageUrl: data.imageUrl,
    };

    // await postMainImg(mainPhotoInfo);
  };

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
    <div className='flex flex-col justify-center'>
      <div className='flex flex-col gap-2 justify-center'>
        <h2 className='text-xl font-bold text-black text-center'>청첩장 대표 사진</h2>

        <div className='flex gap-4 justify-center items-center'>
          <label className='font-bold text-black'>이름</label>
          <div className='gap-4 flex justify-center items-center'>
            <input
              type='text'
              placeholder='좌측'
              {...register('mainPhotoInfo.leftName')}
              className='h-[32px] w-[92px] pl-[8px] py-[9px] border text-[12px] rounded-[8px] text-black'
            />
            <input
              type='text'
              placeholder='♥︎'
              {...register('mainPhotoInfo.icon')}
              className='h-[32px] w-[42px] pl-4 pr-4 border text-[12px] rounded-[8px] placeholder:text-center text-black'
            />
            <input
              type='text'
              placeholder='우측'
              {...register('mainPhotoInfo.rightName')}
              className='h-[32px] w-[92px] pl-[8px] py-[9px] border text-[12px] rounded-[8px] text-black'
            />
          </div>
        </div>

        <div className='flex gap-4 justify-center'>
          <label className='font-bold text-black '>글꼴</label>
          <div className='grid grid-cols-2 gap-1'>
            {FONTMENU.map((font) => (
              <div
                key={font.name}
                className='p-1 text-black bg-gray-100 hover:bg-primary300 hover:text-white rounded-md font-bold text-center cursor-pointer'
              >
                {font.name}
              </div>
            ))}
          </div>
        </div>

        <div className='w-full h-[80px] flex gap-4 justify-center items-center mt-2'>
          <label
            htmlFor='file'
            className='bg-gray-200 text-center cursor-pointer px-2 py-1 rounded-md text-black h-[100px] w-[100px] flex justify-center items-center'
          >
            <FaPlus size={30} />
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
            onChange={(value) => setValue('mainPhotoInfo.introduceContent', value)} // 수정된 부분
          />
        </div>
      </div>
    </div>
  );
};

export default MainPhotoInput;
