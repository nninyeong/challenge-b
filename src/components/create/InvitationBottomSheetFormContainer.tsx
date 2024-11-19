'use client';
import { FaSortDown, FaSortUp } from 'react-icons/fa6';
import Button from '../ui/Button';
import { InvitationFormType } from '@/types/invitationFormType.type';
import { UseFormReturn } from 'react-hook-form';
import { OrderList, StepType } from '@/hooks/create/useFormStepController';
import { useInvitationFormActions } from '@/hooks/create/useInvitationFormActions';

export type InvitationBottomSheetFormContainerProps = {
  methods: UseFormReturn<InvitationFormType>;
  currentStep: StepType;
  orderList: OrderList[];
  toggleInput: boolean;
  isNavigating: { current: boolean };
  setToggleInput: () => void;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
};

const InvitationBottomSheetFormContainer = ({
  methods,
  currentStep,
  orderList,
  toggleInput,
  isNavigating,
  setToggleInput,
  goToNextStep,
  goToPreviousStep,
}: InvitationBottomSheetFormContainerProps) => {
  const { onSubmit, handleDebouncedNext, handleDebouncedPrevious } = useInvitationFormActions({
    isNavigating,
    methods,
    goToNextStep,
    goToPreviousStep,
  });

  const isFirstInput = currentStep.currentInputStep === 0 && currentStep.currentPreviewStep === 0;
  const isLastInput = currentStep.currentPreviewStep === orderList.length - 1;

  return (
    <form
      className={`flex flex-col bg-white px-[16px] py-[8px] gap-[6px] box-sizing rounded-lg z-10 w-[343px] h-full ${toggleInput || 'border border-gray-300'}`}
      onSubmit={methods.handleSubmit(onSubmit)}
    >
      <div className={`flex justify-between items-center ${toggleInput || 'h-[52px]'}`}>
        <button
          type='button'
          onClick={setToggleInput}
          className='flex justify-center items-center gap-[4px] text-gray-900 text-[18px] font-bold'
        >
          {toggleInput ? (
            <FaSortDown
              size={24}
              viewBox='0 110 320 512'
            />
          ) : (
            <FaSortUp
              size={24}
              viewBox='0 -100 320 512'
            />
          )}
          {orderList[currentStep.currentPreviewStep].name[currentStep.currentInputStep]}
        </button>

        <div className='flex items-center'>
          <button
            type='button'
            onClick={handleDebouncedPrevious}
            disabled={isFirstInput}
            className='w-[28px] h-[28px]'
          >
            <img
              src='/assets/images/icons/chevron-left.webp'
              alt='이전'
              width={28}
              height={28}
              loading='lazy'
            />
          </button>
          <button
            type='button'
            onClick={handleDebouncedNext}
            disabled={isLastInput}
            className='w-[28px] h-[28px]'
          >
            <img
              src='/assets/images/icons/chevron-right.webp'
              alt='다음'
              width={28}
              height={28}
              loading='lazy'
            />
          </button>
        </div>
      </div>

      {toggleInput && (
        <div className={`${toggleInput ? 'display-none' : ''}`}>
          {orderList[currentStep.currentPreviewStep].input[currentStep.currentInputStep]}

          {isLastInput && (
            <Button
              className='rounded-[12px] w-[311px] h-[48px]'
              type='submit'
            >
              청첩장 제작 완료
            </Button>
          )}
        </div>
      )}
    </form>
  );
};

export default InvitationBottomSheetFormContainer;
