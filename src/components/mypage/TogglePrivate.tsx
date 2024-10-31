'use client';
import { QUERY_KEYS } from '@/hooks/queries/queryKeys';
import { getInvitationCard, patchPrivateInvitation } from '@/utils/myPage';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { revalidateInvitation } from '@/utils/revalidateInvitation';

const TogglePrivate = () => {
  const [isPrivate, setIsPrivate] = useState(false);
  const queryClient = useQueryClient();

  const {
    data: invitationCard,
    isLoading,
    error,
    isSuccess,
  } = useQuery({
    queryKey: QUERY_KEYS.invitationCard(),
    queryFn: getInvitationCard,
  });

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

  const toggleSwitch = async () => {
    if (!invitationCard || invitationCard.length < 1) return;
    const newIsPrivate = !isPrivate;
    setIsPrivate(newIsPrivate);
    mutation.mutate(newIsPrivate);
    await revalidateInvitation(invitationCard[0].id);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error</div>;

  return (
    <div
      onClick={toggleSwitch}
      className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer ${isPrivate ? 'bg-primary-300' : 'bg-gray-400'}`}
    >
      <div
        className={`bg-white w-6 h-6 rounded-full shadow-md transform duration-300 ${isPrivate ? 'translate-x-6' : ''}`}
      ></div>
    </div>
  );
};

export default TogglePrivate;
