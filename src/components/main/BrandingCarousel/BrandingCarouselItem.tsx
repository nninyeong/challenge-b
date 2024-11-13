const BrandingCarouselItem = ({ src, description }: { src: string; description: string }) => {
  return (
    <div className='relative w-full h-full flex-shrink-0'>
      <img
        className='w-full h-full'
        src={src}
        alt={description}
      />
      <div
        className='absolute bottom-0 w-full h-[134px]'
        style={{ background: 'linear-gradient(181deg, rgba(0, 0, 0, 0.00) 7.02%, rgba(0, 0, 0, 0.90) 99.4%)' }}
      ></div>
      <p className='absolute bottom-[32px] mx-[40px] text-[28px] leading-[33.6px] text-white font-semibold whitespace-pre-line'>
        {description}
      </p>
    </div>
  );
};

export default BrandingCarouselItem;
