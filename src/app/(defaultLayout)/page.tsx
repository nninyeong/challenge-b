'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import ReviewCarousel from '@/components/main/ReviewCarousel';
import FixedQuickLink from '@/components/ui/FixedQuickLink';
import Gallery from '@/components/main/Gallery';
import MoodKeyword from '@/components/main/MoodKeyword';
import { handleAuthCallback } from '@/utils/auth/authCallbackHandler';
import BrandingCarouselItem from '@/components/main/BrandingCarousel/BrandingCarouselItem';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    handleAuthCallback(router);
  }, []);

  return (
    <div className='items-center h-full'>
      <FixedQuickLink />
      <div className='flex overflow-hidden w-full h-[384px] mb-[56px]'>
        <BrandingCarouselItem
          src='/assets/images/branding/main-mockup-1.webp'
          description={`소중한 기억을 위한 맞춤형\n청첩장, 드림카드와 함께`}
        />
        <BrandingCarouselItem
          src='/assets/images/branding/main-mockup-2.webp'
          description={`드림카드로 완성하\n당신만의 특별한 무드`}
        />
        <BrandingCarouselItem
          src='/assets/images/branding/main-mockup-3.webp'
          description={`드림카드로 특별한\n초대, 참석 여부도 손쉽게`}
        />
      </div>
      <div className='px-[16px] mb-[96px]'>
        <Gallery />
        <MoodKeyword />
        <ReviewCarousel />
      </div>
    </div>
  );
}
