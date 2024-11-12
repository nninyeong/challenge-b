import { MOBILE_VIEW_HEIGHT } from '@/constants/screenSize';
import Button from '@/components/ui/Button';
import Link from 'next/link';

const NotFound = () => {
  return (
    <div
      className={`w-full flex flex-col items-center justify-center`}
      style={{ height: MOBILE_VIEW_HEIGHT }}
    >
      <img
        src='/assets/images/card/noCard.webp'
        alt='not-found'
        className='w-[150px]'
      />
      <p className='text-[16px] font-bold text-gray-700'>존재하지 않는 페이지입니다.</p>
      <Link href='/'>
        <Button className='w-[152px] h-[40px] mt-[16px] rounded-[12px] text-[16px] font-bold'>홈으로 돌아가기</Button>
      </Link>
    </div>
  );
};

export default NotFound;
