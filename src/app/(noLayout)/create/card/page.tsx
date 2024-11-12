'use client';

import { useEffect, useRef, useState } from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { InvitationFormType } from '@/types/invitationFormType.type';
import OnBoarding from '@/components/create/OnBoarding';
import useToggle from '@/utils/useToggle';
import { useIntersectionObserver } from '@/hooks/observer/useIntersectionObserver';
import { INVITATION_DEFAULT_VALUE } from '@/constants/invitaionDefaultValue';
import colorConverter from '@/utils/colorConverter';
import { INITIAL_ORDER } from '@/constants/invitationViewOrder';
import { MOBILE_VIEW_HEIGHT, PC_VIEW_WIDTH } from '@/constants/screenSize';
import createCardFormHeightMapper from '@/utils/createCardFormHeightMapper';
import { zodResolver } from '@hookform/resolvers/zod';
import { validationSchema } from '@/lib/zod/validationSchema';
import useFormStepController from '@/hooks/create/useFormStepController';
import { useInvitationFormActions } from '@/hooks/create/useInvitationFormActions';
import PreviewElement from '@/components/create/PreviewElement';
import FormMotionContainer from '@/components/create/FormMotionContainer';
import InvitationBottomSheetFormContainer from '@/components/create/InvitationBottomSheetFormContainer';

export type ScrollRefsType = {
  [key: string]: { ref: HTMLDivElement | null; order: number; inputOrder: number };
};

const DELAY_TIME: number = 300;

const CreateCardPage = () => {
  const methods = useForm<InvitationFormType>({
    resolver: zodResolver(validationSchema),
    mode: 'onChange',
    defaultValues: INVITATION_DEFAULT_VALUE,
  });

  const [styleSetting, setStyleSetting] = useState({
    backgroundColor: 'rgba(255,255,255,1)',
    font: 'main',
  });
  const [isOnboardingComplete, setIsOnboardingComplete] = useState<boolean>(false);
  const [orderList, setOrderList] = useState(() => INITIAL_ORDER(methods));

  const [toggleInput, setToggleInput] = useToggle();
  const renderOrderList = useWatch({ control: methods.control, name: 'renderOrder' });

  const refs = useRef<ScrollRefsType>({});

  const { currentStep, setCurrentStep, goToNextStep, goToPreviousStep } = useFormStepController(orderList);
  const { isNavigating, initializeObserver, unsubscribeObservers } = useIntersectionObserver(refs, setCurrentStep);
  const { handleDebouncedSave } = useInvitationFormActions({
    isNavigating,
    methods,
    goToNextStep,
    goToPreviousStep,
  });
  const sortedOrderListWithRenderOrder = orderList.sort((a, b) => {
    const orderA = renderOrderList.find((item) => item.typeOnSharedCard === a.typeOnSharedCard)?.order;
    const orderB = renderOrderList.find((item) => item.typeOnSharedCard === b.typeOnSharedCard)?.order;

    return (orderA ?? a.order) - (orderB ?? b.order);
  });

  const subscribeEveryValues = () => {
    const subscription = methods.watch((value) => {
      if (value) {
        handleDebouncedSave();
      }
      return () => subscription.unsubscribe();
    });
  };

  const subscribeFont = () => {
    const subscriptionFont = methods.watch((value) => {
      const font = value?.mainPhotoInfo?.fontName;
      if (font) {
        setStyleSetting((prev) => {
          return { ...prev, font: font };
        });
      }
      return () => subscriptionFont.unsubscribe();
    });
  };
  const subscribeBackgroundColor = () => {
    const subscription = methods.watch((value) => {
      const color = value.bgColor;

      if (color) {
        setStyleSetting((prev) => {
          return {
            ...prev,
            backgroundColor: colorConverter({
              r: color.r as number,
              g: color.g as number,
              b: color.b as number,
              a: color.a as number,
              name: color.name as string,
            }),
          };
        });
      }
      return () => subscription.unsubscribe();
    });
  };
  const scrollEvent = () => {
    const targetRef = Object.values(refs.current).find((e) => e.order === currentStep.currentPreviewStep)?.ref;

    targetRef?.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });

    setTimeout(() => {
      isNavigating.current = false; // 수동 전환 완료 후 상태 초기화
    }, DELAY_TIME); // 스크롤 애니메이션 지속 시간 후 재활성화
  };

  useEffect(() => {
    setOrderList(
      sortedOrderListWithRenderOrder.map((e, index) => {
        return {
          ...e,
          order: index,
        };
      }),
    );
  }, [renderOrderList]);

  useEffect(() => {
    document.documentElement.style.overflow = isOnboardingComplete ? 'unset' : 'hidden';

    return () => {
      document.documentElement.style.overflow = 'unset';
    };
  }, [isOnboardingComplete]);

  useEffect(() => {
    subscribeEveryValues();
    subscribeBackgroundColor();
    subscribeFont();
  }, [methods]);

  useEffect(() => {
    scrollEvent();
  }, [currentStep.currentPreviewStep]);

  useEffect(() => {
    initializeObserver();
    return () => unsubscribeObservers();
  }, [refs, isOnboardingComplete]);

  return (
    <FormProvider {...methods}>
      <div
        className={`relative w-full h-full font-${styleSetting.font} desktop:w-[${PC_VIEW_WIDTH}] flex justify-center`}
        style={{
          backgroundColor: styleSetting.backgroundColor,
        }}
      >
        <OnBoarding
          setIsOnboardingComplete={setIsOnboardingComplete}
          isOnboardingComplete={isOnboardingComplete}
        />
        <div
          style={{
            fontFamily: styleSetting.font,
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
        <FormMotionContainer
          height={createCardFormHeightMapper(
            toggleInput,
            orderList[currentStep.currentPreviewStep].name[currentStep.currentInputStep],
          )}
          className={`fixed bottom-0 px-[16px] z-10 mb-[8px] w-fit h-[${createCardFormHeightMapper(toggleInput, orderList[currentStep.currentPreviewStep].name[currentStep.currentInputStep])}]`}
        >
          <InvitationBottomSheetFormContainer
            methods={methods}
            currentStep={currentStep}
            isNavigating={isNavigating}
            orderList={orderList}
            goToNextStep={goToNextStep}
            goToPreviousStep={goToPreviousStep}
            toggleInput={toggleInput}
            setToggleInput={setToggleInput}
          />
        </FormMotionContainer>
      </div>
    </FormProvider>
  );
};

export default CreateCardPage;
