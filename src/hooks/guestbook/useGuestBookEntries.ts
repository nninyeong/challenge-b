import { useQuery } from '@tanstack/react-query';
import browserClient from '@/utils/supabase/client';
import { GuestBookEntry } from '@/types/guestBookEntry.types';
import { QUERY_KEYS } from '../queries/queryKeys';

const fetchGuestBook = async (invitationId: string): Promise<GuestBookEntry[]> => {
  const { data, error } = await browserClient
    .from('guestbook')
    .select('*')
    .eq('invitation_id', invitationId)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error('Error fetching guest book');
  }

  return data as GuestBookEntry[];
};

const useGuestBookEntries = (invitationId: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.guestBook(invitationId),
    queryFn: () => fetchGuestBook(invitationId),
  });
};

export default useGuestBookEntries;
