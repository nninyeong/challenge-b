import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '../queryKeys';
import { Notify } from 'notiflix';
import { addLike } from '@/utils/getReview';
import { removeLike } from '@/utils/getReview';
import { Review } from '@/types/review.types';

export const useAddLikeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ postId, userId }: { postId: string; userId: string }) => addLike({ postId, userId }),

    onMutate: async ({ postId, userId }) => {
      // 기존 데이터를 백업합니다.
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.reviews() });
      const previousReviews = queryClient.getQueryData<Review[]>(QUERY_KEYS.reviews());

      // 낙관적 업데이트로 UI를 미리 변경합니다.
      queryClient.setQueryData(QUERY_KEYS.reviews(), (oldReviews: Review[] | undefined) => {
        if (!oldReviews) return [];
        return oldReviews.map((review) => {
          if (review.id === postId) {
            const currentLikes = review.likes;
            // likes가 null, 빈 배열일 경우 빈 배열로 처리
            let updatedLikes = Array.isArray(currentLikes) ? [...currentLikes, userId] : [userId];
            // likes가 빈 배열인 경우를 처리
            if (currentLikes === null || (Array.isArray(currentLikes) && currentLikes.length === 0)) {
              updatedLikes = [userId];
            }
            return { ...review, likes: updatedLikes };
          }
          return review;
        });
      });

      // 기존 데이터를 롤백을 위해 반환합니다.
      return { previousReviews };
    },

    onError: (_error, _variables, context) => {
      // 서버 요청 실패 시 기존 데이터로 롤백합니다.
      if (context?.previousReviews) {
        queryClient.setQueryData(QUERY_KEYS.reviews(), context.previousReviews);
      }
      Notify.failure('도움돼요 추가에 실패했습니다. 다시 시도해주세요.');
    },

    onSuccess: () => {
      Notify.success('도움돼요가 추가되었습니다.');
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.reviews() });
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
