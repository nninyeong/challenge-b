'use client';

import useAttendanceButton from '@/hooks/attendance/useAttendanceButton';
import AttendanceModal from './AttendanceModal';

const AttendanceButton = () => {
  const { showModal, handleModalClick } = useAttendanceButton();
  const invitationId = '6ae529a2-725d-4e2d-ac26-07bd9e86aa34'; // @TODO 추후 청첩장 id를 넣는 방식으로 변경

  return (
    <>
      <div
        className='px-4 py-3 cursor-pointer text-center bg-primary300 text-white rounded-xl'
        onClick={handleModalClick}
      >
        참여의사 전달하기
      </div>
      {showModal && (
        <AttendanceModal
          invitationId={invitationId}
          onClick={handleModalClick}
        />
      )}
    </>
  );
};

export default AttendanceButton;
