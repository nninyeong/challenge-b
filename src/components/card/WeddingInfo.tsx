'use client';
import { InvitationFormType } from '@/types/invitationFormType.type';
import Image from 'next/image';
import { getDayOfWeek } from '@/utils/date/getDayOfWeek';
import { useFontStore } from '@/store/useFontStore';

const DEFAULT_VALUES = {
  name: '예식장 이름을 입력해주세요.',
  address: '예식장 주소를 입력해주세요.',
  contact: '예식장 연락처를 입력해주세요.',
};

type WeddingInfoPropType = Pick<InvitationFormType, 'weddingInfo'>;
const WeddingInfo = ({ weddingInfo }: WeddingInfoPropType) => {
  const day = getDayOfWeek(weddingInfo.date)[0];
  const fontSize = useFontStore((state) => state.fontSize);
  return (
    <div
      style={{ fontSize: `${16 + fontSize}px` }}
      className='flex flex-col items-center gap-[24px] text-center mb-[24px]'
    >
      <p className='text-gray-600  font-normal leading-[140%] tracking-[4px]'>INFORMATION</p>
      <p
        style={{ fontSize: `${20 + fontSize}px` }}
        className='text-gray-700  font-bold leading-[120%] tracking-[-0.04px]'
      >
        {weddingInfo.date} {day} {weddingInfo.time.hour}:{weddingInfo.time.minute}
      </p>
      <div className='text-gray-700  leading-[140%]'>
        <p
          style={{ fontSize: `${20 + fontSize}px` }}
          className='text-gray-800  leading-[120%] mb-[8px]'
        >
          {weddingInfo.weddingHallName || DEFAULT_VALUES.name}
        </p>
        <p>{weddingInfo.weddingHallAddress || DEFAULT_VALUES.address}</p>
        <p>{weddingInfo.weddingHallContact || DEFAULT_VALUES.contact}</p>
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
              alt='phone'
              width={24}
              height={24}
            />
            <span>전화</span>
          </button>
        </a>
      </div>
    </div>
  );
};

export default WeddingInfo;
