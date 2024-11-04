import Carousel from './Carousel';

const ReviewCarousel = () => {
  return (
    <div className='flex flex-col gap-[40px]'>
      <div>
        <h1 className='text-[20px] font-semibold'>- 서비스명 이용 후기</h1>
        <p className='text-[14px]'>To Speed up Your Creative Woreflow</p>
      </div>
      <Carousel />
    </div>
  );
};

export default ReviewCarousel;
