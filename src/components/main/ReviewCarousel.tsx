import Carousel from './Carousel';

const ReviewCarousel = () => {
  return (
    <div className='flex flex-col desktop:gap-[56px] gap-[24px]'>
      <div>
        <h1 className='desktop:text-[36px] text-[20px] font-bold text-[#262626]'>드림카드 이용 후기</h1>
        <p className='desktop:text-[24px] text-[14px] font-medium text-[#595959]'>
          드림카드와 함께한 소중한 순간의 기록
        </p>
      </div>
      <Carousel />
    </div>
  );
};

export default ReviewCarousel;
