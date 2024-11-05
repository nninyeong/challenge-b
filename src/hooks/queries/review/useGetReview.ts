'use client';

import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../queryKeys';
import { getAllImageReviews, getAuthUsersProfile, getMyReview, getReview } from '@/utils/getReview';
import { Review } from '@/types/review.types';
import browserClient from '@/utils/supabase/client';
const ROW = 10;
export const useAuthUserQuery = () => {
  return useQuery({
    queryKey: QUERY_KEYS.authUsers(),
    queryFn: getAuthUsersProfile,
  });
};

export const useReviewImage = () => {
  return useQuery({
    queryKey: QUERY_KEYS.allImageReviews(),
    queryFn: getAllImageReviews,
  });
};

export const useReviewInfinite = () => {
  return useInfiniteQuery<Review[]>({
    queryKey: QUERY_KEYS.reviews(),
    queryFn: async ({ pageParam }) => await getReview({ pageParam: pageParam as number, ROW }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === ROW ? allPages.length * ROW : undefined;
    },
  });
};

export const useGetReviewOnlyUser = () => {
  const getUserId = async () => {
    const { data } = await browserClient.auth.getUser();
    return data.user?.id;
  };

  return useQuery<Review[]>({
    queryKey: QUERY_KEYS.userReview(),
    queryFn: async () => {
      const userId = await getUserId();
      if (!userId) {
        throw new Error('User ID not found');
      }
      return getMyReview(userId);
    },
  });
};
