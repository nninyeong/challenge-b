import { getIsLogin } from '@/utils/supabase/server';
import Navigation from '@/components/layouts/Navigation';

const Header = async () => {
  const isAuthenticated = await getIsLogin();

  return (
    <header>
      <Navigation initialAuthState={isAuthenticated} />
    </header>
  );
};

export default Header;
