'use client';

import { useState } from 'react';
import OnBoardingStepMotion from './OnBoardingStepMotion';
const ONBOARDING_MESSAGE_DATA: string[] = [
  '스크롤 해주세요',
  '스크롤 시 입력폼 업데이트',
  '접고 펼치며 자유롭게 제작해요',
] as const;
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
      className={`${isOnboardingComplete ? 'hidden' : 'flex'} inset-0 bg-gradient-to-b from-transparent text-white
      to-black overflow-hidden absolute flex-col items-center justify-end w-full h-full text-center cursor-pointer bg-opacity-60 py-5`}
    >
      <div className='w-[60px] h-[100px] border-2 border-white border-solid rounded-lg flex justify-center items-end pb-2'>
        <OnBoardingStepMotion step={onBoardStep} />
      </div>
      <h2 className='font-semibold text-[24px] mt-5'>{ONBOARDING_MESSAGE_DATA[onBoardStep]}</h2>
    </div>
  );
};

export default OnBoarding;
