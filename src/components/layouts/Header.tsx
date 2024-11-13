import { getIsLogin } from '@/utils/supabase/server';
import Navigation from '@/components/layouts/Navigation';
import Link from 'next/link';

const Header = async () => {
  const isAuthenticated = await getIsLogin();

  return (
    <header className='w-full h-[64px] desktop:h-[86px] flex justify-between items-center px-[16px] desktop:px-[152px] bg-white'>
      <Link href='/'>
        <img
          src='/assets/images/branding/BI.webp'
          alt='드림카드'
          className='w-[97px] desktop:w-[143px]'
        />
      </Link>
      <Navigation initialAuthState={isAuthenticated} />
    </header>
  );
};

export default Header;
