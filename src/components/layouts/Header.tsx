import { getIsLogin } from '@/utils/supabase/server';
import Navigation from '@/components/layouts/Navigation';
import Link from 'next/link';

const Header = async () => {
  const isAuthenticated = await getIsLogin();

  return (
    <header className='w-full h-[64px] flex justify-between items-center px-[16px]'>
      <Link href='/'>
        <img src='/assets/images/branding/logoWithName.svg' />
      </Link>
      <Navigation initialAuthState={isAuthenticated} />
    </header>
  );
};

export default Header;
