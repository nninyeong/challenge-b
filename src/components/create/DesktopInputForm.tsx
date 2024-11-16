'use client';
import { useInvitationFormActions } from '@/hooks/create/useInvitationFormActions';
import { OrderList, StepType } from '@/hooks/create/useFormStepController';
import { InvitationFormType } from '@/types/invitationFormType.type';
import { UseFormReturn } from 'react-hook-form';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
type Type = {
  methods: UseFormReturn<InvitationFormType>;
  orderList: OrderList[];
  isNavigating: { current: boolean };
  goToNextStep: () => void;
  goToPreviousStep: () => void;
  currentStep: StepType;
};

const DesktopInputForm = ({ methods, orderList, isNavigating, currentStep, goToNextStep, goToPreviousStep }: Type) => {
  const { onSubmit, handleDebouncedNext, handleDebouncedPrevious } = useInvitationFormActions({
    isNavigating,
    methods,
    goToNextStep,
    goToPreviousStep,
  });
  const [windowHeight, setWindowHeight] = useState(0);
  const ref = useRef<{ [key: string]: { height: number | undefined } }>({});
  const [currentHeight, setCurrentHeight] = useState(0);
  const [prevHeight, setPrevHeight] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    setWindowHeight(Math.floor(window.innerHeight / 2));
  }, []);

  useEffect(() => {
    const currentName = orderList[currentStep.currentPreviewStep].name[currentStep.currentInputStep];
    const currentElement = ref.current[currentName];
    if (currentElement.height) {
      setContentHeight(currentElement.height);
    }
  }, [currentStep, orderList]);

  useEffect(() => {
    if (currentStep.currentInputStep > 0) {
      const prevName = orderList[currentStep.currentPreviewStep].name[currentStep.currentInputStep - 1];
      const prevElement = ref.current[prevName];
      setPrevHeight(prevElement?.height || 0);
    } else if (currentStep.currentPreviewStep > 0) {
      const prevPreview =
        orderList[currentStep.currentPreviewStep - 1].name[
          orderList[currentStep.currentPreviewStep - 1].name.length - 1
        ];
      const prevElement = ref.current[prevPreview];
      setPrevHeight(prevElement?.height || 0);
    } else {
      setPrevHeight(0);
    }
  }, [currentStep, orderList]);

  const handleNextButton = () => {
    handleDebouncedNext();
    setCurrentHeight((prev) => prev + contentHeight + 24);
  };
  const handlePrevButton = () => {
    handleDebouncedPrevious();
    setCurrentHeight((prev) => prev - (prevHeight + 24));
  };

  return (
    <form
      className={`flex flex-col h-full absolute w-[620px] right-[152px]`}
      onSubmit={methods.handleSubmit(onSubmit)}
      style={{
        top: `${windowHeight - 98}px`,
      }}
    >
      <div
        className='fixed z-40 flex justify-between flex-col left-[65%] top-[300px]'
        style={{
          height: `420px`,
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

      <motion.div
        className='flex flex-col gap-[24px] relative will-change-transform'
        initial={{ y: 0 }}
        animate={{ y: -currentHeight }}
        transition={{ duration: 0.5 }}
      >
        {orderList.map((e, index) => (
          <div
            key={e.labelForInput}
            className='w-full h-full flex flex-col justify-center items-center gap-[24px] reltaive'
          >
            {e.input.map((ele, idx) => {
              return (
                <div
                  key={e.name[idx]}
                  style={{
                    zIndex: currentStep.currentPreviewStep === index && currentStep.currentInputStep === idx ? 30 : 0,
                  }}
                  className={`w-full h-full border-[1px] border-solid shadow-md rounded-[12px] px-[24px] py-[16px] relative bg-white`}
                  ref={(el) => {
                    ref.current[e.name[idx]] = { height: el?.offsetHeight };
                  }}
                >
                  <p>{e.name[idx]}</p>
                  {ele}
                </div>
              );
            })}
          </div>
        ))}
      </motion.div>
    </form>
  );
};

export default DesktopInputForm;
