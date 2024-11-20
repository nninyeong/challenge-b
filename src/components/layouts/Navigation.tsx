'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import LinkToMypage from '@/components/ui/LinkToMypage';
import LinkToReviewPage from '@/components/ui/LinkToReviewPage';
import { usePathname } from 'next/navigation';

const Navigation = ({ initialAuthState }: { initialAuthState: boolean }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(initialAuthState);
  const isCreateCardPage = usePathname() === '/create/card';
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
    <div
      className={`${isCreateCardPage ? 'hidden desktop:flex' : 'flex z-50'} fixed top-0 left-0 w-full h-[64px] desktop:h-[86px] justify-between items-center px-[16px] desktop:px-[152px] bg-white shadow-[0_10px_20px_rgba(0,0,0,0.1)]`}
    >
      <Link href='/'>
        <img
          src='/assets/images/branding/BI.webp'
          alt='드림카드'
          className='w-[97px] desktop:w-[143px]'
        />
      </Link>
      <nav className={`flex gap-3 desktop:gap-[24px] justify-center items-center`}>
        <LinkToReviewPage />
        {isAuthenticated ? (
          <>
            <LinkToMypage />
          </>
        ) : (
          <Link href='/signin'>
            <button className='bg-user-profile-02 w-[24px] h-[24px] bg-cover' />
          </Link>
        )}
      </nav>
    </div>
  );
};

export default Navigation;
