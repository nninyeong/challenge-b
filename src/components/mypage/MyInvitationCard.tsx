'use client';

import Image from 'next/image';
import Link from 'next/link';
import { IoClose } from 'react-icons/io5';
import { PiLinkSimpleBold } from 'react-icons/pi';
import Button from '../ui/Button';
import { useDeleteInvitationCard, useGetAllinvitationCard } from '@/hooks/queries/mypage/useMypage';
import { Confirm, Notify } from 'notiflix';

const MyInvitationCard = () => {
  const { data: invitationCards, isLoading, error } = useGetAllinvitationCard();

  const mutation = useDeleteInvitationCard();

  const handleDeleteCards = (invitationId: string) => {
    Confirm.show(
      '청첩장을 삭제하시겠습니까?',
      '삭제를 원하시면 Yes를 눌러주세요',
      'Yes',
      'No',
      () => {
        Notify.success('청첩장이 삭제완료되었습니다.');
        mutation.mutate(invitationId);
      },
      () => {
        Notify.failure('취소되었습니다.');
      },
    );
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>error</div>;

  const invitationCard = invitationCards?.[0];

  const handleCopyLink = async () => {
    if (navigator.share) {
      navigator
        .share({
          title: `{${invitationCard?.greeting_message?.title} }` || '우리 결혼합니다.',
          text: `{${invitationCard?.greeting_message?.content} }`,
          url: `{http://localhost:3000/card/${invitationCard?.id}}`,
        })
        .then(() => console.log('공유성공'))
        .catch((error) => console.error('공유실패', error));
    } else {
      Notify.success('공유하기가 지원되지 않는 환경입니다.');
    }
  };
  return (
    <div className='w-full h-[152px] flex mx-auto rounded-xl mt-8 shadow-sm shadow-gray-400 p-4'>
      {invitationCard ? (
        <div className='w-full flex flex-col justify-center items-center gap-2'>
          <div className='w-full flex justify-between gap-4'>
            <div className='flex gap-4 mb-2'>
              <div className='w-[64px] h-[64px] overflow-hidden flex rounded-xl '>
                <Image
                  src={invitationCard.main_photo_info?.imageUrl || '/assets/images/defaultImg.png'}
                  alt='invitationImg'
                  width={64}
                  height={64}
                />
              </div>
              <div className='flex flex-col justify-between'>
                <p>내 청첩장</p>
                <div className='flex gap-2 justify-center items-center'>
                  <PiLinkSimpleBold
                    color='gray'
                    size='20'
                  />
                  <button
                    onClick={handleCopyLink}
                    className='text-[14px] text-gray-700'
                  >
                    공유하기
                  </button>
                </div>
              </div>
            </div>
            <IoClose
              color='white'
              size='24'
              className='cursor-pointer'
              onClick={() => handleDeleteCards(invitationCard.id)}
            />
          </div>
          <div className='w-full flex gap-4 '>
            <div className='flex-1'>
              <Link href={`/card/${invitationCard?.id}`}>
                <Button className='bg-primary300 rounded-xl w-full pt-2.5 pb-2.5'>미리보기</Button>
              </Link>
            </div>
            <div className='flex-1'>
              <Link href={`/create/card`}>
                <button className='border border-solid border-primary-300 rounded-xl w-full pt-2.5 pb-2.5 text-primary-300'>
                  수정하기
                </button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className='w-full flex flex-col justify-center items-center'>
          <Image
            src='/assets/images/card/noCard.png'
            alt='noCardImg'
            width={64}
            height={64}
          />
          <p className='text-gray-50 font-[0.8rem]'>제작중인 청첩장이 없어요</p>
        </div>
      )}
    </div>
  );
};

export default MyInvitationCard;
