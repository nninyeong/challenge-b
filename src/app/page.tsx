'use client';
import { saveSessionDataToSupabase } from '@/utils/sessionStorage/sessionStorage';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import ReviewsCarousel from '@/components/main/ReviewsCarousel';

export default function Home() {
  const client = createClient();
  const router = useRouter();

  useEffect(() => {
    const handleAuthCallback = async () => {
      const searchParams = new URLSearchParams(window.location.search);
      const from = searchParams.get('from');
      const { data } = await client.auth.getUser();
      const userId = data?.user?.id;

      if (userId && (from === 'google' || from === 'kakao')) {
        await saveSessionDataToSupabase(client, userId);
      }

      router.replace('/');
    };

    handleAuthCallback();
  }, [router]);

  return <ReviewsCarousel />;
}
