import { Control, useWatch } from 'react-hook-form';
import { InvitationFormType } from '@/types/invitationFormType.type';
import Image from 'next/Image';

const DEFAULT_VALUES = {
  name: '예식장 이름을 입력해주세요.',
  address: '예식장 주소를 입력해주세요.',
  contact: '예식장 연락처를 입력해주세요.',
};

const WeddingInfoPreView = ({ control }: { control: Control<InvitationFormType> }) => {
  const weddingInfoWatch = useWatch({
    control,
    name: 'weddingInfo',
  });

  return (
    <div className='flex flex-col items-center gap-[16px] text-center'>
      <p>LOCATION</p>
      <div>
        <p className='text-[24px] font-bold'>{weddingInfoWatch.weddingHallName || DEFAULT_VALUES.name}</p>
        <p>{weddingInfoWatch.weddingHallAddress || DEFAULT_VALUES.address}</p>
        <p>{weddingInfoWatch.weddingHallContact || DEFAULT_VALUES.contact}</p>
      </div>
      <a href={`tel:${weddingInfoWatch.weddingHallContact}`}>
        <button className='flex justify-center items-center gap-[8px] border rounded-[12px] p-[16px] w-[96px] h-[40px]'>
          <Image
            src='/assets/images/icons/phone.svg'
            alt=''
            width={24}
            height={24}
          />
          <span>전화</span>
        </button>
      </a>
    </div>
  );
};

export default WeddingInfoPreView;
