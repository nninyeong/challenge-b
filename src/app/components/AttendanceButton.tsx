'use client';

import AttendanceModal from './AttendanceModal';
import useAttendanceButton from '@/hooks/modals/useAttendanceButton';

const AttendanceButton = () => {
  const { showModal, handleModalClick } = useAttendanceButton();
  const invitationId = '4cf95008-dd98-4810-875b-354cd38a6505'; // 추후 청첩장 id를 넣는 방식으로 변경

  return (
    <>
      <div
        className='cursor-pointer'
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
