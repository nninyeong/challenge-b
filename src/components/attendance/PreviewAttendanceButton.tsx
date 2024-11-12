'use client';

import { useAttendanceContext } from '@/context/AttendanceContext';

const PreviewAttendanceButton = () => {
  const { toggleModal } = useAttendanceContext();

  return (
    <div
      className='px-4 py-3 cursor-pointer text-center text-[16px] font-bold font-main bg-primary300 text-white rounded-xl'
      onClick={toggleModal}
    >
      참여의사 전달하기
    </div>
  );
};

export default PreviewAttendanceButton;
