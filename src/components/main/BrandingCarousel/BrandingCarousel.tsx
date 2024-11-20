'use client';
import BrandingCarouselItem from '@/components/main/BrandingCarousel/BrandingCarouselItem';
import useCarousel from '@/hooks/ui/useCarousel';
import { useMemo, useRef } from 'react';

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
    desktopDescription: `드림카드로 완성하는\n당신만의 특별한 무드`,
  },
];

const BrandingCarousel = () => {
  const { currentIndex, isTransitioning } = useCarousel(CAROUSEL_ITEM_PROPS.length, 2700, 500);
  const indicatorBackgroundRef = useRef<HTMLDivElement | null>(null);
  const indicatorWidth = useMemo(
    () => (indicatorBackgroundRef.current?.offsetWidth ?? 0) / 3,
    [indicatorBackgroundRef.current?.offsetWidth],
  );

  return (
    <div className='relative overflow-hidden w-full aspect-square desktop:h-[588px] mb-[56px] bg-black'>
      <div
        className={`desktop:hidden flex ${isTransitioning && 'transition-transform duration-500'}`}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {[
          <BrandingCarouselItem
            key='mobile-carousel-index-0'
            src={CAROUSEL_ITEM_PROPS[CAROUSEL_ITEM_PROPS.length - 1].mobileSrc}
            description={CAROUSEL_ITEM_PROPS[CAROUSEL_ITEM_PROPS.length - 1].mobileDescription}
          />,
          ...CAROUSEL_ITEM_PROPS.map((item) => (
            <BrandingCarouselItem
              key={`mobile-carousel-${item.mobileSrc}`}
              src={item.mobileSrc}
              description={item.mobileDescription}
            />
          )),
          <BrandingCarouselItem
            key='mobile-carousel-index-last'
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
            key='desktop-carousel-index-0'
            src={CAROUSEL_ITEM_PROPS[CAROUSEL_ITEM_PROPS.length - 1].desktopSrc}
            description={CAROUSEL_ITEM_PROPS[CAROUSEL_ITEM_PROPS.length - 1].desktopDescription}
          />,
          ...CAROUSEL_ITEM_PROPS.map((item) => (
            <BrandingCarouselItem
              key={`desktop-carousel-${item.desktopSrc}`}
              src={item.desktopSrc}
              description={item.desktopDescription}
            />
          )),
          <BrandingCarouselItem
            key='desktop-carousel-index-last'
            src={CAROUSEL_ITEM_PROPS[0].desktopSrc}
            description={CAROUSEL_ITEM_PROPS[0].desktopDescription}
          />,
        ]}
      </div>
      <div
        ref={indicatorBackgroundRef}
        className='absolute bottom-4 desktop:bottom-[40px] left-1/2 transform -translate-x-1/2 w-[90%] mobile:w-[294px] desktop:w-[1136px] h-[2px] desktop:h-[4px] bg-gray-400 z-40'
      >
        <div
          style={{
            transform: `translateX(${((currentIndex + 1) % CAROUSEL_ITEM_PROPS.length) * (indicatorWidth ?? 0)}px)`,
          }}
          className='w-[34%] h-full bg-white'
        ></div>
      </div>
    </div>
  );
};

export default BrandingCarousel;
