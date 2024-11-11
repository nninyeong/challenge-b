import { InvitationFormType } from '@/types/invitationFormType.type';
import { convertToSnakeCase } from '@/utils/convert/invitaitonTypeConvert';
import { useMutation } from '@tanstack/react-query';
import browserClient from '@/utils/supabase/client';

const insertInvitation = async (invitationData: InvitationFormType) => {
  const { data: user, error } = await browserClient.auth.getUser();

  if (error) {
    console.error(error);
  }

  if (!user.user) return null;

  const convertedInvitation = convertToSnakeCase(invitationData);

  await browserClient.from('invitation').insert([convertedInvitation]);
};

export const useInsertInvitation = () => {
  return useMutation({
    mutationFn: (invitationData: InvitationFormType) => insertInvitation(invitationData),
  });
};
