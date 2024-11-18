import Image from 'next/image';

const BrandingCarouselItem = ({ src, description }: { src: string; description: string }) => {
  return (
    <div className='relative w-full aspect-square desktop:h-[588px] flex-shrink-0'>
      <Image
        className='w-full h-full object-cover object-top'
        src={src}
        alt={description}
        priority
        fill
      />
      <div
        className='absolute bottom-0 w-full h-[134px] desktop:h-[278px]'
        style={{ background: 'linear-gradient(181deg, rgba(0, 0, 0, 0.00) 7.02%, rgba(0, 0, 0, 0.90) 99.4%)' }}
      ></div>
      <p className='absolute bottom-[32px] desktop:bottom-[80px] ml-[10%] mobile:ml-[40px] desktop:ml-[152px] text-[20px] mobile:text-[28px] desktop:text-[48px] leading-[120%] text-white font-semibold whitespace-pre-line font-semibold'>
        {description}
      </p>
    </div>
  );
};

export default BrandingCarouselItem;
