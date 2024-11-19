import { getIsLogin } from '@/utils/supabase/server';
import Navigation from '@/components/layouts/Navigation';

type HeaderProps = {
  zIndex?: number;
};

const Header = async ({ zIndex }: HeaderProps) => {
  const isAuthenticated = await getIsLogin();

  return (
    <header>
      <Navigation
        initialAuthState={isAuthenticated}
        zIndex={zIndex}
      />
    </header>
  );
};

export default Header;
