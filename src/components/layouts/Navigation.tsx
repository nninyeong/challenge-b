'use client';
import Link from 'next/link';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

const Navigation = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  const client = createClient();
  const router = useRouter();

  const handleSignOut = async () => {
    await client.auth.signOut();
    router.refresh();
  };

  return (
    <div>
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
