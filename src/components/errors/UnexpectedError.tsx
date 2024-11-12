import { MOBILE_VIEW_HEIGHT } from '@/constants/screenSize';
import Button from '@/components/ui/Button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const UnexpectedError = ({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) => {
  const { refresh } = useRouter();

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
      <p className='text-[16px] font-bold text-gray-700'>에러가 발생했습니다: {error.message}</p>
      <div className='flex items-center gap-[8px]'>
        <Button
          className='w-[152px] h-[40px] mt-[16px] rounded-[12px] text-[16px] font-bold'
          onClick={() => {
            reset();
            refresh();
          }}
        >
          다시 시도하기
        </Button>
        <Link href='/'>
          <button className='w-[152px] h-[40px] mt-[16px] rounded-[12px] text-[16px] text-gray-700 font-bold border border-primary-300'>
            홈으로 돌아가기
          </button>
        </Link>
      </div>
    </div>
  );
};

export default UnexpectedError;
