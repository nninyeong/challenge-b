'use client';
import { useFormContext, useWatch } from 'react-hook-form';
import { Address } from 'react-daum-postcode';
import { useState } from 'react';
import AddressModal from '@/components/create/modal/AddressModal';
import SelectBox from '@/components/ui/SelectBox';
import { formatDate } from '@/utils/date/formatDate';

const HOURS_FOR_WEDDING_INFO = [
  '오전 09',
  '오전 10',
  '오전 11',
  '낮 12',
  '오후 1',
  '오후 2',
  '오후 3',
  '오후 4',
  '오후 6',
  '오후 7',
];

const MINUTES_FOR_WEDDING_INFO = ['00', '30'];

const WeddingInfoInput = () => {
  const { register, setValue } = useFormContext();
  const { time } = useWatch({ name: 'weddingInfo' });

  const [showAddressModal, setShowAddressModal] = useState(false);
  const openAddressModal = () => {
    setShowAddressModal(true);
  };

  const setAddress = (value: Address) => {
    setValue('weddingInfo.weddingHallAddress', value.address);
    setShowAddressModal(false);
  };

  const setHour = (value: string) => {
    setValue('weddingInfo.time.hour', value);
  };

  const setMinute = (value: string) => {
    setValue('weddingInfo.time.minute', value);
  };

  const setDate = (value: string) => {
    const formattedValue = formatDate(value);
    setValue('weddingInfo.date', formattedValue);
  };

  return (
    <>
      <div className='flex flex-col gap-[8px] text-[12px] text-gray-900 max-w-[312px] mb-[16px]'>
        <div className='grid grid-cols-[76px_1fr] items-center'>
          <label className='leading-[32px] text-[14px] text-gray-700 font-medium'>예식일</label>
          <input
            {...register('weddingInfo.date', {
              onChange: (e) => setDate(e.target.value),
            })}
            placeholder='2024.11.21'
            className='w-[172px] desktop:w-[388px] h-[32px] rounded-[8px] border-[.5px] border-gray-300 px-[8px] py-[9px]'
            maxLength={12}
          />
        </div>
        <div className='grid grid-cols-[76px_1fr] items-center'>
          <label className='leading-[32px] text-[14px] text-gray-700 font-medium'>예식 시간</label>
          <div className='flex gap-[8px]'>
            <SelectBox
              onSelect={setHour}
              optionList={HOURS_FOR_WEDDING_INFO}
              value={time.hour}
              width='w-[92px] desktop:w-[96px]'
              limitOptionHeight='128px'
              backgroundColor='#000000'
            />
            <SelectBox
              onSelect={setMinute}
              optionList={MINUTES_FOR_WEDDING_INFO}
              value={time.minute}
              width='w-[72px] desktop:w-[88px]'
              backgroundColor='#000000'
            />
          </div>
        </div>
      </div>
      <h3 className='text-gray-900 text-[18px] font-bold mb-[14px]'>예식 장소</h3>
      <div className='flex flex-col gap-[8px] text-[14px] text-gray-700 font-medium'>
        <div className='grid grid-cols-[80px_1fr]'>
          <label className='leading-[32px]'>주소</label>
          <div className='grid grid-cols-[1fr_auto] desktop:grid-cols-[308px_1fr] gap-[8px]'>
            <input
              readOnly={true}
              placeholder='주소를 검색해주세요.'
              className='h-[32px] rounded-[8px] border-[.5px] border-gray-300 px-[8px] py-[9px] overflow-hidden'
              {...register('weddingInfo.weddingHallAddress')}
            />
            <button
              className='bg-primary-300 rounded-[8px] w-[56px] desktop:w-[72px] h-[32px] text-white font-bold text-[16px] tracking-[-0.032px]'
              onClick={openAddressModal}
              type='button'
            >
              검색
            </button>
            {showAddressModal && <AddressModal onComplete={setAddress} />}
          </div>
        </div>
        <div className='grid grid-cols-[80px_1fr]'>
          <label className='leading-[32px]'>예식장명</label>
          <input
            className='w-[235px] desktop:w-[388px] h-[32px] rounded-[8px] border-[.5px] border-gray-300 px-[8px] py-[9px]'
            {...register('weddingInfo.weddingHallName')}
            maxLength={21}
            placeholder='예식장명을 입력해주세요.'
          />
        </div>
        <div className='grid grid-cols-[80px_1fr]'>
          <label className='text-[14px] text-gray-700 font-medium leading-[32px]'>연락처</label>
          <input
            className='w-[172px] desktop:w-[308px] h-[32px] rounded-[8px] border-[.5px] border-gray-300 px-[8px] py-[9px] text-gray-400 text-[12px]'
            placeholder='예식장 연락처를 입력해주세요.'
            {...register('weddingInfo.weddingHallContact')}
            maxLength={15}
          />
        </div>
      </div>
    </>
  );
};

export default WeddingInfoInput;
