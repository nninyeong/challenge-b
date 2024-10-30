'use client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import ReviewsCarousel from '@/components/main/ReviewsCarousel';
import { handleAuthCallback } from '@/utils/auth/authCallbackHandler';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    handleAuthCallback(router);
  }, []);

  return <ReviewsCarousel />;
}
