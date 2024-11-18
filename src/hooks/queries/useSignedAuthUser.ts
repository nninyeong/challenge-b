import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from './queryKeys';
import { getAuthUser } from '@/utils/getAuthUser';

export const useSignedAuthUser = () => {
  return useQuery({
    queryKey: QUERY_KEYS.loginUser(),
    queryFn: getAuthUser,
  });
};
