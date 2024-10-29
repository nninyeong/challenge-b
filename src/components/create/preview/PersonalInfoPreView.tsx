'use client';
import { Control, useWatch } from 'react-hook-form';
import PersonalInfoCard from '../PersonalInfoCard';
import { InvitationFormType } from '@/types/invitationFormType.type';

const PersonalInfoPreview = ({ control }: { control: Control<InvitationFormType> }) => {
  const personaInfoWatch = useWatch({
    control,
    name: 'personalInfo',
  });

  const groom = personaInfoWatch.groom || {};
  const bride = personaInfoWatch.bride || {};

  return (
    <div className='flex flex-col justify-center items-center gap-[30px]'>
      <div className='flex gap-[50px]'>
        <div className='flex flex-col gap-[30px]'>
          <div className='flex flex-col justify-center items-center'>
            <p>신랑</p>
            <PersonalInfoCard
              label={null}
              name={groom.name}
              phoneNumber={groom.phoneNumber}
            />
          </div>
          <p className='text-center'>신랑 측 혼주</p>
          <PersonalInfoCard
            label='아버지'
            name={groom.father?.name}
            phoneNumber={groom.father?.phoneNumber}
          />
          <PersonalInfoCard
            label='어머니'
            name={groom.mother?.name}
            phoneNumber={bride.mother?.phoneNumber}
          />
        </div>

        <div className='flex flex-col gap-[30px]'>
          <div className='flex flex-col justify-center items-center'>
            <p>신부</p>
            <PersonalInfoCard
              label={null}
              name={bride.name}
              phoneNumber={bride.phoneNumber}
            />
          </div>
          <p className='text-center'>신부 측 혼주</p>
          <PersonalInfoCard
            label='아버지'
            name={bride.father?.name}
            phoneNumber={bride.father?.phoneNumber}
          />
          <PersonalInfoCard
            label='어머니'
            name={bride.mother?.name}
            phoneNumber={bride.mother?.phoneNumber}
          />
        </div>
      </div>
    </div>
  );
};
export default PersonalInfoPreview;
