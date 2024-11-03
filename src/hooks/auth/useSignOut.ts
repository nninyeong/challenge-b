import { createClient } from '@/utils/supabase/client';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

const useSignOut = () => {
  const client = createClient();
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleSignOut = async () => {
    await client.auth.signOut();
    queryClient.clear();
    router.refresh();
  };

  return { handleSignOut };
};

export default useSignOut;
