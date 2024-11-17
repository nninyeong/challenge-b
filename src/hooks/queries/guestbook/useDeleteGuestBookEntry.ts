import { useMutation, useQueryClient } from '@tanstack/react-query';
import browserClient from '@/utils/supabase/client';
import { QUERY_KEYS } from '../queryKeys';
import { Notify } from 'notiflix';
import { Dispatch, SetStateAction } from 'react';
import { fetchGuestBook } from './useGuestBookEntries';
import { GuestBookEntry } from '@/types/guestBookEntry.types';

const useDeleteGuestBookEntry = (
  invitationId: string,
  id: string | null,
  signedPassword: string | null,
  onSuccess: () => void,
  thisPage: number,
  setPage: Dispatch<SetStateAction<number>>,
  totalPages: number
) => {
  const queryClient = useQueryClient();

  const deleteGuestBook = async (password: string) => {
    if (id === null) {
      Notify.failure('유효하지 않은 요청입니다.');
      throw new Error('Invalid request: ID is null.');
    }

    if (password !== signedPassword) {
      Notify.failure('입력한 패스워드가 일치하지 않습니다.');
      throw new Error('Password mismatch.');
    }

    const { error } = await browserClient.from('guestbook').delete().eq('guestbook_id', id);
    if (error) {
      throw new Error('Error deleting guest book entry');
    }
  };

  return useMutation({
    mutationFn: (password: string) => deleteGuestBook(password),
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.guestBook(invitationId, thisPage),
      });

      const updatedData = queryClient.getQueryData<{ data: GuestBookEntry[]; total: number }>(
        QUERY_KEYS.guestBook(invitationId, thisPage),
      );

      const pagesToPrefetch = [];
      if (updatedData?.data.length === 0 && thisPage > 1) {
        pagesToPrefetch.push(thisPage - 1);
        setPage(thisPage - 1);
      }
      if (thisPage < totalPages) {
        pagesToPrefetch.push(thisPage + 1);
      }

      await Promise.all(
        pagesToPrefetch.map((page) =>
          queryClient.prefetchQuery({
            queryKey: QUERY_KEYS.guestBook(invitationId, page),
            queryFn: () => fetchGuestBook(invitationId, page),
          }),
        ),
      );

      onSuccess();
      Notify.success('방명록 삭제를 완료했습니다.');
    },
    onError: (error: Error) => {
      console.error(error.message);
      if (error.message !== 'Password mismatch.' && error.message !== 'Invalid request: ID is null.') {
        Notify.failure('방명록을 삭제하는 중 오류가 발생했습니다.');
      }
    },
  });
};

export default useDeleteGuestBookEntry;
