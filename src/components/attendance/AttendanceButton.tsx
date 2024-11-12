'use client';

import useAttendanceButton from '@/hooks/attendance/useAttendanceButton';
import AttendanceModal from './AttendanceModal';
import useInvitationIdByPathname from '@/hooks/invitation/useInvitationIdByPathname';

const AttendanceButton = () => {
  const { isCreatePage, invitationId } = useInvitationIdByPathname();
  const { showModal, openAttendanceModal, closeAttendanceModal } = useAttendanceButton();

  return (
    <>
      <div
        className='px-4 py-3 cursor-pointer text-center bg-primary300 text-white rounded-xl whitespace-nowrap'
        onClick={openAttendanceModal}
      >
        참여의사 전달하기
      </div>
      {showModal && (
        <AttendanceModal
          invitationId={invitationId}
          onClick={closeAttendanceModal}
          isCreatePage={isCreatePage}
        />
      )}
    </>
  );
};

export default AttendanceButton;
