'use client';

import { useEffect, useState } from 'react';
import useAttendanceModal from '@/hooks/attendance/useAttendanceModal';

const AttendanceModal: React.FC<{ invitationId: string; onClick: () => void }> = ({ invitationId, onClick }) => {
  const { register, handleSubmit, handleAttendanceModalSubmit, errors } = useAttendanceModal(invitationId, onClick);
  const [selected, setSelected] = useState('');

  const handleSelection = (value: string) => {
    setSelected(value);
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black/80 z-20'>
      <div className='bg-white text-black w-[343px] h-auto p-4 rounded-md'>
        <div
          className='cursor-pointer flex justify-end'
          onClick={onClick}
        >
          <img
            src='/assets/images/icons/x-03.svg'
            alt='x'
            className='w-[24px] h-[24px]'
          />
        </div>
        <div className='flex flex-col justify-center items-center'>
          <div className='flex justify-center mb-6'>
            <img
              src='/assets/images/check-broken.svg'
              alt='attendanceImg'
            />
          </div>
          <div className='w-[240px] text-center mb-[30px] text-[20px] text-primary300'>
            참석 여부를 통해 특별한 날 함께하실지 알려 주세요.
          </div>
        </div>
        <form onSubmit={handleSubmit(handleAttendanceModalSubmit)}>
          <div>
            <div className='flex items-center gap-2 mb-2'>
              <input
                className='border-gray-500 border outline-none col-span-2 p-2 w-[77px] h-8 text-[12px] rounded-lg'
                placeholder='성함'
                {...register('name')}
              />
              {errors.name && <span>{errors.name.message}</span>}
              <select
                className='border-gray-500 border outline-none col-span-2 p-2 w-[77px] h-8 text-[12px] rounded-lg'
                {...register('attendanceCount', {
                  valueAsNumber: true,
                })}
              >
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
              </select>
              {errors.attendanceCount && <span>{errors.attendanceCount.message}</span>}
              <div>
                <label className='text-[14px] text-gray-600 flex items-center cursor-pointer ml-2'>
                  <input
                    type='checkbox'
                    className='hidden peer'
                    {...register('mealOption')}
                  />
                  <img
                    src='/assets/images/icons/selected-on.svg'
                    alt='식사여부 활성화'
                    className='peer-checked:inline hidden'
                  />
                  <img
                    src='/assets/images/icons/selected-off.svg'
                    alt='식사여부 비활성화'
                    className='peer-checked:hidden inline'
                  />
                  <span className='ml-2'>식사여부</span>
                </label>
              </div>
              {errors.mealOption && <span>{errors.mealOption.message}</span>}
            </div>
            <div className='flex w-full justify-between'>
              <div className='relative'>
                <label
                  className='cursor-pointer'
                  onClick={() => handleSelection('신랑')}
                >
                  <input
                    type='radio'
                    value='신랑'
                    {...register('personType')}
                    className='hidden'
                  />
                  <div
                    className={`flex justify-center items-center gap-1 w-[152px] h-10 border border-gray-300 rounded-md text-[14px] text-gray-500 ${selected === '신랑' ? 'text-primary300 border-primary300' : ''}`}
                  >
                    <img
                      src='/assets/images/icons/attendance-groom.svg'
                      alt='신랑'
                      className='peer-checked:hidden inline'
                    />
                    <span className='pt-1'>신랑측</span>
                  </div>
                </label>
              </div>
              <div className='relative'>
                <label
                  className='cursor-pointer'
                  onClick={() => handleSelection('신부')}
                >
                  <input
                    type='radio'
                    value='신부'
                    {...register('personType')}
                    className='hidden'
                  />
                  <div
                    className={`flex justify-center items-center gap-1 w-[152px] h-10 border border-gray-300 rounded-md text-[14px] text-gray-500 ${selected === '신부' ? 'text-primary300 border-primary300' : ''}`}
                  >
                    <img
                      src='/assets/images/icons/attendance-bride.svg'
                      alt='신부'
                      className='peer-checked:hidden inline p-0'
                    />
                    <span className='pt-1'>신부측</span>
                  </div>
                </label>
              </div>
            </div>
            {errors.personType && <span>{errors.personType.message}</span>}
          </div>
          <button className='w-full h-12 mt-4 bg-primary300 text-white py-2 px-4 rounded-xl'>참석 의사 전달하기</button>
        </form>
      </div>
    </div>
  );
};

export default AttendanceModal;
