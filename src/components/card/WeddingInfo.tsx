'use client';
import { InvitationFormType } from '@/types/invitationFormType.type';
import Image from 'next/image';

const DEFAULT_VALUES = {
  name: '예식장 이름을 입력해주세요.',
  address: '예식장 주소를 입력해주세요.',
  contact: '예식장 연락처를 입력해주세요.',
};

type WeddingInfoPropType = Pick<InvitationFormType, 'weddingInfo'>;
const WeddingInfo = ({ weddingInfo }: WeddingInfoPropType) => {
  return (
    <div className='flex flex-col items-center gap-[24px] text-center'>
      <p className='text-gray-600 text-[16px] font-normal leading-[140%] tracking-[4px]'>LOCATION</p>
      <div className='text-gray-700 text-[16px] leading-[140%]'>
        <p className='text-gray-800 text-[20px] leading-[120%] mb-[8px]'>
          {weddingInfo.weddingHallName || DEFAULT_VALUES.name}
        </p>
        <p>{weddingInfo.weddingHallAddress || DEFAULT_VALUES.address}</p>
        <p>{weddingInfo.weddingHallContact || DEFAULT_VALUES.contact}</p>
      </div>
      <div className='text-gray-700 text-[16px] leading-[140%]'>
        {/*TODO: 날짜 형식 변환, 요일*/}
        <p>{`${weddingInfo.date} ${weddingInfo.time.hour} ${weddingInfo.time.minute}`}</p>
      </div>
      <div className='flex gap-[16px] text-gray-700 font-semibold leading-[140%]'>
        <a
          href={`https://map.kakao.com/link/search/${weddingInfo.weddingHallAddress}`}
          target='_blank'
        >
          <button className='flex justify-center items-center gap-[6px] border rounded-[300px] px-[14px] py-[8px] w-[96px] h-[40px]'>
            <Image
              src='/assets/images/icons/marker-02.svg'
              alt=''
              width={24}
              height={24}
            />
            <span>지도</span>
          </button>
        </a>
        <a href={`tel:${weddingInfo.weddingHallContact}`}>
          <button className='flex justify-center items-center gap-[6px] border rounded-[300px] p-[16px] w-[96px] h-[40px]'>
            <Image
              src='/assets/images/icons/phone.svg'
              alt=''
              width={24}
              height={24}
            />
            <span className='text-gray-600 text-[16px]'>전화</span>
          </button>
        </a>
      </div>
    </div>
  );
};

export default WeddingInfo;
