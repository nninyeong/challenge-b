'use client';

import { useEffect } from 'react';
import useAttendanceModal from '@/hooks/attendance/useAttendanceModal';

const AttendanceModal: React.FC<{ invitationId: string; onClick: () => void }> = ({ invitationId, onClick }) => {
  const { register, handleSubmit, handleAttendanceModalSubmit, errors } = useAttendanceModal(invitationId, onClick);

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
          className='cursor-pointer'
          onClick={onClick}
        >
          X {/* @TODO 나중에 아이콘으로 변경 필요 */}
        </div>
        <form onSubmit={handleSubmit(handleAttendanceModalSubmit)}>
          <div className='grid grid-cols-2 gap-4'>
            <label className='col-span-2 font-semibold'>구분</label>
            <div>
              <label>
                <input
                  type='radio'
                  value='신랑'
                  {...register('personType')}
                />
                신랑
              </label>
            </div>
            <div>
              <label>
                <input
                  type='radio'
                  value='신부'
                  {...register('personType')}
                />
                신부
              </label>
            </div>
            {errors.personType && <span>{errors.personType.message}</span>}
            <label className='col-span-2 font-semibold'>성함</label>
            <input
              className='border-gray-500 border outline-none col-span-2 p-1'
              {...register('name')}
            />
            {errors.name && <span>{errors.name.message}</span>}
            <label className='col-span-2 font-semibold'>참석인원</label>
            <input
              className='border-gray-500 border outline-none col-span-2 p-1'
              type='number'
              {...register('attendanceCount', {
                valueAsNumber: true,
              })}
              placeholder='0-100'
            />
            {errors.attendanceCount && <span>{errors.attendanceCount.message}</span>}
            <label className='col-span-2 font-semibold'>식사 여부</label>
            <div>
              <label>
                <input
                  type='radio'
                  value='예정'
                  {...register('mealOption')}
                />
                예정
              </label>
            </div>
            <div>
              <label>
                <input
                  type='radio'
                  value='안함'
                  {...register('mealOption')}
                />
                안함
              </label>
            </div>
            {errors.mealOption && <span>{errors.mealOption.message}</span>}
          </div>
          <button className='mt-4 bg-blue-500 text-white py-2 px-4 rounded'>참석 의사 전달하기</button>
        </form>
      </div>
    </div>
  );
};

export default AttendanceModal;
