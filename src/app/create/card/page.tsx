'use client';
import AccountInput from '@/components/create/AccountInput';
import GuestInfoInput from '@/components/create/GuestInfoInput';
import GuestInfoPreview from '@/components/create/preview/GuestInfoPreview';
import AccountPreView from '@/components/create/preview/AccountPreView';
import { useEffect, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import WeddingInfoPreView from '@/components/create/preview/WeddingInfoPreView';
import WeddingInfoInput from '@/components/create/WeddingInfoInput';
import PersonalInfoPreview from '@/components/create/preview/PersonalInfoPreView';
import PersonalInfoInput from '@/components/create/PersonalInfoInput';
import { InvitationFormType } from '@/types/invitationFormType.type';
import MainPhotoPreView from '@/components/create/preview/MainPhotoPreView';
import MainPhotoInput from '@/components/create/MainPhotoInput';
import NavigationDetailsPreview from '@/components/create/preview/NavigationDetailsPreview';
import NavigationDetailInput from '@/components/create/NavigationDetailInput';
import MainViewInput from '@/components/create/MainViewInput';
import { debounce } from '@/utils/debounce';
import { useGetInvitationQuery } from '@/hooks/queries/invitation/useGetInvitationQuery';
import { useUpdateInvitation } from '@/hooks/queries/invitation/useUpdateInvitation';
import { useInsertInvitation } from '@/hooks/queries/invitation/useInsertInvitation';
import OnBoarding from '@/components/create/OnBoarding';
import GreetingInput from '@/components/create/GreetingInput';
import GreetingPreview from '@/components/create/preview/GreetingPreview';
import browserClient from '@/utils/supabase/client';
import { loadFormData } from '@/utils/form/loadFormData';
import { useIntersectionObserver } from '@/hooks/observer/useIntersectionObserver';
import { INVITATION_DEFAULT_VALUE } from '@/constants/invitaionDefaultValue';
import colorConverter from '@/utils/colorConverter';

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

  const INITIAL_ORDER = [
    {
      order: 0,
      component: <MainPhotoPreView control={methods.control} />,
    },
    {
      order: 1,
      component: <PersonalInfoPreview control={methods.control} />,
    },
    {
      order: 2,
      component: <AccountPreView control={methods.control} />,
    },
    {
      order: 3,
      component: <WeddingInfoPreView control={methods.control} />,
    },
    {
      order: 4,
      component: <NavigationDetailsPreview control={methods.control} />,
    },
    {
      order: 5,
      component: <GuestInfoPreview control={methods.control} />,
    },
    {
      order: 6,
      component: <GreetingPreview control={methods.control} />,
    },
    {
      order: 7,
      component: <div>test</div>,
    },
  ];
  const refs = useRef<null[] | HTMLDivElement[]>([]);
  const { isNavigating, initializeObserver, unsubscribeObservers } = useIntersectionObserver(refs, setCurrentStep);

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
      alert('청첩장이 생성되었습니다.');
    }
  };

  const handleDebouncedNext = debounce(async () => {
    if (currentStep < refs.current.length) {
      isNavigating.current = true;

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

      setCurrentStep((prev) => prev + 1);
    }
  }, DELAY_TIME);

  const handleDebouncedPrevious = debounce(() => {
    if (currentStep > 0) {
      isNavigating.current = true;
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
    if (currentStep > 1 && refs.current[currentStep]) {
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
            {INITIAL_ORDER.map((e, index) => {
              return (
                <div
                  className='min-h-[calc(100vh-114px)]'
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
                    disabled={currentStep === 0}
                  >
                    <MdNavigateBefore />
                  </button>
                  <button
                    className='bg-blue-300'
                    type='button'
                    onClick={handleDebouncedNext}
                    disabled={refs.current.length !== 0 && currentStep === refs.current.length}
                  >
                    <MdNavigateNext />
                  </button>
                </div>

                {currentStep === 0 && <MainPhotoInput />}
                {currentStep === 1 && <MainViewInput />}
                {currentStep === 2 && <PersonalInfoInput />}
                {currentStep === 3 && <AccountInput />}
                {currentStep === 4 && <WeddingInfoInput />}
                {currentStep === 5 && <NavigationDetailInput />}
                {currentStep === 6 && <GuestInfoInput />}
                {currentStep === 8 && <GreetingInput />}
                {currentStep === refs.current.length && (
                  <button
                    className='w-full'
                    type='submit'
                  >
                    제출
                  </button>
                )}
              </form>
            </FormProvider>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default CreateCardPage;
