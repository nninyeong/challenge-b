'use client';
import { QUERY_KEYS } from '@/hooks/queries/queryKeys';
import { deleteInvitationCard, getInvitationCard } from '@/utils/myPage';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { IoClose } from 'react-icons/io5';
import { PiLinkSimpleBold } from 'react-icons/pi';
import Button from '../ui/Button';

const MyInvitationCard = () => {
  const {
    data: invitationCards,
    isLoading,
    error,
  } = useQuery({
    queryKey: QUERY_KEYS.invitationCard(),
    queryFn: getInvitationCard,
  });

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteInvitationCard,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.invitationCard() });
      alert('청첩장이 삭제완료되었습니다.');
    },
    onError: (error) => {
      console.error('Delete Invitation Card Error', error);
      alert('청첩장 삭제에 실패했습니다.');
    },
  });

  const handleDeleteCards = (invitationId: string) => {
    const confirmed = confirm('청첩장을 삭제하시겠습니까?');
    if (confirmed) mutation.mutate(invitationId);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>error</div>;

  const invitationCard = invitationCards?.[0];

  const shareLink = `http://localhost:3000/invitations/${invitationCard?.id}`;

  const handleCopyLink = async () => {
    navigator.clipboard
      .writeText(shareLink)
      .then(() => {
        alert('링크가 클립보드에 복사되었습니다!');
      })
      .catch((err) => {
        console.error('링크 복사 실패:', err);
        alert('링크 복사에 실패했습니다.');
      });
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
                  onError={(e) => {
                    e.currentTarget.src = '/assets/images/defaultImg.png';
                  }}
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
              <Link href={`/create/card`}>
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
