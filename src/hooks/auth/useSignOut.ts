import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

const useSignOut = () => {
  const client = createClient();
  const router = useRouter();

  const handleSignOut = async () => {
    await client.auth.signOut();
    router.refresh();
  };

  return { handleSignOut };
};

export default useSignOut;
