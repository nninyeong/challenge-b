'use client';

import { Control, useWatch } from 'react-hook-form';
import { InvitationFormType } from '@/types/invitationFormType.type';
import CreateGuestInfo from '@/components/create/CreateGuestInfo';

const GuestInfoPreview = ({ control }: { control: Control<InvitationFormType> }) => {
  const attendance = useWatch({
    control,
    name: 'attendance',
  });
  const guestbook = useWatch({
    control,
    name: 'guestbook',
  });
  const dDay = useWatch({
    control,
    name: 'dDay',
  });
  const weddingInfo = useWatch({
    control,
    name: 'weddingInfo',
  });
  const mainPhotoInfo = useWatch({
    control,
    name: 'mainPhotoInfo',
  });
  return (
    <CreateGuestInfo
      attendance={attendance}
      guestbook={guestbook}
      dDay={dDay}
      weddingInfo={weddingInfo}
      mainPhotoInfo={mainPhotoInfo}
    />
  );
};

export default GuestInfoPreview;
