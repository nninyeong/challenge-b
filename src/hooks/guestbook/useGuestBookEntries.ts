import { useQuery } from '@tanstack/react-query';
import browserClient from '@/utils/supabase/client';
import { GuestBookEntry } from '@/types/guestBookEntry.types';
import { QUERY_KEYS } from '../queries/queryKeys';

const ITEMS_PER_PAGE = 6;

const fetchGuestBook = async (
  invitationId: string,
  page: number,
): Promise<{ data: GuestBookEntry[]; total: number }> => {
  const from = (page - 1) * ITEMS_PER_PAGE;
  const to = from + ITEMS_PER_PAGE - 1;

  const { data, error, count } = await browserClient
    .from('guestbook')
    .select('*', { count: 'exact' })
    .eq('invitation_id', invitationId)
    .order('created_at', { ascending: false })
    .range(from, to);

  if (error) {
    throw new Error('Error fetching guest book');
  }

  return { data: data as GuestBookEntry[], total: count ?? 0 };
};

const useGuestBookEntries = (invitationId: string, page: number) => {
  return useQuery({
    queryKey: QUERY_KEYS.guestBook(invitationId, page),
    queryFn: () => fetchGuestBook(invitationId, page),
  });
};

export default useGuestBookEntries;
