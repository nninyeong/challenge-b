import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../queryKeys';
import { getAllImageReviews } from '@/utils/getReview';

export const useGetAllImageReivews = () => {
  return useQuery({
    queryKey: QUERY_KEYS.imageReivew(),
    queryFn: getAllImageReviews,
  });
};
