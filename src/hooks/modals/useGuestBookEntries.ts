import { useQuery } from '@tanstack/react-query';
import browserClient from '@/utils/supabase/client';
import { GuestBookEntry } from '@/types/guestBookEntry.types';
import { QUERY_KEYS } from '../queries/queryKeys';

const useGuestBookEntries = (invitationId: string) => {
  const fetchGuestBook = async (): Promise<GuestBookEntry[]> => {
    const { data, error } = await browserClient.from('guestbook').select('*').eq('invitation_id', invitationId);

    if (error) {
      throw new Error('Error fetching guest book');
    }

    return data as GuestBookEntry[];
  };

  return useQuery({
    queryKey: QUERY_KEYS.guestBook(invitationId),
    queryFn: fetchGuestBook,
  });
};

export default useGuestBookEntries;
