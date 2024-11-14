'use client';

import { useState } from 'react';
import OnBoardingStepMotion from './OnBoardingStepMotion';
import { MOBILE_VIEW_HEIGHT } from '@/constants/screenSize';
import Image from 'next/image';

const ONBOARDING_MESSAGE_DATA: string[] = [
  '스크롤 해주세요',
  '스크롤 시 입력폼 업데이트',
  '접고 펼치며 자유롭게 제작해요',
] as const;

const ONBOARDING_STEP: string[] = ['STEP 1', 'STEP 2', 'STEP 3'];
const ONBOARDING_STEP_MESSAGE: string[] = [
  '화면을 터치하여 다음 단계로 이동하세요',
  '화면을 터치하여 다음 단계로 이동하세요',
  '화면을 터치하여 드림카드 제작을 시작하세요',
];

const OnBoarding = ({
  isOnboardingComplete,
  setIsOnboardingComplete,
}: {
  isOnboardingComplete: boolean;
  setIsOnboardingComplete: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [onBoardStep, setOnBoardStep] = useState<number>(0);
  const handleNextStep = () => {
    if (onBoardStep < ONBOARDING_MESSAGE_DATA.length - 1) {
      setOnBoardStep((prev) => prev + 1);
    } else {
      setIsOnboardingComplete(true);
    }
  };

  return (
    <div
      onClick={handleNextStep}
      className={`${isOnboardingComplete ? 'hidden' : 'flex'} inset-0 fixed flex-col items-center mx-auto text-white text-center cursor-pointer bg-opacity-80 py-5 z-50 mobile:max-w-mobile 
      desktop:max-w-desktop`}
      style={{ height: MOBILE_VIEW_HEIGHT }}
    >
      <div className='absolute inset-0 bg-gradient-to-b from-transparent to-black z-10'></div>

      <div className='absolute inset-0 z-0'>
        <Image
          src='/assets/images/presets/modernPreset1.svg'
          alt='온보딩 사진'
          layout='fill'
          objectFit='cover'
        />
      </div>

      <div className='relative z-20 text-center mt-24'>
        <p className='text-sm opacity-70'>{ONBOARDING_STEP[onBoardStep]}</p>
        <h2 className='font-semibold text-[24px] mt-1'>{ONBOARDING_MESSAGE_DATA[onBoardStep]}</h2>
      </div>

      <div className='absolute bottom-5 flex flex-col items-center z-20'>
        <div className='w-[60px] h-[100px] border-2 border-white border-solid rounded-lg flex justify-center items-end pb-2 mb-10'>
          <OnBoardingStepMotion step={onBoardStep} />
        </div>
        <p className='text-[14px] opacity-80'>{ONBOARDING_STEP_MESSAGE[onBoardStep]}</p>
      </div>
    </div>
  );
};

export default OnBoarding;
