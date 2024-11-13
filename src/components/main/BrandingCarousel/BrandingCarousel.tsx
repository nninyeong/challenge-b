import { useCallback, useEffect, useState } from 'react';
import BrandingCarouselItem from '@/components/main/BrandingCarousel/BrandingCarouselItem';

const MOCKUP_NUMBER = 3;
const BrandingCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(true);

  const moveCarousel = useCallback(() => {
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  }, []);

  useEffect(() => {
    const timerId = setInterval(() => {
      moveCarousel();
    }, 3000);

    return () => clearInterval(timerId);
  }, [currentIndex, moveCarousel]);

  useEffect(() => {
    let timerId: NodeJS.Timeout;

    if (currentIndex === 0) {
      timerId = setTimeout(() => {
        setCurrentIndex(MOCKUP_NUMBER);
        setIsTransitioning(false);
      }, 500);
    } else if (currentIndex === MOCKUP_NUMBER + 1) {
      timerId = setTimeout(() => {
        setCurrentIndex(1);
        setIsTransitioning(false);
      }, 500);
    }

    return () => clearTimeout(timerId);
  }, [currentIndex]);

  return (
    <div className='relative overflow-hidden w-full desktop:h-[588px] mobile:h-[384px] mb-[56px] bg-black'>
      <div
        className={`desktop:hidden flex ${isTransitioning && 'transition-transform duration-500'}`}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        <BrandingCarouselItem
          src='/assets/images/branding/main-mockup-3.webp'
          description={`드림카드로 특별한\n초대, 참석 여부도 손쉽게`}
        />
        <BrandingCarouselItem
          src='/assets/images/branding/main-mockup-1.webp'
          description={`소중한 기억을 위한 맞춤형\n청첩장, 드림카드와 함께`}
        />
        <BrandingCarouselItem
          src='/assets/images/branding/main-mockup-2.webp'
          description={`드림카드로 완성하는\n당신만의 특별한 무드`}
        />
        <BrandingCarouselItem
          src='/assets/images/branding/main-mockup-3.webp'
          description={`드림카드로 특별한\n초대, 참석 여부도 손쉽게`}
        />
        <BrandingCarouselItem
          src='/assets/images/branding/main-mockup-1.webp'
          description={`소중한 기억을 위한 맞춤형\n청첩장, 드림카드와 함께`}
        />
      </div>
      <div
        className={`hidden desktop:flex ${isTransitioning && 'transition-transform duration-500'}`}
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        <BrandingCarouselItem
          src='/assets/images/branding/desktop-main-mockup-3.webp'
          description={`드림카드로 특별한 초대,\n참석 여부도 손쉽게`}
        />
        <BrandingCarouselItem
          src='/assets/images/branding/desktop-main-mockup-1.webp'
          description={`소중한 기억을 위한\n 맞춤형 청첩장, 드림카드와 함께`}
        />
        <BrandingCarouselItem
          src='/assets/images/branding/desktop-main-mockup-2.webp'
          description={`드림카드로 완성하는\n당신만의 특별한 무드`}
        />
        <BrandingCarouselItem
          src='/assets/images/branding/desktop-main-mockup-3.webp'
          description={`드림카드로 특별한 초대,\n참석 여부도 손쉽게`}
        />
        <BrandingCarouselItem
          src='/assets/images/branding/desktop-main-mockup-1.webp'
          description={`소중한 기억을 위한\n 맞춤형 청첩장, 드림카드와 함께`}
        />
      </div>
      <div className='absolute bottom-4 desktop:bottom-[40px] left-1/2 transform -translate-x-1/2 w-[294px] desktop:w-[1136px] h-[2px] desktop:h-[4px] bg-gray-400 z-50'>
        <div
          style={{
            transform: `translateX(${((currentIndex - 1) % MOCKUP_NUMBER) * 98}px)`,
          }}
          className='desktop:hidden w-[98px] h-full bg-white'
        ></div>
        <div
          style={{
            transform: `translateX(${((currentIndex - 1) % MOCKUP_NUMBER) * 378}px)`,
          }}
          className='hidden desktop:block w-[378px] h-full bg-white'
        ></div>
      </div>
    </div>
  );
};

export default BrandingCarousel;
