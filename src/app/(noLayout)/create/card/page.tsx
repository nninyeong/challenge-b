'use client';

import { useEffect, useRef, useState } from 'react';
import { FormProvider, useForm, useWatch } from 'react-hook-form';
import { InvitationFormType } from '@/types/invitationFormType.type';
import { debounce } from '@/utils/debounce';
import { useGetInvitationQuery } from '@/hooks/queries/invitation/useGetInvitationQuery';
import { useUpdateInvitation } from '@/hooks/queries/invitation/useUpdateInvitation';
import { useInsertInvitation } from '@/hooks/queries/invitation/useInsertInvitation';
import OnBoarding from '@/components/create/OnBoarding';
import browserClient from '@/utils/supabase/client';
import { loadFormData } from '@/utils/form/loadFormData';
import { FaSortDown, FaSortUp } from 'react-icons/fa';
import useToggle from '@/utils/useToggle';
import { useIntersectionObserver } from '@/hooks/observer/useIntersectionObserver';
import { INVITATION_DEFAULT_VALUE } from '@/constants/invitaionDefaultValue';
import colorConverter from '@/utils/colorConverter';
import { INITIAL_ORDER } from '@/constants/invitationViewOrder';
import { useRouter } from 'next/navigation';
import { MOBILE_VIEW_HEIGHT } from '@/constants/screenSize';
import Button from '@/components/ui/Button';
import { revalidateInvitation } from '@/utils/revalidateInvitation';
import { Notify } from 'notiflix';
import EventBus from '@/utils/EventBus';
import { motion } from 'framer-motion';
import createCardFormHeightMapper, { FOLDED_HEIGHT } from '@/utils/createCardFormHeightMapper';
import { zodResolver } from '@hookform/resolvers/zod';
import { validationSchema } from '@/lib/zod/validationSchema';

const DELAY_TIME: number = 300;
const CreateCardPage = () => {
  const router = useRouter();

  const methods = useForm<InvitationFormType>({
    resolver: zodResolver(validationSchema),
    mode: 'onChange',
    defaultValues: INVITATION_DEFAULT_VALUE,
  });

  const [backgroundColor, setBackgroundColor] = useState<string>('rgba(255,255,255,1)');
  const [selectedFont, setSelectedFont] = useState<string>('main');
  const [isOnboardingComplete, setIsOnboardingComplete] = useState<boolean>(false);
  const [toggleInput, setToggleInput] = useToggle();
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [inputIndex, setInputIndex] = useState<number>(0);
  const [isRendered, setIsRendered] = useState<boolean>(false);
  const [orderList, setOrderList] = useState(() => INITIAL_ORDER(methods));
  const renderOrderList = useWatch({ control: methods.control, name: 'renderOrder' });
  const sortedOrderListWithRenderOrder = orderList.sort((a, b) => {
    const orderA = renderOrderList.find((item) => item.typeOnSharedCard === a.typeOnSharedCard)?.order;
    const orderB = renderOrderList.find((item) => item.typeOnSharedCard === b.typeOnSharedCard)?.order;

    return (orderA ?? a.order) - (orderB ?? b.order);
  });
  const refs = useRef<{ [key: string]: { ref: HTMLDivElement | null; order: number; inputOrder: number } }>({});
  const { isNavigating, initializeObserver, unsubscribeObservers } = useIntersectionObserver(
    refs,
    setCurrentStep,
    setInputIndex,
  );
  const isFirstInput = currentStep === 0 && inputIndex === 0;
  const isLastInput = orderList.length - 1 === currentStep;

  const { data: existingInvitation } = useGetInvitationQuery();
  const { mutate: updateInvitation } = useUpdateInvitation();
  const { mutate: insertInvitation } = useInsertInvitation();

  const { reset } = methods;

  const onSubmit = async (invitationData: InvitationFormType) => {
    const { data: user } = await browserClient.auth.getUser();

    if (!user.user) {
      sessionStorage.setItem('invitationFormData', JSON.stringify(invitationData));
      Notify.success('생성을 원하시면 로그인 해주세요!');
      router.push('/signin');
      return;
    }

    Notify.success('청첩장 생성을 시작합니다.');
    await EventBus.publish('invitationSaved', null);

    if (existingInvitation === null) {
      insertInvitation(invitationData);
    } else {
      const { isSuccess } = await revalidateInvitation(existingInvitation.id);
      if (isSuccess) {
        updateInvitation(invitationData);
      }
    }

    Notify.success('청첩장이 성공적으로 제출되었습니다.');
    router.push('/mypage');
  };

  const handleDebouncedNext = debounce(async () => {
    isNavigating.current = true;
    const { data: user } = await browserClient.auth.getUser();
    const formData = methods.getValues();

    if (methods.formState.errors.weddingInfo?.date?.message) {
      Notify.failure(methods.formState.errors.weddingInfo?.date?.message);
    }

    if (!user.user) {
      sessionStorage.setItem('invitationFormData', JSON.stringify(formData));
    } else {
      if (existingInvitation === null) {
        insertInvitation(formData);
      } else {
        updateInvitation(formData);
      }
    }

    if (inputIndex < orderList[currentStep].input.length - 1) {
      setInputIndex((prev) => prev + 1);
    } else {
      setInputIndex(0);
      setCurrentStep((prev) => prev + 1);
    }
  }, DELAY_TIME);

  const handleDebouncedPrevious = debounce(() => {
    isNavigating.current = true;
    if (inputIndex > 0) {
      setInputIndex((prev) => prev - 1);
    } else {
      setCurrentStep((prev) => prev - 1);
      if (orderList[currentStep - 1].input.length > 1) {
        setInputIndex(orderList[currentStep - 1].input.length - 1);
      }
    }
  }, DELAY_TIME);

  const subscribeFont = () => {
    const subscriptionFont = methods.watch((value) => {
      const font = value?.mainPhotoInfo?.fontName;
      if (font) {
        setSelectedFont(font);
      }
      return () => subscriptionFont.unsubscribe();
    });
  };
  const subscribeBackgroundColor = () => {
    const subscription = methods.watch((value) => {
      const color = value.bgColor;

      if (color) {
        setBackgroundColor(
          colorConverter({
            r: color.r as number,
            g: color.g as number,
            b: color.b as number,
            a: color.a as number,
            name: color.name as string,
          }),
        );
      }
      return () => subscription.unsubscribe();
    });
  };
  const scrollEvent = () => {
    const targetRef = Object.values(refs.current).find((e) => e.order === currentStep)?.ref;

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
    setIsRendered(true);
  }, []);

  useEffect(() => {
    if (!isOnboardingComplete && isRendered) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOnboardingComplete, isRendered]);

  useEffect(() => {
    if (existingInvitation === null) {
      reset(INVITATION_DEFAULT_VALUE);
    } else {
      loadFormData({ existingInvitation, reset });
    }
  }, [existingInvitation, reset]);

  useEffect(() => {
    setIsRendered(true);
  }, []);

  useEffect(() => {
    subscribeBackgroundColor();
    subscribeFont();
  }, [methods]);

  useEffect(() => {
    scrollEvent();
  }, [currentStep]);

  useEffect(() => {
    initializeObserver();
    return () => unsubscribeObservers();
  }, [refs, isOnboardingComplete]);

  return (
    <FormProvider {...methods}>
      <div
        className={`relative w-full h-full font-${selectedFont}`}
        style={{
          backgroundColor: backgroundColor,
        }}
      >
        <OnBoarding
          setIsOnboardingComplete={setIsOnboardingComplete}
          isOnboardingComplete={isOnboardingComplete}
        />
        <div
          style={{
            fontFamily: selectedFont,
          }}
        >
          {isRendered &&
            orderList.map((e, index) => {
              if (e.component === null) return null;
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
            height: createCardFormHeightMapper(toggleInput, orderList[currentStep].name[inputIndex]),
          }}
          transition={{
            duration: 0.4,
          }}
          className={`fixed bottom-0 px-[16px] z-10 mb-[8px] w-fit h-[${createCardFormHeightMapper(toggleInput, orderList[currentStep].name[inputIndex])}]`}
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
                {orderList[currentStep].name[inputIndex]}
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
                {orderList[currentStep].input[inputIndex]}
                {currentStep === orderList.length - 1 && (
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
