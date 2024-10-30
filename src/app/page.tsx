'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import ReviewsCarousel from '@/components/main/ReviewsCarousel';
import { handleAuthCallback } from '@/utils/auth/authCallbackHandler';
import LinkToCreateCard from '@/components/ui/LinkToCreateCard';
import FixedQuickLink from '@/components/ui/FixedQuickLink';
import Gallery from '@/components/main/Gallery';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    handleAuthCallback(router);
  }, []);

  return (
    <div className='items-center px-[16px] h-full'>
      <FixedQuickLink />
      <div className='relative bg-gray-300 w-[343px] h-[328px] mx-auto'>
        소개화면 영역
        <LinkToCreateCard buttonStyle='absolute right-[8px] bottom-[8px]' />
      </div>
      <Gallery />
      <ReviewsCarousel />
    </div>
  );
}
