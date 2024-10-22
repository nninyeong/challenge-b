'use client';

import { createClient } from '@/utils/supabase/client';
const SignInPage = () => {
  const client = createClient();
  const handleGoogleSignIn = () => {
    client.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.origin + '/auth/callback',
      },
    });
  };

  const handleKakaoSignIn = async () => {
    await client.auth.signInWithOAuth({
      provider: 'kakao',
      options: {
        redirectTo: window.origin + '/auth/callback',
      },
    });
  };

  return (
    <div>
      <button onClick={handleGoogleSignIn}>구글 로그인</button>
      <button onClick={handleKakaoSignIn}>카카오 로그인</button>
    </div>
  );
};

export default SignInPage;
