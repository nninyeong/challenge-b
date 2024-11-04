import { MutationReviewFormDataType } from '@/components/review/ReviewForm';
import { useReviewBottomSheetContext } from '@/provider/reviewBottomSheetProvider';
import { insertMyReview } from '@/utils/insertMyReview';
import { updateMyReview } from '@/utils/updateMyReview';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Notify } from 'notiflix';

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
      queryClient.invalidateQueries({ queryKey: ['reviews'] }); //TODO 소현님 브랜치 merge후 queryKey 분리 예정
      Notify.success('작성되었습니다.');
    },
  });
};
