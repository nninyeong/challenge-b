'use client';

import { useEffect, useRef, useState } from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { InvitationFormType } from '@/types/invitationFormType.type';
import OnBoarding from '@/components/create/OnBoarding';
import { FaSortDown, FaSortUp } from 'react-icons/fa';
import useToggle from '@/utils/useToggle';
import { useIntersectionObserver } from '@/hooks/observer/useIntersectionObserver';
import { INVITATION_DEFAULT_VALUE } from '@/constants/invitaionDefaultValue';
import colorConverter from '@/utils/colorConverter';
import { INITIAL_ORDER } from '@/constants/invitationViewOrder';
import { MOBILE_VIEW_HEIGHT, PC_VIEW_WIDTH } from '@/constants/screenSize';
import Button from '@/components/ui/Button';
import { motion } from 'framer-motion';
import createCardFormHeightMapper, { FOLDED_HEIGHT } from '@/utils/createCardFormHeightMapper';
import { zodResolver } from '@hookform/resolvers/zod';
import { validationSchema } from '@/lib/zod/validationSchema';
import useFormStepController from '@/hooks/create/useFormStepController';
import { useInvitationFormActions } from '@/hooks/create/useInvitationFormActions';

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

  const refs = useRef<{ [key: string]: { ref: HTMLDivElement | null; order: number; inputOrder: number } }>({});

  const { currentStep, setCurrentStep, goToNextStep, goToPreviousStep } = useFormStepController(orderList);
  const { isNavigating, initializeObserver, unsubscribeObservers } = useIntersectionObserver(refs, setCurrentStep);

  const isFirstInput = currentStep.currentInputStep === 0 && currentStep.currentPreviewStep === 0;
  const isLastInput = currentStep.currentPreviewStep === orderList.length - 1;

  const sortedOrderListWithRenderOrder = orderList.sort((a, b) => {
    const orderA = renderOrderList.find((item) => item.typeOnSharedCard === a.typeOnSharedCard)?.order;
    const orderB = renderOrderList.find((item) => item.typeOnSharedCard === b.typeOnSharedCard)?.order;

    return (orderA ?? a.order) - (orderB ?? b.order);
  });

  const { onSubmit, handleDebouncedNext, handleDebouncedSave, handleDebouncedPrevious } = useInvitationFormActions({
    isNavigating,
    methods,
    goToNextStep,
    goToPreviousStep,
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
                    <div
                      key={element.key}
                      data-label={element.key}
                      ref={(el) => {
                        refs.current[element.key!] = { order: index, ref: el, inputOrder: idx };
                      }}
                    >
                      {element}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        <motion.div
          initial={{ height: FOLDED_HEIGHT }}
          animate={{
            height: createCardFormHeightMapper(
              toggleInput,
              orderList[currentStep.currentPreviewStep].name[currentStep.currentInputStep],
            ),
          }}
          transition={{
            duration: 0.4,
          }}
          className={`fixed bottom-0 px-[16px] z-10 mb-[8px] w-fit h-[${createCardFormHeightMapper(toggleInput, orderList[currentStep.currentPreviewStep].name[currentStep.currentInputStep])}]`}
        >
          <form
            className={`flex flex-col bg-white shadow-xl px-[16px] py-[8px] gap-[6px] box-sizing rounded-lg z-10 w-[343px] h-full`}
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <div className='flex justify-between items-center'>
              <button
                type='button'
                onClick={setToggleInput}
                className='flex justify-center items-center text-gray-900 text-[18px] font-bold'
              >
                {toggleInput ? (
                  <FaSortDown
                    size={28}
                    viewBox='0 110 320 512'
                  />
                ) : (
                  <FaSortUp
                    size={28}
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
                    src='/assets/images/icons/chevron-left.svg'
                    width={28}
                    height={28}
                  />
                </button>
                <button
                  type='button'
                  onClick={handleDebouncedNext}
                  disabled={isLastInput}
                  className='w-[28px] h-[28px]'
                >
                  <img
                    src='/assets/images/icons/chevron-right.svg'
                    width={28}
                    height={28}
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
        </motion.div>
      </div>
    </FormProvider>
  );
};

export default CreateCardPage;
