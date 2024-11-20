'use client';
import { InvitationFormType } from '@/types/invitationFormType.type';
import colorConverter from '@/utils/colorConverter';
import { getDayOfWeek } from '@/utils/date/getDayOfWeek';
import PhoneIcon from '../icons/PhoneIcon';

const DEFAULT_VALUES = {
  name: '예식장 이름을 입력해주세요.',
  address: '예식장 주소를 입력해주세요.',
  contact: '예식장 연락처를 입력해주세요.',
};

type WeddingInfoPropType = Pick<InvitationFormType, 'weddingInfo' | 'fontInfo'>;
const WeddingInfo = ({ weddingInfo, fontInfo }: WeddingInfoPropType) => {
  const day = getDayOfWeek(weddingInfo.date);
  const { size, color } = fontInfo;
  const rgbaColor = colorConverter(color);

  return (
    <div
      style={{ fontSize: `${16 + size}px`, color: `${rgbaColor}` }}
      className='flex flex-col items-center gap-[24px] text-center mb-[24px]'
    >
      <p className='text-opctiy-50  font-normal leading-[140%] tracking-[4px]'>INFORMATION</p>
      <p
        style={{ fontSize: `${20 + size}px` }}
        className='text-opctiy-50   font-bold leading-[120%] tracking-[-0.04px]'
      >
        {weddingInfo.date} {day} {weddingInfo.time.hour}:{weddingInfo.time.minute}
      </p>
      <div className='text-opctiy-50   leading-[140%]'>
        <p
          style={{ fontSize: `${20 + size}px` }}
          className='text-opctiy-50  leading-[120%] mb-[8px]'
        >
          {weddingInfo.weddingHallName || DEFAULT_VALUES.name}
        </p>
        <p>{weddingInfo.weddingHallAddress || DEFAULT_VALUES.address}</p>
        <p>{weddingInfo.weddingHallContact || DEFAULT_VALUES.contact}</p>
      </div>
      <div className='flex gap-[16px] text-opctiy-50  font-semibold leading-[140%]'>
        <a
          href={`https://map.kakao.com/link/search/${weddingInfo.weddingHallAddress}`}
          target='_blank'
        >
          <button
            style={{ border: `1px solid ${rgbaColor}` }}
            className='flex justify-center items-center gap-[6px]  rounded-[300px] px-[14px] py-[8px] w-[96px] h-[40px]'
          >
            <svg
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill={rgbaColor}
              xmlns='http://www.w3.org/2000/svg'
            >
              <g id='Icon/marker-02'>
                <g id='Icon'>
                  <path
                    d='M12.0003 21.5999C12.0003 21.5999 19.5134 14.9216 19.5134 9.91294C19.5134 5.76361 16.1497 2.3999 12.0003 2.3999C7.85101 2.3999 4.4873 5.76361 4.4873 9.91294C4.4873 14.9216 12.0003 21.5999 12.0003 21.5999Z'
                    stroke='#737373'
                  />
                  <path
                    d='M14.4007 9.60005C14.4007 10.9255 13.3261 12.0001 12.0007 12.0001C10.6752 12.0001 9.60066 10.9255 9.60066 9.60005C9.60066 8.27457 10.6752 7.20005 12.0007 7.20005C13.3261 7.20005 14.4007 8.27457 14.4007 9.60005Z'
                    stroke='#737373'
                  />
                </g>
              </g>
            </svg>

            <span className='text-[16px]'>지도</span>
          </button>
        </a>
        <a href={`tel:${weddingInfo.weddingHallContact}`}>
          <button
            style={{ border: `1px solid ${rgbaColor}` }}
            className='flex justify-center items-center gap-[6px]  rounded-[300px] p-[16px] w-[96px] h-[40px]'
          >
            <PhoneIcon color={rgbaColor} />
            <span className='text-[16px]'>전화</span>
          </button>
        </a>
      </div>
    </div>
  );
};

export default WeddingInfo;
