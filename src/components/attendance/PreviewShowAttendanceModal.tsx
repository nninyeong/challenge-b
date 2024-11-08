'use client';

import { useAttendanceContext } from '@/context/AttendanceContext';
import useInvitationIdByPathname from '@/hooks/invitation/useInvitationIdByPathname';
import AttendanceModal from './AttendanceModal';

const PreviewShowAttendanceModal = () => {
  const { isCreatePage, invitationId } = useInvitationIdByPathname();
  const { showModal, toggleModal } = useAttendanceContext();

  return (
    <>
      {showModal && (
        <AttendanceModal
          invitationId={invitationId}
          onClick={toggleModal}
          isCreatePage={isCreatePage}
        />
      )}
    </>
  );
};

export default PreviewShowAttendanceModal;
