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
    <div className='items-center mt-[59px] px-[16px] h-full'>
      <FixedQuickLink />
      <div className='relative w-[343px] h-[328px] rounded-[12px] mx-auto mb-[56px] bg-mood-preset-01 bg-cover bg-no-repeat bg-center'>
        <p className='absolute left-[24px] top-[36px] w-[249px] h-[68px] text-[28px] text-white font-bold'>
          To Speed up Your Creative Workflow
        </p>
        <LinkToCreateCard buttonStyle='absolute left-0 right-0 bottom-[24px] mx-auto px-[16px] py-[8px] w-fit h-[35px] tracking-[-0.032px] leading-[120%] flex justify-center items-center rounded-[24px] border border-white text-white text-[16px] font-bold bg-[#FF666666]/40 backdrop-blur-[5px]' />
      </div>
      <Gallery />
      <MoodKeyword />
      <ReviewCarousel />
    </div>
  );
}
