import { MutationReviewFormDataType } from '@/components/review/ReviewForm';
import { useReviewBottomSheetContext } from '@/provider/reviewBottomSheetProvider';
import { insertMyReview } from '@/utils/insertMyReview';
import { updateMyReview } from '@/utils/updateMyReview';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Notify } from 'notiflix';
import { QUERY_KEYS } from '../queryKeys';

export const useReviewMutation = () => {
  const queryClient = useQueryClient();
  const { setIsReviewBottomSheetOpen } = useReviewBottomSheetContext((state) => state);
  return useMutation({
    mutationFn: async ({
      mutationData,
      type,
      myReviewId,
    }: {
      mutationData: MutationReviewFormDataType;
      type: 'insert' | 'update';
      myReviewId: string | null;
    }) => {
      return type === 'insert' ? insertMyReview(mutationData) : updateMyReview(mutationData, myReviewId);
    },
    onSuccess: () => {
      setIsReviewBottomSheetOpen(false);
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.reviews() });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.userReview() });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.allImageReviews() });
      Notify.success('작성되었습니다.');
    },
  });
};
