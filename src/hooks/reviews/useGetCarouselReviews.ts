import browserClient from '@/utils/supabase/client';
import { QUERY_KEYS } from '../queries/queryKeys';
import { useQuery } from '@tanstack/react-query';

const getCarouselReviews = async () => {
  const response = await browserClient.from('reviews').select('*').filter('image_url', 'neq', '[]').limit(8);

  if (response.error) {
    console.error(response.error);
  }

  if (response.data === null) {
    return [];
  }

  return response.data;
};

export const useGetCarouselReviewsQuery = () => {
  return useQuery({
    queryKey: QUERY_KEYS.invitationReviews(),
    queryFn: getCarouselReviews,
  });
};
