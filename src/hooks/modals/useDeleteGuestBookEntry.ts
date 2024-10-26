import { useMutation, useQueryClient } from '@tanstack/react-query';
import browserClient from '@/utils/supabase/client';
import { QUERY_KEYS } from '../queries/queryKeys';

const useDeleteGuestBookEntry = (
  invitationId: string,
  id: string | null,
  signedPassword: string | null,
  onSuccess: () => void,
) => {
  const queryClient = useQueryClient();

  const deleteGuestBook = async (password: string) => {
    if (id === null || password !== signedPassword) {
      throw new Error('Invalid password or guest book ID');
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
        queryKey: QUERY_KEYS.guestBook(invitationId),
      });
      onSuccess();
      alert('방명록 삭제를 완료했습니다.');
    },
    onError: (error: Error) => {
      console.error(error.message);
      alert('방명록을 삭제하는 중 오류가 발생했습니다.');
    },
  });
};

export default useDeleteGuestBookEntry;
