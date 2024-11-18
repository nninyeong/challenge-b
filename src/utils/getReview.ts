import { Review } from '@/types/review.types';
import browserClient from './supabase/client';
import { supabase } from './supabase/createClient';
import { User as SupabaseUser } from '@supabase/auth-js';

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

export const getAuthUsersProfile = async (): Promise<SupabaseUser[]> => {
  let allUsers: SupabaseUser[] = [];
  let page = 1;
  const pageSize = 50;

  try {
    while (true) {
      const { data, error } = await supabase.auth.admin.listUsers({
        page,
        perPage: pageSize,
      });

      if (error) throw error;

      if (data.users.length === 0) break;

      allUsers = [...allUsers, ...data.users];
      page++;
    }

    console.log('전체 사용자 수:', allUsers);
    return allUsers;
  } catch (error) {
    console.error('전체 사용자 목록 가져오기 실패:', error);
    return [];
  }
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
