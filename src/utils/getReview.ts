import { Review } from '@/types/review.types';
import browserClient from './supabase/client';

type ReviewProps = {
  pageParam: number;
  row: number;
};

export const getReview = async ({ pageParam = 0, row }: ReviewProps): Promise<Review[]> => {
  try {
    const { data, error } = await browserClient
      .from('reviews')
      .select('*')
      .range(pageParam, pageParam + row - 1);

    if (error) {
      console.error(error);
      throw new Error('데이터를 가져오는 데 문제가 발생했습니다.');
    }
    console.log(data);
    return data as unknown as Review[];
  } catch (error) {
    console.error(error);
    throw error;
  }
};
