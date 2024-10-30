import { getInvitationCard } from '@/utils/myPage';
import Image from 'next/image';
import Link from 'next/link';

const MyInvitationCard = async () => {
  const getMyInvitationCard = await getInvitationCard;
  console.log(getMyInvitationCard);
  return (
    <div className='w-full h-[152px] flex justify-center items-center mx-auto rounded mt-8 shadow-sm shadow-gray-400'>
      {!getMyInvitationCard ? (
        <div className='flex flex-col justify-center items-center'>
          <Image
            src='/assets/images/defaultImg.png'
            alt='invitationImg'
            width={64}
            height={64}
          />
          <Link href={`/create/card`}></Link>
        </div>
      ) : (
        <div className='flex  flex-col justify-center items-center'>
          <Image
            src='/assets/images/card/noCard.png'
            alt='noCardImg'
            width={64}
            height={64}
          />
          <p className='text-gray-50 font-[0.8rem]'> 제작중인 청첩장이 없어요</p>
        </div>
      )}
    </div>
  );
};

export default MyInvitationCard;
