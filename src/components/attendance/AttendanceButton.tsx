'use client';

import useAttendanceButton from '@/hooks/attendance/useAttendanceButton';
import AttendanceModal from './AttendanceModal';
import { usePathname } from 'next/navigation';
import useInvitationIdByPathname from '@/hooks/invitation/useInvitationIdByPathname';

const AttendanceButton = () => {
  const { invitationId } = useInvitationIdByPathname();
  const { showModal, handleModalClick } = useAttendanceButton();

  return (
    <>
      <div
        className='cursor-pointer text-center bg-gray-500 text-black'
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
