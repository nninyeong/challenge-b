'use client';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '../queryKeys';
import { deleteInvitationCard, getInvitationCard } from '@/utils/myPage';
import { Notify } from 'notiflix';

export const useGetAllinvitationCard = () => {
  return useQuery({
    queryKey: QUERY_KEYS.invitationCard(),
    queryFn: getInvitationCard,
  });
};

export const useDeleteInvitationCard = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteInvitationCard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.invitationCard() });
      Notify.success('청첩장이 삭제완료되었습니다.');
    },
    onError: (error) => {
      console.error('Delete Invitation Card Error', error);
      Notify.failure('청첩장 삭제에 실패했습니다.');
    },
  });
};
