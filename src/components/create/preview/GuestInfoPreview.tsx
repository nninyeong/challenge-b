'use client';

import { Control, useWatch } from 'react-hook-form';
import { InvitationFormType } from '@/types/invitationFormType.type';
import CreateGuestInfo from '@/components/create/CreateGuestInfo';

const GuestInfoPreview = ({ control }: { control: Control<InvitationFormType> }) => {
  const [attendance, guestbook, dDay, weddingInfo, mainPhotoInfo] = useWatch({
    control,
    name: ['attendance', 'guestbook', 'dDay', 'weddingInfo', 'mainPhotoInfo'],
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
