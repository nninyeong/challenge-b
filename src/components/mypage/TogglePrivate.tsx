'use client';
import { useGetAllinvitationCard } from '@/hooks/queries/mypage/useMypage';
import { QUERY_KEYS } from '@/hooks/queries/queryKeys';
import { patchPrivateInvitation } from '@/utils/myPage';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { revalidateInvitation } from '@/utils/revalidateInvitation';
import { Notify } from 'notiflix';
import { TogglePrivateLoading } from '../loading/MypageLoading';
import { useRouter } from 'next/navigation';

const TogglePrivate = () => {
  const [isPrivate, setIsPrivate] = useState(false);
  const queryClient = useQueryClient();
  const router = useRouter();

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

  const toggleSwitch = async () => {
    if (!invitationCard || invitationCard.length < 1) return;
    const newIsPrivate = !isPrivate;
    setIsPrivate(newIsPrivate);
    const { isSuccess } = await revalidateInvitation(invitationCard[0].id);
    if (isSuccess) {
      router.refresh();
      mutation.mutate(newIsPrivate);
      Notify.success('공개여부가 변경되었습니다.');
    }
  };

  if (isLoading) return <TogglePrivateLoading />;
  if (error) return <div>Error</div>;

  return (
    <div
      onClick={toggleSwitch}
      className={`w-[43px] h-[30px] flex items-center rounded-full pl-[5px] pr-[5px] pt-[6px] pb-[6px] cursor-pointer ${isPrivate ? 'bg-gray-400' : 'bg-primary-300'}`}
    >
      <div
        className={`bg-white w-[18px] h-[18px] rounded-full  transform duration-300 ${isPrivate ? '' : 'translate-x-[14px]'}`}
      ></div>
    </div>
  );
};

export default TogglePrivate;
