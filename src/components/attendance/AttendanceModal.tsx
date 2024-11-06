'use client';

import { useEffect } from 'react';
import useAttendanceModal from '@/hooks/attendance/useAttendanceModal';
import SelectBox from '../ui/SelectBox';

const ATTENDANCE_PEOPLE = ['1', '2', '3', '4', '5'];

const AttendanceModal: React.FC<{ invitationId: string; onClick: () => void }> = ({ invitationId, onClick }) => {
  const { selected, handleSelection, register, setValue, watch, handleSubmit, handleAttendanceModalSubmit, errors } =
    useAttendanceModal(invitationId, onClick);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div
      className='fixed top-0 bottom-0 left-0 right-0 w-full h-full px-[16px] bg-[#404040]/50 flex justify-center items-center z-50'
      onClick={onClick}
    >
      <div
        className='bg-white text-black w-[343px] h-auto p-4 rounded-md'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='flex flex-col justify-center items-center'>
          <div className='flex justify-center mb-6'>
            <img
              src='/assets/images/check-broken.svg'
              alt=''
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
                className='border-gray-300 border outline-none col-span-2 p-2 w-[77px] h-8 text-[12px] rounded-lg'
                placeholder='성함'
                {...register('name')}
              />
              <SelectBox
                optionList={ATTENDANCE_PEOPLE}
                value={String(watch('attendanceCount') || '')}
                onSelect={(value) => {
                  setValue('attendanceCount', parseInt(value, 5));
                }}
                width='79px'
                backgroundColor='#000000'
              />
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
                      className='peer-checked:hidden inline w-[24px] h-[24px] p-0'
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
                      className='peer-checked:hidden inline p-0 w-[24px] h-[24px]'
                    />
                    <span className='pt-1'>신부측</span>
                  </div>
                </label>
              </div>
            </div>
          </div>
          {errors.name && <span className='text-red-500 text-[12px]'>{errors.name.message}</span>}
          <div className='flex gap-2 mt-4'>
            <button
              className='w-24 h-12 bg-gray-300 text-white py-2 px-4 rounded-xl'
              onClick={onClick}
            >
              취소
            </button>
            <button className='w-[207px] h-12 bg-primary300 text-white py-2 px-4 rounded-xl'>참석 의사 전달하기</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AttendanceModal;
