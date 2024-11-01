'use client';

import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../queryKeys';
import { getAllImageReviews, getAuthUsersProfile, getReview } from '@/utils/getReview';
import { Review } from '@/types/review.types';

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
  const row = 10;

  return useInfiniteQuery<Review[]>({
    queryKey: QUERY_KEYS.reviews(),
    queryFn: async ({ pageParam }) => await getReview({ pageParam: pageParam as number, row }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === row ? allPages.length * row : undefined;
    },
  });
};
