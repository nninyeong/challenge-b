import { SupabaseClient } from '@supabase/supabase-js';
import { createClient } from '@/utils/supabase/client';
import { Notify } from 'notiflix';

const client: SupabaseClient = createClient();

export const handleGoogleSignIn: () => Promise<void> = async () => {
  try {
    await client.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.origin + '/auth/callback?from=google',
      },
    });
  } catch (error) {
    console.error('Google login failed: ', error);
    Notify.failure('구글 로그인에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.');
  }
};

export const handleKakaoSignIn: () => Promise<void> = async () => {
  try {
    await client.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        redirectTo: window.origin + '/auth/callback?from=kakao',
      },
    });
  } catch (error) {
    console.error('Kakao signIn failed: ', error);
    Notify.failure('카카오 로그인에 문제가 발생했습니다. 잠시 후 다시 시도해주세요. ');
  }
};
