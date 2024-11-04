'use client';

import { useState } from 'react';
import { PersonalInfo } from './PersonalInfo';
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
    <div className='flex flex-col gap-5 items-center justify-center w-full mt-[28px]'>
      <div className='relative w-[221px] h-[31px] bg-gray-100 rounded-full p-1 flex items-center cursor-pointer'>
        <div
          className={`absolute top-0 left-0 w-[46%] h-full bg-[#FF6666] rounded-full transition-transform duration-300 ease-in-out ${
            personalInfoType === 'bride' ? 'translate-x-[117%]' : ''
          }`}
        ></div>
        <button
          type='button'
          onClick={() => handleButtonClick('groom')}
          className={`z-10 w-[50%] h-[30px] rounded-full transition-colors duration-300 ease-in-out ${
            personalInfoType === 'groom' ? 'text-white' : 'text-[#8c8c8c]'
          } mr-6`}
        >
          신랑측 정보
        </button>
        <button
          type='button'
          onClick={() => handleButtonClick('bride')}
          className={`z-10 w-[50%] h-[30px] rounded-full transition-colors duration-300 ease-in-out ${
            personalInfoType === 'bride' ? 'text-white' : 'text-[#8c8c8c]'
          }`}
        >
          신부측 정보
        </button>
      </div>
      <PersonalInfo type={personalInfoType} />
    </div>
  );
};

export default PersonalInfoInput;
