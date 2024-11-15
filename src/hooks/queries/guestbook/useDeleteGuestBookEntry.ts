import { useMutation, useQueryClient } from '@tanstack/react-query';
import browserClient from '@/utils/supabase/client';
import { QUERY_KEYS } from '../queryKeys';
import { Notify } from 'notiflix';

const useDeleteGuestBookEntry = (
  invitationId: string,
  id: string | null,
  signedPassword: string | null,
  onSuccess: () => void,
  thisPage: number
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
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.guestBook(invitationId, thisPage),
      });
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
