import { MutationReviewFormDataType } from '@/components/review/ReviewForm';
import browserClient from './supabase/client';

export const insertMyReview = async (mutationData: MutationReviewFormDataType) => {
  const { error } = await browserClient.from('reviews').insert([mutationData]);
  if (error) {
    console.error(error);
  }
};
