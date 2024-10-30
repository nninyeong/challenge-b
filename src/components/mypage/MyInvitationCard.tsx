'use client';

import { InvitationFormType } from '@/types/invitationFormType.type';
import { getInvitationCard } from '@/utils/myPage';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const MyInvitationCard = () => {
  const [invitationCard, setInvitationCard] = useState<InvitationFormType[] | null>(null);
  const getMyInvitationCard = async () => {
    const data = await getInvitationCard();
    setInvitationCard(data);
    console.log(data);
  };
  useEffect(() => {
    getMyInvitationCard();
  }, []);

  return (
    <div className='w-full h-[152px] flex justify-center items-center mx-auto rounded mt-8 shadow-sm shadow-gray-400'>
      {invitationCard && invitationCard.length > 0 ? (
        <div className='flex flex-col justify-center items-center'>
          <Image
            src='/assets/images/defaultImg.png'
            alt='invitationImg'
            width={64}
            height={64}
          />
          <Link href={`/create/card`}>청첩장 보기</Link>
        </div>
      ) : (
        <div className='flex flex-col justify-center items-center'>
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
