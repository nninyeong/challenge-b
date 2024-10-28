'use client';

import useAttendanceButton from '@/hooks/attendance/useAttendanceButton';
import AttendanceModal from './AttendanceModal';

const AttendanceButton = () => {
  const { showModal, handleModalClick } = useAttendanceButton();
  const invitationId = '6ae529a2-725d-4e2d-ac26-07bd9e86aa34'; // @TODO 추후 청첩장 id를 넣는 방식으로 변경

  return (
    <>
      <div
        className='cursor-pointer text-center'
        onClick={handleModalClick}
      >
        참석 여부 전달
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
