'use client';
import { useFormContext } from 'react-hook-form';
import { Address } from 'react-daum-postcode';
import { useState } from 'react';
import AddressModal from '@/components/create/modal/AddressModal';

const HOURS_FOR_WEDDING_INFO = [
  '오전 07시',
  '오전 08시',
  '오전 09시',
  '오전 10시',
  '오전 11시',
  '낮 12시',
  '오후 1시',
  '오후 2시',
  '오후 3시',
  '오후 4시',
  '오후 6시',
  '오후 7시',
];

const MINUTES_FOR_WEDDING_INFO = ['00분', '30분'];

const WeddingInfoInput = () => {
  const { register, setValue } = useFormContext();

  const [showAddressModal, setShowAddressModal] = useState(false);
  const openAddressModal = () => {
    document.body.style.overflow = 'hidden';
    setShowAddressModal(true);
  };

  const setAddress = (value: Address) => {
    setValue('weddingInfo.weddingHallAddress', value.address);
    document.body.style.overflow = 'auto';
    setShowAddressModal(false);
  };

  return (
    <div className='flex flex-col gap-[8px]'>
      <h3 className='font-bold'>예식 일시</h3>
      <div className='grid grid-cols-[80px_1fr]'>
        <label className='leading-[32px]'>예식일</label>
        <input
          {...register('weddingInfo.date')}
          placeholder='2024-11-21'
          className='h-[32px] rounded pl-3'
        />
      </div>
      <div className='grid grid-cols-[80px_1fr]'>
        <label>예식 시간</label>
        <div className='flex gap-[8px]'>
          <select
            {...register('weddingInfo.time.hour')}
            className='h-[32px] rounded flex-1'
            defaultValue='00'
          >
            {HOURS_FOR_WEDDING_INFO.map((hour) => (
              <option
                key={`hour${hour}`}
                value={hour}
              >
                {hour}
              </option>
            ))}
          </select>
          <select
            {...register('weddingInfo.time.minute')}
            className='h-[32px] rounded flex-1'
            defaultValue='00'
          >
            {MINUTES_FOR_WEDDING_INFO.map((minute) => (
              <option
                key={minute}
                value={minute}
              >
                {minute}
              </option>
            ))}
          </select>
        </div>
      </div>
      <h3 className='font-bold'>예식 장소</h3>
      <div className='grid grid-cols-[80px_1fr]'>
        <label className='leading-[32px]'>주소</label>
        <div className='grid grid-cols-[1fr_auto] gap-[8px]'>
          <input
            readOnly={true}
            placeholder='주소를 검색해주세요.'
            className='h-[32px] rounded pl-3 min-w-0'
            {...register('weddingInfo.weddingHallAddress')}
          />
          <button
            className='bg-primary-300 rounded w-[55px] h-[32px] text-white font-bold'
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
          className='h-[32px] rounded pl-3'
          {...register('weddingInfo.weddingHallName')}
        />
      </div>
      <div className='grid grid-cols-[80px_1fr]'>
        <label className='leading-[32px]'>연락처</label>
        <input
          className='h-[32px] rounded pl-3'
          placeholder='연락처를 입력해주세요.'
          {...register('weddingInfo.weddingHallContact')}
        />
      </div>
    </div>
  );
};

export default WeddingInfoInput;
