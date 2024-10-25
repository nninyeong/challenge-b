import { Review } from '@/types/review.types';
import browserClient from './supabase/client';
import { supabase } from './supabase/createClient';
import { UsersResponse } from '@/types/users.types';

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

export const getAllImageReviews = async (): Promise<Review[]> => {
  try {
    const { data, error } = await browserClient.from('reviews').select('*');

    if (error) {
      console.error(error);
      throw new Error('모든 데이터를 가져오는 데 문제가 발생했습니다.');
    }

    const reviewsWithImages = data.filter((review) => Array.isArray(review.image_url) && review.image_url.length > 0);

    console.log(reviewsWithImages);
    return reviewsWithImages as unknown as Review[];
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAuthUsersProfile = async () => {
  try {
    const { data } = await supabase.auth.admin.listUsers();

    // if (error) {
    //   console.error('Error fetching users:', error);
    //   return [];
    // }
    console.log(data);
    return data as unknown as UsersResponse;
  } catch (error) {
    console.error(error);
  }
};
