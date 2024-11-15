'use client';

import { useEffect, useRef, useState } from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { InvitationFormType } from '@/types/invitationFormType.type';
import OnBoarding from '@/components/create/OnBoarding';
import useToggle from '@/utils/useToggle';
import { useIntersectionObserver } from '@/hooks/observer/useIntersectionObserver';
import { INVITATION_DEFAULT_VALUE } from '@/constants/invitaionDefaultValue';
import { INITIAL_ORDER } from '@/constants/invitationViewOrder';
import createCardFormHeightMapper from '@/utils/createCardFormHeightMapper';
import useFormStepController from '@/hooks/create/useFormStepController';
import { useInvitationFormActions } from '@/hooks/create/useInvitationFormActions';
import InvitationBottomSheetFormContainer from '@/components/create/InvitationBottomSheetFormContainer';
import useViewportWidth from '@/hooks/create/useViewPortWidth';
import dynamic from 'next/dynamic';
import PreviewList from '@/components/create/PreviewList';
import colorConverter from '@/utils/colorConverter';
import { PC_VIEW_WIDTH } from '@/constants/screenSize';

const DesktopInputForm = dynamic(() => import('@/components/create/DesktopInputForm'));
const FormMotionContainer = dynamic(() => import('@/components/create/FormMotionContainer'), { ssr: false });

export type ScrollRefsType = {
  [key: string]: { ref: HTMLDivElement | null; order: number; inputOrder: number };
};

const CreateCardPage = () => {
  const methods = useForm<InvitationFormType>({
    mode: 'onChange',
    defaultValues: INVITATION_DEFAULT_VALUE,
  });

  const [isOnboardingComplete, setIsOnboardingComplete] = useState<boolean>(false);
  const [orderList, setOrderList] = useState(() => INITIAL_ORDER(methods));
  const [styleSetting, setStyleSetting] = useState({
    backgroundColor: 'rgba(255,255,255,1)',
    font: 'main',
  });
  const [toggleInput, setToggleInput] = useToggle();
  const currentWidth = useViewportWidth();

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
      const font = value?.fontInfo?.fontName;
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
  useEffect(() => {
    subscribeBackgroundColor();
    subscribeFont();
  }, [methods]);

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

  // useEffect(() => {
  //   const shouldAllowScroll = isOnboardingComplete && currentWidth < 1440;
  //   document.documentElement.style.overflow = shouldAllowScroll ? 'unset' : 'hidden';

  //   return () => {
  //     document.documentElement.style.overflow = 'unset';
  //   };
  // }, [isOnboardingComplete, currentWidth]);

  useEffect(() => {
    subscribeEveryValues();
  }, [methods]);

  useEffect(() => {
    if (currentWidth < 1440) {
      initializeObserver();
    } else {
      unsubscribeObservers();
    }
    return () => {
      unsubscribeObservers();
    };
  }, [currentWidth, refs, isOnboardingComplete]);

  return (
    <FormProvider {...methods}>
      <div className='relative w-full h-full'>
        {currentWidth >= 1440 && (
          <div
            className={'absolute z-10 inset-0 bg-black bg-opacity-60 '}
            style={{ width: PC_VIEW_WIDTH, height: '100vh' }}
          />
        )}

        <div className='flex w-full h-full desktop:px-[152px] desktop:gap-[65px]'>
          <OnBoarding
            setIsOnboardingComplete={setIsOnboardingComplete}
            isOnboardingComplete={isOnboardingComplete}
          />
          <div className='relative'>
            {currentWidth >= 1440 ? (
              <div className='flex relative w-[450px] h-[850px] bg-no-repeat bg-cover bg-center items-center justify-center desktop:z-30'>
                <img
                  src='/assets/images/device.svg'
                  alt='device'
                  className='absolute z-50 pointer-events-none'
                />
                {/* 핸드폰 프레임 내에 PreviewList 배치 */}
                <div
                  className='overflow-auto flex justify-center desktop:rounded-[35px]'
                  style={{
                    backgroundColor: styleSetting.backgroundColor,
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                  }}
                >
                  <PreviewList
                    methods={methods}
                    refs={refs}
                    orderList={orderList}
                    currentStep={currentStep}
                    setCurrentStep={setCurrentStep}
                    styleSetting={styleSetting}
                  />
                </div>
              </div>
            ) : (
              <div className='desktop:hidden'>
                <PreviewList
                  methods={methods}
                  refs={refs}
                  orderList={orderList}
                  currentStep={currentStep}
                  styleSetting={styleSetting}
                  setCurrentStep={setCurrentStep}
                />
              </div>
            )}
          </div>
          {currentWidth < 1440 ? (
            <FormMotionContainer
              height={createCardFormHeightMapper(
                toggleInput,
                orderList[currentStep.currentPreviewStep].name[currentStep.currentInputStep],
              )}
              className={`fixed bottom-0 px-[16px] z-10 mb-[8px] w-fit desktop:hidden`}
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
          ) : (
            <DesktopInputForm
              goToNextStep={goToNextStep}
              goToPreviousStep={goToPreviousStep}
              currentStep={currentStep}
              methods={methods}
              isNavigating={isNavigating}
              orderList={orderList}
            />
          )}
        </div>
      </div>
    </FormProvider>
  );
};

export default CreateCardPage;
