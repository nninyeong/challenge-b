'use client';
import BrandingCarouselItem from '@/components/main/BrandingCarousel/BrandingCarouselItem';
import useCarousel from '@/hooks/ui/useCarousel';

const CAROUSEL_ITEM_PROPS = [
  {
    mobileSrc: '/assets/images/branding/main-mockup-3.webp',
    desktopSrc: '/assets/images/branding/desktop-main-mockup-3.webp',
    mobileDescription: `드림카드로 특별한\n초대, 참석 여부도 손쉽게`,
    desktopDescription: `드림카드로 특별한 초대,\n참석 여부도 손쉽게`,
  },
  {
    mobileSrc: '/assets/images/branding/main-mockup-1.webp',
    desktopSrc: '/assets/images/branding/desktop-main-mockup-1.webp',
    mobileDescription: `소중한 기억을 위한 맞춤형\n청첩장, 드림카드와 함께`,
    desktopDescription: `소중한 기억을 위한 맞춤형\n청첩장, 드림카드와 함께`,
  },
  {
    mobileSrc: '/assets/images/branding/main-mockup-2.webp',
    desktopSrc: '/assets/images/branding/desktop-main-mockup-2.webp',
    mobileDescription: `드림카드로 완성하는\n당신만의 특별한 무드`,
    desktopDescription: `드림카드로 특별한 초대,\n참석 여부도 손쉽게`,
  },
];

const BrandingCarousel = () => {
  const { currentIndex, isTransitioning } = useCarousel(CAROUSEL_ITEM_PROPS.length, 3000, 500);

  return (
    <div className='relative overflow-hidden w-full desktop:h-[588px] mobile:h-[384px] mb-[56px] bg-black'>
      <div
        className={`desktop:hidden flex ${isTransitioning && 'transition-transform duration-500'}`}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {[
          <BrandingCarouselItem
            src={CAROUSEL_ITEM_PROPS[CAROUSEL_ITEM_PROPS.length - 1].mobileSrc}
            description={CAROUSEL_ITEM_PROPS[CAROUSEL_ITEM_PROPS.length - 1].mobileDescription}
          />,
          ...CAROUSEL_ITEM_PROPS.map((item) => (
            <BrandingCarouselItem
              key={`$carousel-${item}`}
              src={item.mobileSrc}
              description={item.mobileDescription}
            />
          )),
          <BrandingCarouselItem
            src={CAROUSEL_ITEM_PROPS[0].mobileSrc}
            description={CAROUSEL_ITEM_PROPS[0].mobileDescription}
          />,
        ]}
      </div>
      <div
        className={`hidden desktop:flex ${isTransitioning && 'transition-transform duration-500'}`}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {[
          <BrandingCarouselItem
            src={CAROUSEL_ITEM_PROPS[CAROUSEL_ITEM_PROPS.length - 1].desktopSrc}
            description={CAROUSEL_ITEM_PROPS[CAROUSEL_ITEM_PROPS.length - 1].desktopDescription}
          />,
          ...CAROUSEL_ITEM_PROPS.map((item) => (
            <BrandingCarouselItem
              key={`$carousel-${item}`}
              src={item.desktopSrc}
              description={item.desktopDescription}
            />
          )),
          <BrandingCarouselItem
            src={CAROUSEL_ITEM_PROPS[0].desktopSrc}
            description={CAROUSEL_ITEM_PROPS[0].desktopDescription}
          />,
        ]}
      </div>
      <div className='absolute bottom-4 desktop:bottom-[40px] left-1/2 transform -translate-x-1/2 w-[294px] desktop:w-[1136px] h-[2px] desktop:h-[4px] bg-gray-400 z-50'>
        <div
          style={{
            transform: `translateX(${((currentIndex + 1) % CAROUSEL_ITEM_PROPS.length) * 98}px)`,
          }}
          className='desktop:hidden w-[98px] h-full bg-white'
        ></div>
        <div
          style={{
            transform: `translateX(${((currentIndex + 1) % CAROUSEL_ITEM_PROPS.length) * 378}px)`,
          }}
          className='hidden desktop:block w-[378px] h-full bg-white'
        ></div>
      </div>
    </div>
  );
};

export default BrandingCarousel;
