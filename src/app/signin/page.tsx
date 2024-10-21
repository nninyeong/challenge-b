'use client';

import { createClient } from '@/utils/supabase/client';

const SignInPage = () => {
  const client = createClient();

  const handleGoogleSignIn = () => {
    client.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'http://localhost:3000/auth/callback',
      },
    });
  };
  return (
    <div>
      <button onClick={handleGoogleSignIn}>구글 로그인</button>
    </div>
  );
};

export default SignInPage;
