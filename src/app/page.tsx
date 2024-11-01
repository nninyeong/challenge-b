'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import ReviewsCarousel from '@/components/main/ReviewsCarousel';
import LinkToCreateCard from '@/components/ui/LinkToCreateCard';
import FixedQuickLink from '@/components/ui/FixedQuickLink';
import Gallery from '@/components/main/Gallery';
import MoodKeyword from '@/components/main/MoodKeyword';
import { handleAuthCallback } from '@/utils/auth/authCallbackHandler';
import { Notify } from 'notiflix';

Notify.init({
  backOverlay: false,
  useIcon: false,
  borderRadius: '20px',
  position: 'center-bottom',
  distance: '50px',
  cssAnimationDuration: 200,
  fontFamily: 'Main',
  fontSize: '16px',
  success: {
    background: 'rgba(64, 64, 64, 0.8)',
  },
});

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    handleAuthCallback(router);
  }, []);

  return (
    <div className='items-center px-[16px] h-full'>
      <FixedQuickLink />
      <div className='relative bg-gray-300 w-[343px] h-[328px] mx-auto mb-[56px]'>
        소개화면 영역
        <LinkToCreateCard buttonStyle='absolute right-[8px] bottom-[8px]' />
      </div>
      <Gallery />
      <MoodKeyword />
      <ReviewsCarousel />
    </div>
  );
}
