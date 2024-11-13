import Carousel from './Carousel';

const ReviewCarousel = () => {
  return (
    <div className='flex flex-col desktop:gap-[56px] mobile:gap-[24px]'>
      <div>
        <h1 className='desktop:text-[36px] mobile:text-[20px] font-semibold'>드림카드 이용 후기</h1>
        <p className='desktop:text-[24px] mobile:text-[14px]'>To Speed up Your Creative Woreflow</p>
      </div>
      <Carousel />
    </div>
  );
};

export default ReviewCarousel;
