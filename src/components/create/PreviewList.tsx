'use client';

import { MOBILE_VIEW_HEIGHT } from '@/constants/screenSize';
import { InvitationFormType } from '@/types/invitationFormType.type';
import { useEffect, MutableRefObject, Dispatch, SetStateAction, useRef } from 'react';
import { UseFormReturn } from 'react-hook-form';
import PreviewElement from './PreviewElement';
import { OrderList, StepType } from '@/hooks/create/useFormStepController';
import { ScrollRefsType } from '@/app/(noLayout)/create/card/page';

const PreviewList = ({
  orderList,
  refs,
  currentStep,
  styleSetting,
}: {
  methods: UseFormReturn<InvitationFormType>;
  orderList: OrderList[];
  setCurrentStep: Dispatch<SetStateAction<StepType>>;
  refs: MutableRefObject<ScrollRefsType>;
  currentStep: StepType;
  styleSetting: { font: string; backgroundColor: string };
}) => {
  const frameRef = useRef<HTMLDivElement>(null);
  const scrollEvent = () => {
    const targetRef = Object.values(refs.current).find((e) => e.order === currentStep.currentPreviewStep)?.ref;
    if (targetRef) {
      targetRef?.scrollIntoView({
        block: 'start',
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    scrollEvent();
  }, [currentStep.currentPreviewStep, currentStep.currentInputStep]);
  return (
    <div
      className={`relative w-[375px] h-full desktop:h-[830px] flex flex-col justify-center desktop:justify-start gap-[100px]`}
      style={{
        backgroundColor: styleSetting.backgroundColor,
        fontFamily: styleSetting.font,
      }}
      ref={frameRef}
    >
      {orderList.map((e, index) => {
        return (
          <div
            key={e.labelForInput}
            style={{ minHeight: MOBILE_VIEW_HEIGHT }}
          >
            {e.component?.map((element, idx) => {
              return (
                <PreviewElement
                  key={element.key}
                  element={element}
                  refs={refs}
                  order={index}
                  inputOrder={idx}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default PreviewList;
