'use client';

import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../queryKeys';
import { getAllImageReviews, getAuthUsersProfile } from '@/utils/getReview';

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
