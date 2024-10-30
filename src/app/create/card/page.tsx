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
import { createClient } from '@/utils/supabase/client';
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
import { converToCamelCase } from '@/utils/convert/invitaitonTypeConvert';
import OnBoarding from '@/components/create/OnBoarding';
import { useIntersectionObserver } from '@/hooks/observer/useIntersectionObserver';

const DELAY_TIME: number = 300;

const CreateCardPage = () => {
  const methods = useForm<InvitationFormType>({
    mode: 'onChange',
    defaultValues: {
      bgColor: { r: 255, g: 255, b: 255, a: 1, name: '흰색' },
      personalInfo: {
        bride: {
          name: '',
          phoneNumber: '',
          fatherName: '',
          fatherPhoneNumber: '',
          isFatherDeceased: false,
          motherName: '',
          motherPhoneNumber: '',
          isMotherDeceased: false,
        },
        groom: {
          name: '',
          phoneNumber: '',
          fatherName: '',
          fatherPhoneNumber: '',
          isFatherDeceased: false,
          motherName: '',
          motherPhoneNumber: '',
          isMotherDeceased: false,
        },
      },
      account: {
        title: '',
        content: '',
        bride: [
          { bank: '', accountNumber: '', depositor: '' },
          { bank: '', accountNumber: '', depositor: '' },
          { bank: '', accountNumber: '', depositor: '' },
        ],
        groom: [
          { bank: '', accountNumber: '', depositor: '' },
          { bank: '', accountNumber: '', depositor: '' },
          { bank: '', accountNumber: '', depositor: '' },
        ],
      },
      guestbook: false,
      attendance: false,
      weddingInfo: {
        date: '',
        time: { hour: '', minute: '' },
        weddingHallAddress: '',
        weddingHallName: '',
        weddingHallContact: '',
      },
      mainPhotoInfo: {
        leftName: '',
        rightName: '',
        icon: '',
        introduceContent: '',
        imageUrl: '',
        fontName: '',
      },
      navigationDetail: {
        map: false,
        navigationButton: false,
        subway: '',
        bus: '',
      },
      gallery: { images: [] },
      type: 'scroll',
      mood: '',
      stickers: [],
      imgRatio: {},
      mainText: '',
      greetingMessage: {},
      dDay: false,
    },
  });
  const browserClient = createClient();
  const [currentStep, setCurrentStep] = useState<number>(1);
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
      component: <div>test</div>,
    },
  ];
  const refs = useRef<null[] | HTMLDivElement[]>([]);
  const { isNavigating } = useIntersectionObserver(refs, setCurrentStep);

  const { data: existingInvitation } = useGetInvitationQuery();
  const { mutate: updateInvitation } = useUpdateInvitation();
  const { mutate: insertInvitation } = useInsertInvitation();

  const { reset } = methods;

  useEffect(() => {
    const loadFormData = async () => {
      const { data: user } = await browserClient.auth.getUser();
      const localData = localStorage.getItem('invitationFormData');

      if (!user.user) {
        if (localData) {
          reset(JSON.parse(localData));
        } else {
          reset();
        }
      } else {
        if (existingInvitation) {
          const convertedInvitation = converToCamelCase(existingInvitation);
          reset(convertedInvitation);
        } else {
          if (localData) {
            reset(JSON.parse(localData));
          } else {
            reset();
          }
        }
      }
    };

    loadFormData();
  }, [existingInvitation, reset]);

  const onSubmit = async (invitationData: InvitationFormType) => {
    const { data: user } = await browserClient.auth.getUser();

    if (!user.user) {
      localStorage.setItem('invitationFormData', JSON.stringify(invitationData));
      alert('생성을 원하시면 로그인 해주세요!');
      return;
    }

    if (existingInvitation) {
      updateInvitation(invitationData);
    } else {
      insertInvitation(invitationData);
    }
  };

  const handleDebouncedNext = debounce(() => {
    if (currentStep < refs.current.length) {
      isNavigating.current = true;
      setCurrentStep((prev) => prev + 1);
    }
  }, DELAY_TIME);

  const handleDebouncedPrevious = debounce(() => {
    if (currentStep > 1) {
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
        setBackgroundColor(`rgba(${color.r},${color.g},${color.b},${color.a})`);
      }
      return () => subscription.unsubscribe();
    });
  };

  const scrollEvent = () => {
    if (currentStep > 2 && refs.current[currentStep - 1]) {
      refs.current[currentStep - 1]!.scrollIntoView({
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
                    disabled={currentStep === 1}
                  >
                    <MdNavigateBefore />
                  </button>
                  <button
                    className='bg-blue-300'
                    type='button'
                    onClick={handleDebouncedNext}
                    disabled={currentStep === refs.current.length}
                  >
                    <MdNavigateNext />
                  </button>
                </div>

                {currentStep === 1 && <MainViewInput />}
                {currentStep === 2 && <MainPhotoInput />}
                {currentStep === 3 && <PersonalInfoInput />}
                {currentStep === 4 && <AccountInput />}
                {currentStep === 5 && <WeddingInfoInput />}
                {currentStep === 6 && <NavigationDetailInput />}
                {currentStep === 7 && <GuestInfoInput />}
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
