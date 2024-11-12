'use client';
import { Control, useWatch } from 'react-hook-form';
import { InvitationFormType } from '@/types/invitationFormType.type';
import PersonalInfoOnSharedCard from '@/components/card/PersonalInfoOnSharedCard';

const PersonalInfoPreview = ({ control }: { control: Control<InvitationFormType> }) => {
  const [personalInfo, fontInfo] = useWatch({
    control,
    name: ['personalInfo', 'fontInfo'],
  });

  return (
    <PersonalInfoOnSharedCard
      personalInfo={personalInfo}
      fontInfo={fontInfo}
    />
  );
};

export default PersonalInfoPreview;
