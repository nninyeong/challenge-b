import { useMutation, useQueryClient } from '@tanstack/react-query';
import browserClient from '@/utils/supabase/client';
import { QUERY_KEYS } from '../queries/queryKeys';

const useAddGuestBookEntry = ({ invitationId, onSuccess }: { invitationId: string; onSuccess: () => void }) => {
  const queryClient = useQueryClient();

  const insertGuestBook = async (name: string, password: string, content: string) => {
    const { error } = await browserClient.from('guestbook').insert([
      {
        invitation_id: invitationId,
        name,
        password,
        content,
      },
    ]);

    if (error) {
      throw new Error('Error inserting guest book entry');
    }
  };

  return useMutation({
    mutationFn: (data: { name: string; password: string; content: string }) =>
      insertGuestBook(data.name, data.password, data.content),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.guestBook(invitationId),
      });
      alert('방명록이 작성되었습니다.');
      onSuccess();
    },
    onError: (error: Error) => {
      console.error(error.message);
      alert('방명록을 저장하는 중 오류가 발생했습니다.');
    },
  });
};

export default useAddGuestBookEntry;
