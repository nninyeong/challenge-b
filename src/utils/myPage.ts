import { getUserInfo } from './server-action';
import browserClient from './supabase/client';

export const getInvitationCard = async () => {
  const user = await getUserInfo();
  const userId = user?.user.id;
  const { data, error } = await browserClient.from('invitation').select('*').eq('user_id', userId);

  if (error) {
    console.error('청첩장데이터를 불러오지못했습니다.', error);
    return null;
  }

  return data;
};

export const patchPrivateInvitation = async (isPrivate: boolean) => {
  const user = await getUserInfo();
  const userId = user?.user.id;
  const { data, error } = await browserClient.from('invitation').update({ private: isPrivate }).eq('user_id', userId);
  if (error) {
    console.error('초대장 상태 업데이트 실패:', error);
    return null;
  }
  return data;
};
