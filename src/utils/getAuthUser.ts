import browserClient from '@/utils/supabase/client';

export const getAuthUser = async () => {
  const { data, error } = await browserClient.auth.getUser();
  if (error) {
    throw new Error('유저 정보를 가져오는 데 실패했습니다.');
  }

  return data.user || '';
};
