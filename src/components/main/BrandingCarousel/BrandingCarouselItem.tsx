const BrandingCarouselItem = ({ src, description }: { src: string; description: string }) => {
  return (
    <div className='relative w-full h-full'>
      <img
        className='w-full h-full'
        src={src}
        alt={description}
      />
      <div
        className='absolute bottom-0 w-full h-[134px] rounded-[12px]'
        style={{ background: 'linear-gradient(181deg, rgba(0, 0, 0, 0.00) 7.02%, rgba(0, 0, 0, 0.90) 99.4%)' }}
      ></div>
      <p className='absolute left-[24px] bottom-[32px] w-[249px] text-[28px] text-white font-bold whitespace-pre-line'>
        {description}
      </p>
    </div>
  );
};

export default BrandingCarouselItem;
