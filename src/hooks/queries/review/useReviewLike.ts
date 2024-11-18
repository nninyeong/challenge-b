import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '../queryKeys';
import { Notify } from 'notiflix';
import { addLike } from '@/utils/getReview';
import { removeLike } from '@/utils/getReview';

export const useAddLikeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, userId }: { postId: string; userId: string }) => addLike({ postId, userId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.reviews() });
      Notify.success('도움돼요가 추가되었습니다.');
    },
    onError: () => {
      Notify.failure('도움돼요 추가에 실패했습니다. 다시 시도해주세요.');
    },
  });
};

export const useRemoveLikeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, userId }: { postId: string; userId: string }) => removeLike({ postId, userId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.reviews() });
      Notify.success('도움돼요가 취소되었습니다.');
    },
    onError: () => {
      Notify.failure('도움돼요 삭제에 실패했습니다. 다시 시도해주세요.');
    },
  });
};
