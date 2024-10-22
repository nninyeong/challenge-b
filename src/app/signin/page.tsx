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
    <div className='flex flex-col items-center'>
      <div className='bg-amber-300 w-[88px] h-[88px] my-[80px]'>로고</div>
      <section className='flex flex-col items-center gap-[16px] w-full'>
        <button
          className='w-full h-[56px] border rounded'
          onClick={handleKakaoSignIn}
        >
          카카오로 시작하기
        </button>
        <button
          className='w-full h-[56px] border rounded'
          onClick={handleGoogleSignIn}
        >
          구글로 시작하기
        </button>
        <p>또는</p>
        <button
          className='w-full h-[56px] border rounded'
          onClick={() => alert('아직 준비중인 기능입니다')}
        >
          이메일로 시작하기
        </button>
      </section>
    </div>
  );
};

export default SignInPage;
