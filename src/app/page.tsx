import Carousel from '@/components/main/Carousel';
import Link from 'next/link';

export default async function Home() {
  return (
    <div className='flex flex-col gap-[40px]'>
      <div className='flex  justify-between items-center'>
        <div>
          <h1 className='text-[20px] font-semibold'>- 서비스명 이용 후기</h1>
          <p className='text-[14px]'>To Speed up Your Creative Woreflow</p>
        </div>
        <Link
          href={'/review'}
          className='text-[16px] h-[32px] w-[80px] bg-gray-400 flex justify-center items-center rounded-full'
        >
          바로가기
        </Link>
      </div>
      <Carousel />
    </div>
  );
}
