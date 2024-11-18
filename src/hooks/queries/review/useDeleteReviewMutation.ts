'use client';
import deleteMyReview from '@/utils/deleteMyReview';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Notify } from 'notiflix';
import { QUERY_KEYS } from '../queryKeys';

export const useDeleteReviewMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteMyReview(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.reviews() });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.userReview() });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.allImageReviews() });

      Notify.success('성공적으로 리뷰를 삭제했습니다.');
    },
    onError: () => {
      Notify.failure('리뷰를 삭제하지 못했습니다. 다시 시도해주세요');
    },
  });
};
