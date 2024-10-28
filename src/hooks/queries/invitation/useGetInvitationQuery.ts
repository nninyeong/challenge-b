'use client';
import { getUserInfo } from '@/utils/server-action';
import { createClient } from '@/utils/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '../queryKeys';

const getExistingInvitation = async () => {
  const browserClient = createClient();
  const user = await getUserInfo();

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
