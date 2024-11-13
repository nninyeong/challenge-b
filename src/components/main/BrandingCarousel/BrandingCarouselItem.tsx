const BrandingCarouselItem = ({ src, description }: { src: string; description: string }) => {
  return (
    <div className='relative w-full desktop:h-[588px] h-full flex-shrink-0'>
      <img
        className='w-full h-full object-cover object-top'
        src={src}
        alt={description}
      />
      <div
        className='absolute bottom-0 w-full desktop:h-[278px] mobile:h-[134px]'
        style={{ background: 'linear-gradient(181deg, rgba(0, 0, 0, 0.00) 7.02%, rgba(0, 0, 0, 0.90) 99.4%)' }}
      ></div>
      <p className='absolute bottom-[32px] desktop:bottom-[80px] ml-[40px] desktop:ml-[152px] text-[28px] desktop:text-[48px] leading-[120%] text-white font-semibold whitespace-pre-line'>
        {description}
      </p>
    </div>
  );
};

export default BrandingCarouselItem;
