'use client';

import GuestBook from '@/components/guestbook/GuestBook';
import { Control, useWatch } from 'react-hook-form';
import { InvitationFormType } from '@/types/invitationFormType.type';
import EventStatus from '../EventStatus';

const GuestInfoPreview = ({ control }: { control: Control<InvitationFormType> }) => {
  const attendanceButton = useWatch({
    control,
    name: 'attendance',
  });
  const guestBookButton = useWatch({
    control,
    name: 'guestbook',
  });
  const dDayCount = useWatch({
    control,
    name: 'dDay',
  });
  const weddingInfoDate = useWatch({
    control,
    name: 'weddingInfo',
  });
  const mainPhotoInfo = useWatch({
    control,
    name: "mainPhotoInfo"
  })
  return (
    <>
      {guestBookButton && <GuestBook />}
      <EventStatus
        attendanceButton={attendanceButton}
        dDayCount={dDayCount}
        weddingInfoDate={weddingInfoDate.date}
        leftName={mainPhotoInfo.leftName}
        rightName={mainPhotoInfo.rightName}
        icon={mainPhotoInfo.icon}
      />
    </>
  );
};

export default GuestInfoPreview;
