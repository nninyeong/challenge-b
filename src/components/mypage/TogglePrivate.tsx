'use client';
import { useGetAllinvitationCard } from '@/hooks/queries/mypage/useMypage';
import { QUERY_KEYS } from '@/hooks/queries/queryKeys';
import { patchPrivateInvitation } from '@/utils/myPage';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

const TogglePrivate = () => {
  const [isPrivate, setIsPrivate] = useState(false);
  const queryClient = useQueryClient();

  const { data: invitationCard, isLoading, error, isSuccess } = useGetAllinvitationCard();

  useEffect(() => {
    if (invitationCard && invitationCard.length > 0 && isSuccess) {
      setIsPrivate(invitationCard[0].isPrivate);
    }
  }, [isSuccess]);
  const mutation = useMutation({
    mutationFn: patchPrivateInvitation,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.invitationCard() });
    },
    onError: (error) => {
      console.error('Private Error', error);
    },
  });

  const toggleSwitch = () => {
    const newIsPrivate = !isPrivate;
    setIsPrivate(newIsPrivate);
    mutation.mutate(newIsPrivate);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  return (
    <div
      onClick={toggleSwitch}
      className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer ${isPrivate ? 'bg-gray-400' : 'bg-primary-300'}`}
    >
      <div
        className={`bg-white w-6 h-6 rounded-full shadow-md transform duration-300 ${isPrivate ? '' : 'translate-x-6'}`}
      ></div>
    </div>
  );
};

export default TogglePrivate;
