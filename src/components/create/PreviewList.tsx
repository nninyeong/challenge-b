'use client';

import { MOBILE_VIEW_HEIGHT } from '@/constants/screenSize';
import { InvitationFormType } from '@/types/invitationFormType.type';
import { useEffect, MutableRefObject, useRef } from 'react';
import { UseFormReturn } from 'react-hook-form';
import PreviewElement from './PreviewElement';
import { OrderList, StepType } from '@/hooks/create/useFormStepController';
import { ScrollRefsType } from '@/app/(createCardLayout)/create/card/page';
import useViewportWidth from '@/hooks/create/useViewPortWidth';

const PreviewList = ({
  orderList,
  refs,
  currentStep,
  styleSetting,
}: {
  methods: UseFormReturn<InvitationFormType>;
  orderList: OrderList[];
  refs: MutableRefObject<ScrollRefsType>;
  currentStep: StepType;
  styleSetting: { font: string; backgroundColor: string };
}) => {
  const frameRef = useRef<HTMLDivElement | null>(null);
  const currentWidth = useViewportWidth();

  const scrollEvent = () => {
    const targetRef = Object.values(refs.current).find((e) => {
      if (e.order === 0) return e.order === currentStep.currentPreviewStep;
      return e.order === currentStep.currentPreviewStep && e.inputOrder === currentStep.currentInputStep;
    })?.ref;

    if (currentWidth >= 1440 && targetRef && frameRef.current) {
      const rect = targetRef.getBoundingClientRect();
      const containerRect = frameRef.current.getBoundingClientRect();

      const targetPosition = rect.top - containerRect.top + frameRef.current.scrollTop;

      frameRef.current.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    }

    if (currentWidth !== 0 && currentWidth < 1440 && targetRef) {
      targetRef.scrollIntoView({
        block: 'start',
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    if (frameRef.current) scrollEvent();
  }, [currentStep.currentPreviewStep, currentStep.currentInputStep, currentWidth]);
  return (
    <div
      ref={frameRef}
      className={`relative w-[375px] h-full desktop:h-[830px] flex flex-col justify-center desktop:justify-start gap-[100px] overflow-auto`}
      style={{
        backgroundColor: styleSetting.backgroundColor,
        fontFamily: styleSetting.font,
        scrollbarWidth: 'none',
        msOverflowStyle: 'none',
      }}
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
