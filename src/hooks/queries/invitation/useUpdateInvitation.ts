import { InvitationFormType } from '@/types/invitationFormType.type';
import { convertToSnakeCase } from '@/utils/convert/invitaitonTypeConvert';
import { createClient } from '@/utils/supabase/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '../queryKeys';

const browserClient = createClient();

const updateInvitation = async (invitationData: InvitationFormType) => {
  const { data: user, error } = await browserClient.auth.getUser();

  if (error) {
    console.error(error);
  }

  if (!user.user) return null;

  const convertedInvitation = convertToSnakeCase(invitationData);

  await browserClient.from('invitation').update(convertedInvitation).eq('user_id', user.user.id);
};

export const useUpdateInvitation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (invitationData: InvitationFormType) => updateInvitation(invitationData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.invitation() });
    },
  });
};
