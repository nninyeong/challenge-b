'use client';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import useSignOut from '@/hooks/auth/useSignOut';

const Navigation = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  const { handleSignOut } = useSignOut();

  return (
    <div>
      <Link href='/review'>후기</Link>
      {isAuthenticated ? (
        <>
          <Link href='/mypage'>마이페이지</Link>
          <button onClick={handleSignOut}>로그아웃</button>
        </>
      ) : (
        <Link href='/signin'>로그인</Link>
      )}
    </div>
  );
};

export default Navigation;
