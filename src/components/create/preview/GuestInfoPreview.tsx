'use client';

import { Control, useWatch } from 'react-hook-form';
import { InvitationFormType } from '@/types/invitationFormType.type';
import GuestInfo from '@/components/card/GuestInfo';

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
  return (
    <GuestInfo
      attendance={attendance}
      guestbook={guestbook}
      dDay={dDay}
      weddingInfo={weddingInfo}
    />
  );
};

export default GuestInfoPreview;
