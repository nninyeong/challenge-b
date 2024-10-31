'use client';
import { useState } from 'react';
import { PersonalInfo } from './preview/PersonalInfo';
import { useFormContext, useWatch } from 'react-hook-form';

const PersonalInfoInput = () => {
  const [personalInfoType, setPersonalInfoType] = useState<'groom' | 'bride'>('groom');
  const { control, setValue } = useFormContext();

  const groomInfo = useWatch({ control, name: 'personalInfo.groom' });
  const brideInfo = useWatch({ control, name: 'personalInfo.bride' });

  const handleButtonClick = (type: 'groom' | 'bride') => {
    setPersonalInfoType(type);
    if (type === 'groom') {
      setValue('personalInfo.groom', groomInfo);
    } else {
      setValue('personalInfo.bride', brideInfo);
    }
  };

  return (
    <div className='flex flex-col gap-5 items-center justify-center w-full mt-[60px]'>
      <div className='flex justify-center items-center gap-3'>
        <button
          type='button'
          onClick={() => handleButtonClick('groom')}
          className={`${personalInfoType === 'groom' ? 'bg-[#FF6666] text-white' : 'text-[#8c8c8c]'} rounded-full w-[101px] h-[30px]`}
        >
          신랑측 정보
        </button>
        <button
          type='button'
          onClick={() => handleButtonClick('bride')}
          className={`${personalInfoType === 'bride' ? 'bg-[#FF6666] text-white' : 'text-[#8c8c8c]'} rounded-full w-[101px] h-[30px]`}
        >
          신부측 정보
        </button>
      </div>
      <PersonalInfo type={personalInfoType} />
    </div>
  );
};

export default PersonalInfoInput;
