import { InvitationCard } from '@/types/invitationFormType.type';
import { getUserInfo } from './server-action';
import { supabase } from './supabase/createClient';

export const getInvitationCard = async (): Promise<InvitationCard[] | null> => {
  const user = await getUserInfo();
  const userId = user?.user.id;
  const { data, error } = await supabase.from('invitation').select('*').eq('user_id', userId);

  if (error) {
    console.error('청첩장데이터를 불러오지못했습니다.', error);
    return null;
  }
console.log(data)
  return data as unknown as InvitationCard[];
};

export const patchPrivateInvitation = async (isPrivate: boolean) => {
  const user = await getUserInfo();
  const userId = user?.user.id;
  const { data, error } = await supabase.from('invitation').update({ isPrivate: isPrivate }).eq('user_id', userId);
  if (error) {
    console.error('초대장 상태 업데이트 실패:', error);
    return null;
  }
  return data;
};

export const deleteInvitationCard = async (invitationId: string) => {
  const user = await getUserInfo();
  const userId = user?.user.id;

  const { data, error } = await supabase.from('invitation').delete().eq('id', invitationId).eq('user_id', userId);

  if (error) {
    console.error('초대장을 삭제하지 못했습니다.', error);
    return null;
  }
  return data;
};
