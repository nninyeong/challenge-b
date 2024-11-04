import { createClient } from '@/utils/supabase/client';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { QUERY_KEYS } from '../queries/queryKeys';
import useInvitationIdByPathname from '../invitation/useInvitationIdByPathname';

const useSignOut = () => {
  const client = createClient();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { invitationId } = useInvitationIdByPathname();

  const handleSignOut = async () => {
    await client.auth.signOut();
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.guestBook(invitationId) });
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.invitation() });
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.authUsers() });
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.invitationCard() });

    router.refresh();
  };

  return { handleSignOut };
};

export default useSignOut;
