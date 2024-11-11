'use client';
import { useState } from 'react';

export type StepType = {
  currentPreviewStep: number;
  currentInputStep: number;
};

type OrderList = {
  order: number;
  component: React.JSX.Element[] | null | undefined;
  name: string[];
  input: React.JSX.Element[];
  typeOnSharedCard: string;
  labelForInput: string;
};

const useFormStepController = (orderList: OrderList[]) => {
  const [currentStep, setCurrentStep] = useState<StepType>({ currentPreviewStep: 0, currentInputStep: 0 });

  const goToNextStep = () => {
    const isLastInput = currentStep.currentInputStep >= orderList[currentStep.currentPreviewStep].input.length - 1;
    if (isLastInput) {
      setCurrentStep((prev) => {
        return { currentPreviewStep: prev.currentPreviewStep + 1, currentInputStep: 0 };
      });
    } else {
      setCurrentStep((prev) => {
        return { ...prev, currentInputStep: prev.currentInputStep + 1 };
      });
    }
  };
  const goToPreviousStep = () => {
    if (currentStep.currentInputStep > 0) {
      setCurrentStep((prev) => {
        return {
          ...prev,
          currentInputStep: prev.currentInputStep - 1,
        };
      });
    } else {
      setCurrentStep((prev) => {
        return { currentInputStep: getLastInputStepForPreview(), currentPreviewStep: prev.currentPreviewStep - 1 };
      });
    }
  };

  const getLastInputStepForPreview = () => {
    const previousStepInputLength = orderList[currentStep.currentPreviewStep - 1]?.input.length ?? 1;
    return previousStepInputLength - 1;
  };

  return {
    currentStep,
    setCurrentStep,
    goToNextStep,
    goToPreviousStep,
  };
};

export default useFormStepController;
