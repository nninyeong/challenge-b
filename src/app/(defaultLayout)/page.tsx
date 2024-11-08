'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import ReviewCarousel from '@/components/main/ReviewCarousel';
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
    <div className='items-center mt-[56px] px-[16px] h-full mb-[96px]'>
      <FixedQuickLink />
      <div className='relative w-[343px] h-[328px] rounded-[12px] mx-auto mb-[56px] bg-mood-preset-01 bg-cover bg-no-repeat bg-center'>
        <div
          className='absolute bottom-0 w-full h-[134px] rounded-[12px]'
          style={{ background: 'linear-gradient(181deg, rgba(0, 0, 0, 0.00) 7.02%, rgba(0, 0, 0, 0.90) 99.4%)' }}
        ></div>
        <p className='absolute left-[24px] bottom-[32px] w-[249px] h-[68px] text-[28px] text-white font-bold'>
          To Speed up Your Creative Workflow
        </p>
      </div>
      <Gallery />
      <MoodKeyword />
      <ReviewCarousel />
    </div>
  );
}
