'use client';

import { useState } from 'react';

const ONBOARDING_MOCK_DATA = [
  { title: '스크롤 해주세요' },
  { title: '스크롤 시 입력폼 업데이트' },
  { title: '접고 펼치며 자유롭게 제작해요' },
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
    if (onBoardStep < ONBOARDING_MOCK_DATA.length - 1) {
      setOnBoardStep((prev) => prev + 1);
    } else {
      setIsOnboardingComplete(true);
    }
  };
  return (
    <div
      onClick={handleNextStep}
      className={`${isOnboardingComplete ? 'hidden' : 'flex'} inset-0 bg-gradient-to-b from-transparent text-white
      to-black overflow-hidden absolute flex-col items-center justify-end w-full h-full text-center cursor-pointer bg-opacity-60`}
    >
      <h2>{ONBOARDING_MOCK_DATA[onBoardStep].title}</h2>
    </div>
  );
};

export default OnBoarding;
