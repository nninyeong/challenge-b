'use client';

import { checkMadeInvitations } from '@/utils/checkMadeInvitations';
import browserClient from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { Notify } from 'notiflix';

const ReviewWriteButton = ({
  setOpenBottomSheet,
}: {
  setOpenBottomSheet: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const router = useRouter();

  const getUserId = async () => {
    const { data } = await browserClient.auth.getUser();
    return data.user?.id;
  };
  const checkAccessPermissions = async () => {
    const userId = await getUserId();

    if (!userId) {
      Notify.failure('먼저 로그인을 해주세요.');
      router.push('/signin');
      return false;
    }

    const isMadeInvitation = await checkMadeInvitations(userId);
    if (!isMadeInvitation) {
      Notify.failure('먼저 청첩장을 만들어주세요.');
      router.push('/create/card');
      return false;
    }

    return true;
  };

  const handleOpenBottomSheetButton = async () => {
    const hasPermissions = await checkAccessPermissions();
    if (hasPermissions) {
      setOpenBottomSheet(true);
    }
  };

  return (
    <button
      className='fixed bottom-[13px] left-1/2 rounded-[300px] bg-primary300 
    text-white flex justify-center items-center w-[142px] h-[40px] -translate-x-1/2
    '
      onClick={handleOpenBottomSheetButton}
    >
      <img
        src='/assets/images/icons/white-edit-contained-selceted.svg'
        alt='후기 작성 열기'
      />
      <p className='font-bold text-[16px] leading-[120%] tracking-[-0.032px]'>후기 작성 열기</p>
    </button>
  );
};

export default ReviewWriteButton;
