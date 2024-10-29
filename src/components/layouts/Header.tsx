import { getIsLogin } from '@/utils/supabase/server';
import Navigation from '@/components/layouts/Navigation';
import Link from 'next/link';

const Header = async () => {
  const isAuthenticated = await getIsLogin();

  console.log(isAuthenticated);

  // if (data?.session?.user.id) {
  //   await saveSessionDataToSupabase(client, data?.session?.user.id);
  // }
  return (
    <header className='w-full h-[64px] bg-gray-400 flex justify-around items-center'>
      <Link href='/'>BI</Link>
      <Navigation initialAuthState={isAuthenticated} />
    </header>
  );
};

export default Header;
