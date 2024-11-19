'use client';

import { useReviewBottomSheetContext } from '@/provider/reviewBottomSheetProvider';
import { checkMadeInvitations } from '@/utils/checkMadeInvitations';
import browserClient from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import { Notify } from 'notiflix';
import useMediaQuery from '@/hooks/review/useMediaQuery';
import { useEffect, useState } from 'react';
import ReviewForm from './ReviewForm';

const ReviewWriteButton = () => {
  const isDesktop = useMediaQuery('(min-width: 1440px)');
  const [isReviewWriteModalOpen, setIsReviewWriteModalOpen] = useState(false);
  const router = useRouter();
  const { setIsReviewBottomSheetOpen } = useReviewBottomSheetContext((state) => state);

  useEffect(() => {
    if (isReviewWriteModalOpen) {
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = 'unset';
    }
    return () => {
      document.documentElement.style.overflow = 'unset';
    };
  }, [isReviewWriteModalOpen]);

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

  const handleOpenReviewWrite = async () => {
    if (isDesktop) {
      setIsReviewWriteModalOpen(true);
    } else {
      const hasPermissions = await checkAccessPermissions();
      if (hasPermissions) {
        setIsReviewBottomSheetOpen(true);
      }
    }
  };

  const closeModal = () => {
    setIsReviewWriteModalOpen(false);
  };

  return (
    <>
      <button
        className='fixed bottom-[12px] left-1/2 rounded-[300px] bg-primary300
    text-white flex justify-center items-center w-[150px] h-[40px] -translate-x-1/2 gap-[6px] px-[16px]
    '
        onClick={handleOpenReviewWrite}
      >
        <img
          src='/assets/images/icons/white-edit-contained-selceted.png'
          alt='후기 작성 열기'
          className='w-[24px] h-[24px]'
          loading='lazy'
        />
        <p className='font-bold text-[16px] leading-[120%] tracking-[-0.032px]'>후기 작성하기</p>
      </button>
      {isReviewWriteModalOpen && (
        <div
          className='fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-100'
          onClick={closeModal}
        >
          <div
            className='relative bg-white py-4 px-6 rounded-[24px] w-[612px] h-[544px]'
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src='/assets/images/icons/x-03.webp'
              alt='닫기버튼'
              onClick={closeModal}
              className='absolute top-4 right-4 text-black w-[24px] h-[24px] cursor-pointer z-50'
            />

            <div className='relative z-10 mt-[50px]'>
              <ReviewForm />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ReviewWriteButton;
