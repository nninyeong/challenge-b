'use client';
import { FormType } from '@/app/create/card/page';
import { Control, useWatch } from 'react-hook-form';
import PersonalInfoCard from '../PersonalInfoCard';

const PersonalInfoPreview = ({ control }: { control: Control<FormType> }) => {
  const personaInfoWatch = useWatch({
    control,
    name: 'personalInfo',
  });

  return (
    <div className='flex flex-col justify-center items-center gap-[30px]'>
      <div className='flex gap-[50px]'>
        <div className='flex flex-col gap-[30px]'>
          <div className='flex flex-col justify-center items-center'>
            <p>신랑</p>
            <PersonalInfoCard
              label={null}
              name={personaInfoWatch.groom.name}
              phoneNumber={personaInfoWatch.groom.phoneNumber}
            />
          </div>
          <p className='text-center'>신랑 측 혼주</p>
          <PersonalInfoCard
            label='아버지'
            name={personaInfoWatch.groom.fatherName}
            phoneNumber={personaInfoWatch.groom.fatherPhoneNumber}
          />
          <PersonalInfoCard
            label='어머니'
            name={personaInfoWatch.groom.motherName}
            phoneNumber={personaInfoWatch.bride.motherPhoneNumber}
          />
        </div>

        <div className='flex flex-col gap-[30px]'>
          <div className='flex flex-col justify-center items-center'>
            <p>신부</p>
            <PersonalInfoCard
              label={null}
              name={personaInfoWatch.bride.name}
              phoneNumber={personaInfoWatch.bride.phoneNumber}
            />
          </div>
          <p className='text-center'>신랑 측 혼주</p>
          <PersonalInfoCard
            label='아버지'
            name={personaInfoWatch.bride.fatherName}
            phoneNumber={personaInfoWatch.bride.fatherPhoneNumber}
          />
          <PersonalInfoCard
            label='어머니'
            name={personaInfoWatch.bride.motherName}
            phoneNumber={personaInfoWatch.bride.motherPhoneNumber}
          />
        </div>
      </div>
    </div>
  );
};
export default PersonalInfoPreview;
