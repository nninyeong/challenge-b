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
      Notify.success('성공적으로 리뷰를 삭제했습니다.');
    },
  });
};
