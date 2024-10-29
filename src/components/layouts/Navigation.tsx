'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

const Navigation = ({ initialAuthState }: { initialAuthState: boolean }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(initialAuthState);
  const client = createClient();

  useEffect(() => {
    const { data: authListener } = client.auth.onAuthStateChange((event) => {
      if (event === 'SIGNED_IN') {
        setIsAuthenticated(true);
      } else if (event === 'SIGNED_OUT') {
        setIsAuthenticated(false);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [client]);

  return (
    <nav className='flex gap-3'>
      <Link href='/review'>후기</Link>
      {isAuthenticated ? (
        <>
          <Link href='/mypage'>마이페이지</Link>
        </>
      ) : (
        <Link href='/signin'>로그인</Link>
      )}
    </nav>
  );
};

export default Navigation;
