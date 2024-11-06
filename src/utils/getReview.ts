import { Review } from '@/types/review.types';
import browserClient from './supabase/client';
import { supabase } from './supabase/createClient';
import { UsersResponse } from '@/types/users.types';

type ReviewProps = {
  pageParam: number;
  ROW: number;
};

export const getReview = async ({ pageParam = 0, ROW }: ReviewProps): Promise<Review[]> => {
  const { data, error } = await browserClient
    .from('reviews')
    .select('*')
    .order('created_at', { ascending: false })
    .range(pageParam, pageParam + ROW - 1);

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

export const getMyReview = async (id: string) => {
  const { data, error } = await browserClient.from('reviews').select('*').eq('user_id', id).maybeSingle();
  if (error) {
    console.error(error);
  }

  return data;
};
