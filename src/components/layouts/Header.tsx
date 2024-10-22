import { createClient } from '@/utils/supabase/server';
import Navigation from '@/components/layouts/Navigation';
import Link from 'next/link';
import { UserData } from '@/types/supabaseMethod.types';

const Header = async () => {
  const client = createClient();
  const { data }: UserData = await client.auth.getUser();

  let isAuthenticated: boolean = false;
  if (data.user) {
    isAuthenticated = true;
  }

  return (
    <header className='w-full h-[64px] bg-gray-400 flex justify-around items-center'>
      <Link href='/'>BI</Link>
      <Navigation isAuthenticated={isAuthenticated} />
    </header>
  );
};

export default Header;
