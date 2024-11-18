'use client';
import { useInvitationFormActions } from '@/hooks/create/useInvitationFormActions';
import { OrderList, StepType } from '@/hooks/create/useFormStepController';
import { InvitationFormType } from '@/types/invitationFormType.type';
import { UseFormReturn } from 'react-hook-form';
import { useEffect, useRef, useState } from 'react';
import Button from '../ui/Button';
import { useRouter } from 'next/navigation';
import {
  NAVIGATION_BUTTON_CONTAINER_HEIGHT,
  NAVIGATION_BUTTON_HALF_WIDTH,
  SUBMIT_BUTTON_MARGIN_RIGHT,
} from '@/constants/invitationDesktopForm';

type DesktopInputPropsType = {
  methods: UseFormReturn<InvitationFormType>;
  orderList: OrderList[];
  isNavigating: { current: boolean };
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  currentStep: StepType;
};

type InputHeightsType = {
  currentContentHeight: number;
  prevContentHeight: number;
};

type FormPositionType = {
  left: number;
  width: number;
  top: number;
};

const DesktopInputForm = ({
  methods,
  orderList,
  isNavigating,
  currentStep,
  goToNextStep,
  goToPreviousStep,
}: DesktopInputPropsType) => {
  const { onSubmit, handleDebouncedNext, handleDebouncedPrevious } = useInvitationFormActions({
    isNavigating,
    methods,
    goToNextStep,
    goToPreviousStep,
  });
  const [windowHeight, setWindowHeight] = useState(0);
  const [currentOffset, setCurrentOffset] = useState(0);
  const [inputHeights, setInputHeights] = useState<InputHeightsType>({
    currentContentHeight: 0,
    prevContentHeight: 0,
  });

  const [formPosition, setFormPosition] = useState<FormPositionType>({ left: 0, top: 0, width: 0 });
  const inputHeightRef = useRef<{ [key: string]: { height: number | undefined } }>({});
  const formRef = useRef<HTMLFormElement | null>(null);

  const router = useRouter();

  const handleNextButton = () => {
    handleDebouncedNext();
    setCurrentOffset((prev) => prev + inputHeights.currentContentHeight + 24);
  };

  const handlePrevButton = () => {
    handleDebouncedPrevious();
    setCurrentOffset((prev) => prev - (inputHeights.prevContentHeight + 24));
  };

  const handleExitButton = () => {
    router.back();
  };

  const getFormPosition = () => {
    if (formRef.current) {
      const { left, top, width } = formRef.current.getBoundingClientRect();
      setFormPosition({ left, top, width });
    }
  };

  const getCurrentElementHeight = () => {
    const currentName = orderList[currentStep.currentPreviewStep].name[currentStep.currentInputStep];
    const currentElement = inputHeightRef.current[currentName];
    if (currentElement.height) {
      setInputHeights((prev) => {
        return {
          ...prev,
          currentContentHeight: currentElement.height!,
        };
      });
    }
  };

  const getPreviousInputHeight = () => {
    if (currentStep.currentInputStep > 0) {
      const prevName = orderList[currentStep.currentPreviewStep]?.name[currentStep.currentInputStep - 1];
      return inputHeightRef.current[prevName]?.height || 0;
    }
    if (currentStep.currentPreviewStep > 0) {
      const prevPreview = orderList[currentStep.currentPreviewStep - 1]?.name.slice(-1)[0];
      return inputHeightRef.current[prevPreview]?.height || 0;
    }
    return 0;
  };

  useEffect(() => {
    setInputHeights((prev) => {
      return {
        ...prev,
        prevContentHeight: getPreviousInputHeight(),
      };
    });
  }, [currentStep, orderList]);

  useEffect(() => {
    getFormPosition();
    window.addEventListener('resize', getFormPosition);
    return () => window.removeEventListener('resize', getFormPosition);
  }, []);

  useEffect(() => {
    setWindowHeight(Math.floor(window.innerHeight / 2));
  }, []);

  useEffect(() => {
    getCurrentElementHeight();
  }, [currentStep, orderList]);

  return (
    <form
      ref={formRef}
      className={`flex flex-col h-full relative w-full`}
      onSubmit={methods.handleSubmit(onSubmit)}
      style={{
        top: `${windowHeight / 2}px`,
      }}
    >
      <div
        className='fixed top-[23px] z-30 flex gap-[8px]'
        style={{
          left: `${formPosition.left + formPosition.width - SUBMIT_BUTTON_MARGIN_RIGHT}px`,
        }}
      >
        <button
          className='bg-gray-300 text-white rounded-[8px] py-[10px] px-[16px]'
          onClick={handleExitButton}
          type='button'
        >
          나가기
        </button>
        <Button
          className='rounded-[8px] px-[16px] py-[10px]'
          type='submit'
        >
          청첩장 제작완료
        </Button>
      </div>
      <div
        className='fixed z-30 flex justify-between flex-col left-[65%]'
        style={{
          height: NAVIGATION_BUTTON_CONTAINER_HEIGHT,
          top: `${windowHeight / 3}px`,
          left: `${formPosition.left + formPosition.width / 2 - NAVIGATION_BUTTON_HALF_WIDTH}px`,
        }}
      >
        <button
          type='button'
          className='w-[64px] h-[64px] bg-black bg-opacity-60 rounded-full flex-col-center'
          onClick={handlePrevButton}
          disabled={currentStep.currentInputStep === 0 && currentStep.currentPreviewStep === 0}
        >
          <img src='/assets/images/icons/up.svg' />
        </button>
        <button
          type='button'
          className='w-[64px] h-[64px] bg-black bg-opacity-60 rounded-full flex-col-center'
          onClick={handleNextButton}
          disabled={currentStep.currentPreviewStep === orderList.length - 1}
        >
          <img src='/assets/images/icons/down.svg' />
        </button>
      </div>

      <div
        className='flex flex-col gap-[24px] relative duration-500'
        style={{
          top: -currentOffset - 24,
        }}
      >
        {orderList.map((e, previewStep) => (
          <div
            key={e.labelForInput}
            className='w-full h-full flex flex-col justify-center items-center gap-[24px] reltaive'
          >
            {e.input.map((inputElement, inputStep) => {
              return (
                <div
                  key={e.name[inputStep]}
                  style={{
                    zIndex:
                      currentStep.currentPreviewStep === previewStep && currentStep.currentInputStep === inputStep
                        ? 30
                        : 0,
                  }}
                  className={`w-full h-full border-[1px] border-solid shadow-md rounded-[12px] px-[24px] py-[16px] relative bg-white`}
                  ref={(el) => {
                    inputHeightRef.current[e.name[inputStep]] = { height: el?.offsetHeight };
                  }}
                >
                  <p className='text-gray-900 text-[18px] font-bold mb-[14px]'>{e.name[inputStep]}</p>
                  {inputElement}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </form>
  );
};

export default DesktopInputForm;
