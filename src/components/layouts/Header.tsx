import { createClient } from '@/utils/supabase/server';
import Navigation from '@/components/layouts/Navigation';

const Header = async () => {
  const client = createClient();
  const { data } = await client.auth.getUser();

  let isAuthenticated = false;
  if (data.user) {
    isAuthenticated = true;
  }

  return (
    <header>
      <Navigation isAuthenticated={isAuthenticated} />
    </header>
  );
};

export default Header;
