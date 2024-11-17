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

  if (error) throw error;

  return data as unknown as Review[];
};

export const getAllImageReviews = async (): Promise<Review[]> => {
  const { data, error } = await browserClient.from('reviews').select('*');

  if (error) throw error;

  const reviewsWithImages = data?.filter((review) => Array.isArray(review.image_url) && review.image_url.length > 0);

  return reviewsWithImages as unknown as Review[];
};

export const getAuthUsersProfile = async () => {
  const { data, error } = await supabase.auth.admin.listUsers();
  if (error) throw error;
  return data as unknown as UsersResponse;
};

export const getMyReview = async (id: string) => {
  const { data, error } = await browserClient.from('reviews').select('*').eq('user_id', id).maybeSingle();
  if (error) throw error;

  return data;
};

export const getLikes = async (postId: string) => {
  const { data, error: fetchError } = await supabase.from('reviews').select('likes').eq('id', postId).single();

  if (fetchError) throw fetchError;

  return Array.isArray(data?.likes) ? data.likes : [];
};

export const uploadLikes = async (postId: string, updatedLikes: string[]) => {
  const { data, error } = await supabase.from('reviews').update({ likes: updatedLikes }).eq('id', postId).select();

  if (error) throw error;

  return data;
};

export const addLike = async ({ postId, userId }: { postId: string; userId: string }) => {
  const existingLikes = await getLikes(postId);

  if (existingLikes.includes(userId)) {
    return { likeType: false };
  }

  const updatedLikes = [...existingLikes, userId];

  const uploadLikesSupabase = await uploadLikes(postId, updatedLikes);

  return uploadLikesSupabase;
};

export const removeLike = async ({ postId, userId }: { postId: string; userId: string }) => {
  const existingLikes = await getLikes(postId);

  const updatedLikes = Array.isArray(existingLikes) ? existingLikes.filter((id: string) => id !== userId) : [];

  const uploadLikesSupabase = await uploadLikes(postId, updatedLikes);

  return uploadLikesSupabase;
};
