import { InvitationFormType } from '@/types/invitationFormType.type';
import { convertToSnakeCase } from '@/utils/convert/invitaitonTypeConvert';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import browserClient from '@/utils/supabase/client';
import { QUERY_KEYS } from '../queryKeys';

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
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (invitationData: InvitationFormType) => insertInvitation(invitationData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.invitation() });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.invitationCard() });
    },
  });
};
