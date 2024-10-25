'use client';

import useAttendanceModal from '@/hooks/modals/useAttendanceModal';

const AttendanceModal: React.FC<{ invitationId: string; onClick: () => void }> = ({ invitationId, onClick }) => {
  const {
    personType,
    mealOption,
    name,
    attendanceCount,
    handlePersonTypeChange,
    handleMealOptionChange,
    handleNameChange,
    handleAttendanceCountChange,
    handleAttendanceModalSubmit,
  } = useAttendanceModal(invitationId, onClick);

  return (
    <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black/80'>
      <div className='bg-white text-black w-[350px] h-auto p-4 rounded-md'>
        <div
          className='cursor-pointer'
          onClick={onClick}
        >
          X
        </div>
        <form onSubmit={handleAttendanceModalSubmit}>
          <div className='grid grid-cols-2 gap-4'>
            <label className='col-span-2 font-semibold'>구분</label>
            <div>
              <label>
                <input
                  type='radio'
                  value='신랑'
                  checked={personType === '신랑'}
                  onChange={handlePersonTypeChange}
                />
                신랑
              </label>
            </div>
            <div>
              <label>
                <input
                  type='radio'
                  value='신부'
                  checked={personType === '신부'}
                  onChange={handlePersonTypeChange}
                />
                신부
              </label>
            </div>

            <label className='col-span-2 font-semibold'>성함</label>
            <input
              className='border-gray-500 border outline-none col-span-2 p-1'
              value={name}
              onChange={handleNameChange}
            />

            <label className='col-span-2 font-semibold'>참석인원</label>
            <input
              className='border-gray-500 border outline-none col-span-2 p-1'
              type='number'
              value={attendanceCount}
              onChange={handleAttendanceCountChange}
              placeholder='0-100'
              min={0}
              max={100}
            />

            <label className='col-span-2 font-semibold'>식사 여부</label>
            <div>
              <label>
                <input
                  type='radio'
                  value='예정'
                  checked={mealOption === '예정'}
                  onChange={handleMealOptionChange}
                />
                예정
              </label>
            </div>
            <div>
              <label>
                <input
                  type='radio'
                  value='안함'
                  checked={mealOption === '안함'}
                  onChange={handleMealOptionChange}
                />
                안함
              </label>
            </div>
          </div>
          <button className='mt-4 bg-blue-500 text-white py-2 px-4 rounded'>참석 의사 전달하기</button>
        </form>
      </div>
    </div>
  );
};

export default AttendanceModal;
