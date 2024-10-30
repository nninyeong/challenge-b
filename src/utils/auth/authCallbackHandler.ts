import browserClient from '../supabase/client';
import { saveSessionDataToSupabase } from '../sessionStorage/saveSessionDataToSupabase';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export const handleAuthCallback = async (router: AppRouterInstance) => {
  const searchParams = new URLSearchParams(window.location.search);
  const from = searchParams.get('from');

  const { data } = await browserClient.auth.getUser();
  const userId = data?.user?.id;

  if (userId && (from === 'google' || from === 'kakao')) {
    await saveSessionDataToSupabase(browserClient, userId);
  }

  router.replace('/');
};
