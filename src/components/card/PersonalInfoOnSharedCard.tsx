'use client';
import { InvitationFormType } from '@/types/invitationFormType.type';
import PersonalInfoCard from '../create/preview/PersonalInfoCard';

type PersonalInfoOnSharedCardPropsType = Pick<InvitationFormType, 'personalInfo'>;
const PersonalInfoOnSharedCard = ({ personalInfo }: PersonalInfoOnSharedCardPropsType) => {
  const { bride, groom } = personalInfo;

  return (
    <div className='flex flex-col justify-center items-center gap-[30px]'>
      <div className='flex gap-[50px]'>
        <div className='flex flex-col gap-[30px]'>
          <div className='flex flex-col justify-center items-center mb-[30px]'>
            <PersonalInfoCard
              label={groom.relation}
              name={groom.name}
              phoneNumber={groom.phoneNumber}
            />
          </div>
          <p className='text-center'>신랑 측 혼주</p>
          <div className='flex flex-col gap-[42px]'>
            <PersonalInfoCard
              label={groom.father.relation}
              name={groom.father.isDeceased ? `故 ${groom.father.name}` : groom.father.name}
              phoneNumber={groom.father.phoneNumber}
            />
            <PersonalInfoCard
              label={groom.mother.relation}
              name={groom.mother.isDeceased ? `故 ${groom.mother.name}` : groom.mother.name}
              phoneNumber={groom.mother.phoneNumber}
            />
          </div>
        </div>

        <div className='flex flex-col gap-[30px]'>
          <div className='flex flex-col justify-center items-center mb-[30px]'>
            <PersonalInfoCard
              label={bride.relation}
              name={bride.name}
              phoneNumber={bride.phoneNumber}
            />
          </div>
          <p className='text-center'>신부 측 혼주</p>
          <div className='flex flex-col gap-[42px]'>
            <PersonalInfoCard
              label={bride.father.relation}
              name={bride.father.isDeceased ? `故 ${bride.father.name}` : bride.father.name}
              phoneNumber={bride.father.phoneNumber}
            />
            <PersonalInfoCard
              label={bride.mother.relation}
              name={bride.mother.isDeceased ? `故 ${bride.mother.name}` : bride.mother.name}
              phoneNumber={bride.mother.phoneNumber}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoOnSharedCard;
