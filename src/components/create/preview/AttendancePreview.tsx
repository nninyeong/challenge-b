'use client';

import AttendanceButton from '@/app/components/AttendanceButton';
import GuestBook from '@/app/components/GuestBook';
import { Control, useWatch } from 'react-hook-form';
import { InvitationFormType } from '@/types/invitationFormType.type';

const AttendancePreview = ({ control }: { control: Control<InvitationFormType> }) => {
  const attendanceButton = useWatch({
    control,
    name: 'attendance',
  });
  const guestBookButton = useWatch({
    control,
    name: 'guestbook',
  });
  return (
    <>
      {attendanceButton && <AttendanceButton />}
      {guestBookButton && <GuestBook />}
    </>
  );
};

export default AttendancePreview;
