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
import Image from 'next/image';
import { createCardDesktopInputFormHeightMapper } from '@/utils/createCardFormHeightMapper';

type DesktopInputPropsType = {
  methods: UseFormReturn<InvitationFormType>;
  orderList: OrderList[];
  isNavigating: { current: boolean };
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  currentStep: StepType;
};

type InputOffsetTopType = {
  currentContentOffsetTop: number;
  prevContentOffsetTop: number;
};

type FormPositionType = {
  left: number;
  width: number;
  top: number;
};

const SCROLL_DELAY_TIME = 1000;
const SCROLL_GAP = 48;
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
  const [inputOffset, setInputOffset] = useState<InputOffsetTopType>({
    currentContentOffsetTop: 0,
    prevContentOffsetTop: 0,
  });
  const [formPosition, setFormPosition] = useState<FormPositionType>({ left: 0, top: 0, width: 0 });
  const inputHeightRef = useRef<{ [key: string]: { offsetTop: number | undefined } }>({});
  const formRef = useRef<HTMLFormElement | null>(null);
  const [isDisabled, setIsDisabled] = useState(false);
  const router = useRouter();
  const isFirstInput = currentStep.currentInputStep === 0 && currentStep.currentPreviewStep === 0;
  const isLastInput = currentStep.currentPreviewStep === orderList.length - 1;

  const getScrollDelay = () => {
    setIsDisabled(true);
    setTimeout(() => {
      setIsDisabled(false);
      isNavigating.current = false;
    }, SCROLL_DELAY_TIME);
  };

  const handleNextButton = () => {
    handleDebouncedNext();
    getScrollDelay();
  };

  const handlePrevButton = () => {
    handleDebouncedPrevious();
    getScrollDelay();
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

  const getCurrentElementOffsetTop = () => {
    const currentName = orderList[currentStep.currentPreviewStep].name[currentStep.currentInputStep];
    const currentElementOffsetTop = inputHeightRef.current[currentName].offsetTop;
    setInputOffset((prev) => {
      return {
        ...prev,
        currentContentOffsetTop: currentElementOffsetTop!,
      };
    });
  };

  const getPreviousInputOffsetTop = () => {
    if (currentStep.currentInputStep > 0) {
      const prevName = orderList[currentStep.currentPreviewStep]?.name[currentStep.currentInputStep - 1];
      return inputHeightRef.current[prevName]?.offsetTop || 0;
    }
    if (currentStep.currentPreviewStep > 0) {
      const prevPreview = orderList[currentStep.currentPreviewStep - 1]?.name.slice(-1)[0];
      return inputHeightRef.current[prevPreview]?.offsetTop || 0;
    }
    return 0;
  };

  useEffect(() => {
    setInputOffset((prev) => {
      return {
        ...prev,
        prevContentOffsetTop: getPreviousInputOffsetTop(),
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
    getCurrentElementOffsetTop();
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
        className={`fixed z-30 flex ${isFirstInput ? 'justify-end' : 'justify-between'} flex-col`}
        style={{
          height: NAVIGATION_BUTTON_CONTAINER_HEIGHT,
          top: `${windowHeight / 3}px`,
          left: `${formPosition.left + formPosition.width / 2 - NAVIGATION_BUTTON_HALF_WIDTH}px`,
        }}
      >
        {!isFirstInput ? (
          <button
            type='button'
            className='w-[64px] h-[64px] bg-black bg-opacity-60 rounded-full flex-col-center'
            onClick={handlePrevButton}
            disabled={isDisabled}
          >
            <Image
              alt='up'
              src='/assets/images/icons/up.png'
              width={32}
              height={16}
            />
          </button>
        ) : (
          <></>
        )}
        {!isLastInput && (
          <button
            type='button'
            className='w-[64px] h-[64px] bg-black bg-opacity-60 rounded-full flex-col-center'
            onClick={handleNextButton}
            disabled={isDisabled}
          >
            <Image
              alt='down'
              src='/assets/images/icons/down.png'
              width={32}
              height={16}
            />
          </button>
        )}
      </div>

      <div
        className='flex flex-col gap-[24px] relative duration-700'
        style={{
          top: -inputOffset.currentContentOffsetTop - SCROLL_GAP,
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
                    height: createCardDesktopInputFormHeightMapper(e.name[inputStep]),
                  }}
                  className={`w-full h-full border-[1px] border-solid shadow-md rounded-[12px] px-[24px] py-[12px] relative bg-white`}
                  ref={(el) => {
                    inputHeightRef.current[e.name[inputStep]] = { offsetTop: el?.offsetTop };
                  }}
                >
                  <p className='text-gray-900 text-[18px] font-bold mb-[12px]'>{e.name[inputStep]}</p>
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
