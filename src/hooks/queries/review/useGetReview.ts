'use client';

import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../queryKeys';
import { getAllImageReviews, getAuthUsersProfile, getMyReview, getReview } from '@/utils/getReview';
import { Review } from '@/types/review.types';
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

export const useGetReviewOnlyUser = (userId: string) => {
  return useQuery({
    queryKey: QUERY_KEYS.userReview(),
    queryFn: () => getMyReview(userId),
    enabled: !!userId,
  });
};
