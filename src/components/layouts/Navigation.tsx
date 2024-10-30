'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import LinkToMypage from '@/components/ui/LinkToMypage';
import LinkToReviewPage from '@/components/ui/LinkToReviewPage';

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
    <nav className='flex gap-3 justify-center items-center'>
      <LinkToReviewPage />
      {isAuthenticated ? (
        <>
          <LinkToMypage />
        </>
      ) : (
        <Link href='/signin'>
          <button className='bg-user-profile-02 w-[24px] h-[24px]' />
        </Link>
      )}
    </nav>
  );
};

export default Navigation;
