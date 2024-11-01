'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import ReviewCarousel from '@/components/main/ReviewCarousel';
import LinkToCreateCard from '@/components/ui/LinkToCreateCard';
import FixedQuickLink from '@/components/ui/FixedQuickLink';
import Gallery from '@/components/main/Gallery';
import MoodKeyword from '@/components/main/MoodKeyword';
import { handleAuthCallback } from '@/utils/auth/authCallbackHandler';

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
      <ReviewCarousel />
    </div>
  );
}
