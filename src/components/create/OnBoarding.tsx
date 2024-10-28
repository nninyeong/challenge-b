'use client';

import { useState } from 'react';

const ONBOARDING_MOCK_DATA = [
  { title: 'Welcome!', description: 'This is the first onboarding screen.' },
  { title: 'Features', description: "Learn about our app's features." },
  { title: 'Get Started', description: "Let's get started using the app!" },
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
      className={`${isOnboardingComplete ? 'hidden' : 'flex'}  overflow-hidden absolute flex-col items-center justify-center w-full h-screen text-center cursor-pointer bg-black bg-opacity-50`}
    >
      <h2>{ONBOARDING_MOCK_DATA[onBoardStep].title}</h2>
      <p>{ONBOARDING_MOCK_DATA[onBoardStep].description}</p>
      <p>Tap or click to continue</p>
    </div>
  );
};

export default OnBoarding;
