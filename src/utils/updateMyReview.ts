import { MutationReviewFormDataType } from '@/components/review/ReviewForm';
import browserClient from './supabase/client';

export const updateMyReview = async (mutationData: MutationReviewFormDataType, myReviewId: string | null) => {
  const { error } = await browserClient.from('reviews').update([mutationData]).eq('id', myReviewId!);
  if (error) {
    console.error(error);
  }
};
