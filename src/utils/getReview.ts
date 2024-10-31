import { Review } from '@/types/review.types';
import browserClient from './supabase/client';
import { supabase } from './supabase/createClient';
import { UsersResponse } from '@/types/users.types';

type ReviewProps = {
  pageParam: number;
  row: number;
};

export const getReview = async ({ pageParam = 0, row }: ReviewProps): Promise<Review[]> => {
  const { data, error } = await browserClient
    .from('reviews')
    .select('*')
    .range(pageParam, pageParam + row - 1);

  if (error) {
    console.error(error);
  }

  return data as unknown as Review[];
};

export const getAllImageReviews = async (): Promise<Review[]> => {
  const { data, error } = await browserClient.from('reviews').select('*');

  if (error) {
    console.error(error);
  }

  const reviewsWithImages = data?.filter((review) => Array.isArray(review.image_url) && review.image_url.length > 0);

  return reviewsWithImages as unknown as Review[];
};

export const getAuthUsersProfile = async () => {
  const { data, error } = await supabase.auth.admin.listUsers();
  if (error) {
    console.error(error);
  }
  return data as unknown as UsersResponse;
};
