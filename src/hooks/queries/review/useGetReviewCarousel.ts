import browserClient from '@/utils/supabase/client';
import { QUERY_KEYS } from '../queryKeys';
import { useQuery } from '@tanstack/react-query';

const getReviewCarousel = async () => {
  const response = await browserClient.from('reviews').select('*').filter('image_url', 'neq', '[]').limit(8);

  if (response.error) {
    console.error(response.error);
  }

  if (response.data === null) {
    return [];
  }

  return response.data;
};

export const useGetReviewCarouselQuery = () => {
  return useQuery({
    queryKey: QUERY_KEYS.invitationReviews(),
    queryFn: getReviewCarousel,
  });
};
