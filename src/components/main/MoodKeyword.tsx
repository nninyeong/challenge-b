import { MOOD_LIST } from '@/constants/invitationMoods';
import Image from 'next/image';

const MoodKeyword = () => {
  const placeholderImg = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6c3aYUkJ6HhXVkwqnenl9C4xGHtrvCSrZQQ&s';

  return (
    <div className='mb-[56px]'>
      <div className='mb-[24px]'>
        <h1 className='text-[20px] font-semibold'>원하는 무드가 담긴 나만의 청접장</h1>
        <p className='text-[14px]'>예비 신랑, 신부님의 분위기에 맞게 커스터마이징 해요!</p>
      </div>

      <div className='flex flex-col justify-center items-center gap-[16px]'>
        <div className='flex justify-around space-x-[8px] w-full overflow-x-auto scrollbar-hidden'>
          {MOOD_LIST.map((mood) => (
            <p
              key={mood.category}
              className='flex-shrink-0 px-[12px] py-[4px] bg-primary300 text-white rounded-full min-w-[100px] text-center'
            >
              {mood.label}
            </p>
          ))}
        </div>

        <div className='relative h-[296px] w-[343px] mt-[16px] rounded-lg overflow-hidden'>
          <Image
            src={placeholderImg}
            alt='무드에 맞는 청첩장 이미지'
            layout='fill'
            objectFit='cover'
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default MoodKeyword;
