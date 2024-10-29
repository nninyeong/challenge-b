'use client';
import { createClient } from '@/utils/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../queryKeys';

const getExistingInvitation = async () => {
  const browserClient = createClient();
  const { data: user } = await browserClient.auth.getUser();

  if (!user.user) {
    return null;
  }

  const { data, error } = await browserClient.from('invitation').select('*').eq('user_id', user.user.id).maybeSingle();

  if (error) {
    console.error(error);
  }

  return data;
};

export const useGetInvitationQuery = () => {
  return useQuery({
    queryKey: QUERY_KEYS.invitation(),
    queryFn: getExistingInvitation,
  });
};
