'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import ReviewCarousel from '@/components/main/ReviewCarousel';
import FixedQuickLink from '@/components/ui/FixedQuickLink';
import Gallery from '@/components/main/Gallery';
import MoodKeyword from '@/components/main/MoodKeyword';
import { handleAuthCallback } from '@/utils/auth/authCallbackHandler';
import BrandingCarousel from '@/components/main/BrandingCarousel/BrandingCarousel';
import MainFaqList from '@/components/main/MainFaqList';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    handleAuthCallback(router);
  }, []);

  return (
    <div className='items-center h-full'>
      <FixedQuickLink />
      <BrandingCarousel />
      <div className='desktop:px-[152px] mobile:px-[16px] desktop:mb-[108px] mb-[96px]'>
        <Gallery />
        <MoodKeyword />
        <ReviewCarousel />
        <MainFaqList />
      </div>
    </div>
  );
}
