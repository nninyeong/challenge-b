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
    <div className='items-center mt-[56px] px-[16px] h-full mb-[96px]'>
      <FixedQuickLink />
      <div className='relative w-[343px] h-[328px] rounded-[12px] mx-auto mb-[56px]'>
        <BrandingCarouselItem
          src='/assets/images/branding/mood-preset-01.png'
          description={`소중한 기억을 위한\n맞춤형 초대장,\n드림카드와 함께`}
        />
      </div>
      <Gallery />
      <MoodKeyword />
      <ReviewCarousel />
    </div>
  );
}
