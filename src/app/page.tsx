import Carousel from '@/components/main/Carousel';

export default async function Home() {
  return (
    <div className='flex flex-col gap-[40px]'>
      <div className='flex'>
        <div>
          <h1 className='text-[20px]'>서비스명 이용 후기</h1>
          <p className='text-[14px]'>To Speed up Your Creative Woreflow</p>
        </div>
        <button className='text-[14px]'>바로가기</button>
      </div>
      <Carousel />
    </div>
  );
}
