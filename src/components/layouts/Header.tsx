import { getIsLogin } from '@/utils/supabase/server';
import Navigation from '@/components/layouts/Navigation';
import Link from 'next/link';

const Header = async () => {
  const isAuthenticated = await getIsLogin();

  return (
    <header className='w-[375px] h-[64px] flex justify-between items-center px-[16px] bg-white'>
      <Link href='/'>
        <img
          src='/assets/images/branding/logoWithName.svg'
          alt='드림카드 홈으로 이동'
        />
      </Link>
      <Navigation initialAuthState={isAuthenticated} />
    </header>
  );
};

export default Header;
