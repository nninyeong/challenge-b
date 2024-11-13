export const CarouselLoading = () => {
  const loadingCardStyle =
    'desktop:w-[383px] desktop:h-[582px] mobile:w-[216px] mobile:h-[328px] rounded-2xl bg-gray-50';

  return (
    <div className='overflow-hidden flex justify-center w-full py-[10px]'>
      <div className='flex gap-[16px]'>
        <div className={loadingCardStyle} />
        <div className={loadingCardStyle} />
        <div className={loadingCardStyle} />
      </div>
    </div>
  );
};
