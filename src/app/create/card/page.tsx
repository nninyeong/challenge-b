'use client';

import { useEffect, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
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
import { VIEW_HEIGHT } from '@/constants/viewHeight';

const DELAY_TIME: number = 300;

const CreateCardPage = () => {
  const methods = useForm<InvitationFormType>({
    mode: 'onChange',
    defaultValues: INVITATION_DEFAULT_VALUE,
  });
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [backgroundColor, setBackgroundColor] = useState<string>('rgba(255,255,255,1)');
  const [selectedFont, setSelectedFont] = useState<string>('main');
  const [isOnboardingComplete, setIsOnboardingComplete] = useState<boolean>(false);
  const [toggleInput, setToggleInput] = useToggle();

  const [inputIndex, setInputIndex] = useState<number>(0);
  const orderList = INITIAL_ORDER(methods);

  const refs = useRef<null[] | HTMLDivElement[]>([]);
  const { isNavigating, initializeObserver, unsubscribeObservers } = useIntersectionObserver(
    refs,
    setCurrentStep,
    setInputIndex,
  );
  const isLastInput = refs.current.length !== 0 && currentStep === refs.current.length - 1;

  const { data: existingInvitation } = useGetInvitationQuery();
  const { mutate: updateInvitation } = useUpdateInvitation();
  const { mutate: insertInvitation } = useInsertInvitation();

  const { reset } = methods;

  useEffect(() => {
    loadFormData({ existingInvitation, reset });
  }, [existingInvitation, reset]);

  const onSubmit = async (invitationData: InvitationFormType) => {
    const { data: user } = await browserClient.auth.getUser();

    if (!user.user) {
      sessionStorage.setItem('invitationFormData', JSON.stringify(invitationData));
      alert('생성을 원하시면 로그인 해주세요!');
      return;
    }

    if (existingInvitation) {
      updateInvitation(invitationData);
      alert('청첩장이 업데이트되었습니다.');
    } else {
      insertInvitation(invitationData);
      alert('청첩장이 생성되었습니다.');
    }
  };

  const handleDebouncedNext = debounce(async () => {
    const { data: user } = await browserClient.auth.getUser();
    const formData = methods.getValues();

    if (!user.user) {
      sessionStorage.setItem('invitationFormData', JSON.stringify(formData));
    } else {
      if (existingInvitation) {
        updateInvitation(formData);
      } else {
        insertInvitation(formData);
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
    } else if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
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
    if (refs.current[currentStep]) {
      refs.current[currentStep].scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
    setTimeout(() => {
      isNavigating.current = false; // 수동 전환 완료 후 상태 초기화
    }, DELAY_TIME); // 스크롤 애니메이션 지속 시간 후 재활성화
  };
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
      {isOnboardingComplete ? (
        <>
          <div
            style={{
              fontFamily: selectedFont,
            }}
          >
            {orderList.map((e, index) => {
              return (
                <div
                  style={{ minHeight: VIEW_HEIGHT }}
                  key={e.order}
                  ref={(el) => {
                    refs.current[index] = el;
                  }}
                >
                  {e.component}
                </div>
              );
            })}
          </div>
          <div className='fixed bottom-0 left-0 right-0 px-4 z-10'>
            <button
              type='button'
              onClick={setToggleInput}
              className='text-black '
            >
              {toggleInput ? <FaSortDown size={40} /> : <FaSortUp size={40} />}
            </button>
            {toggleInput && (
              <FormProvider {...methods}>
                <form
                  className='bg-white shadow-xl px-4 rounded-lg h-[320px] z-10'
                  onSubmit={methods.handleSubmit(onSubmit)}
                >
                  <div className='w-full flex items-center justify-end'>
                    <button
                      type='button'
                      onClick={handleDebouncedPrevious}
                      className='bg-red-300'
                      disabled={currentStep === 0 && inputIndex === 0}
                    >
                      <MdNavigateBefore />
                    </button>
                    <button
                      className='bg-blue-300'
                      type='button'
                      onClick={handleDebouncedNext}
                      disabled={isLastInput}
                    >
                      <MdNavigateNext />
                    </button>
                  </div>
                  {orderList[currentStep].input[inputIndex]}
                  {currentStep === refs.current.length - 1 && (
                    <button
                      className='w-full'
                      type='submit'
                    >
                      제출
                    </button>
                  )}
                </form>
              </FormProvider>
            )}
          </div>
        </>
      ) : null}
    </div>
  );
};

export default CreateCardPage;
