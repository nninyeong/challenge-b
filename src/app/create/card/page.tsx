'use client';
import AccountInput from '@/components/create/AccountInput';
import GuestInfoInput from '@/components/create/GuestInfoInput';
import GuestInfoPreview from '@/components/create/preview/GuestInfoPreview';
import AccountPreView from '@/components/create/preview/AccountPreView';
import { useEffect, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';
import { InvitationFormType } from '@/types/invitationFormType.type';
import WeddingInfoPreView from '@/components/create/preview/WeddingInfoPreView';
import WeddingInfoInput from '@/components/create/WeddingInfoInput';
import PersonalInfoPreview from '@/components/create/preview/PersonalInfoPreView';
import PersonalInfoInput from '@/components/create/PersonalInfoInput';
import MainPhotoPreView from '@/components/create/preview/MainPhotoPreView';
import MainPhotoInput from '@/components/create/MainPhotoInput';
import NavigationDetailsPreview from '@/components/create/preview/NavigationDetailsPreview';
import NavigationDetailInput from '@/components/create/NavigationDetailInput';
import MainViewInput from '@/components/create/MainViewInput';
import { debounce } from '@/utils/debounce';

const OBSERVER_OPTIONS = {
  root: null,
  rootMargin: '0px',
  threshold: 0.9,
};

const DELAY_TIME: number = 300;

const CreateCardPage = () => {
  const methods = useForm<InvitationFormType>({
    mode: 'onChange',
    defaultValues: {
      main_view: {
        color: '#ffffff',
      },
      personal_info: {
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
      wedding_info: {
        date: '',
        time: { hour: '', minute: '' },
        weddingHallAddress: '',
        weddingHallName: '',
        weddingHallContact: '',
      },
      mainPhoto_info: {
        leftName: '',
        rightName: '',
        icon: '',
      },
      navigation_detail: {
        map: false,
        navigation_button: false,
        car: '',
        subway: '',
        bus: '',
      },
    },
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [backgroundColor, setBackgroundColor] = useState<string>('rgba(255,255,255,1)');
  const refs = [
    useRef<HTMLDivElement | null>(null),
    useRef<HTMLDivElement | null>(null),
    useRef<HTMLDivElement | null>(null),
    useRef<HTMLDivElement | null>(null),
    useRef<HTMLDivElement | null>(null),
    useRef<HTMLDivElement | null>(null),
    useRef<HTMLDivElement | null>(null),
  ];

  const observers = useRef<IntersectionObserver[]>([]);
  const isNavigating = useRef<boolean>(false);

  const onSubmit = (data: InvitationFormType) => console.log(data);

  const handleDebouncedNext = debounce(() => {
    if (currentStep < refs.length) {
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

  const observerCallback = (entries: IntersectionObserverEntry[]) => {
    if (isNavigating.current) return; // 수동 전환 중에는 옵저버 무시
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const currentStepIndex = refs.findIndex((ref) => ref.current === entry.target);
        if (currentStepIndex + 1 !== currentStep) {
          setCurrentStep(currentStepIndex + 1);
        }
      }
    });
  };

  const unsubscribeObservers = () => {
    observers.current.forEach((observer, index) => {
      if (refs[index]?.current) observer.unobserve(refs[index].current!);
    });
  };

  const observeObserver = () => {
    refs.forEach((ref, index) => {
      if (ref.current) {
        const observer = new IntersectionObserver(observerCallback, OBSERVER_OPTIONS);
        observer.observe(ref.current);
        observers.current[index] = observer;
      }
    });
  };

  const subscribeBackgroundColor = () => {
    const subscription = methods.watch((value) => {
      const color = value.main_view.color;
      if (color) {
        setBackgroundColor(`rgba(${color.r},${color.g},${color.b},${color.a})`);
      }
      return () => subscription.unsubscribe();
    });
  };

  const scrollEvent = () => {
    if (currentStep > 3 && refs[currentStep - 1].current) {
      refs[currentStep - 1].current?.scrollIntoView({
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
  }, [methods]);

  useEffect(() => {
    scrollEvent();
  }, [currentStep]);

  useEffect(() => {
    unsubscribeObservers();
    observeObserver();
    return () => unsubscribeObservers();
  }, [currentStep]);

  return (
    <div
      className='relative w-full h-full'
      style={{
        backgroundColor: backgroundColor,
      }}
    >
      {/*대표사진 프리뷰*/}
      <div
        className='min-h-[calc(100vh-114px)]'
        ref={refs[0]}
      >
        <MainPhotoPreView control={methods.control} />
      </div>
      <div
        className='min-h-[calc(100vh-114px)]'
        ref={refs[1]}
      >
        <PersonalInfoPreview control={methods.control} />
      </div>
      <div
        className='min-h-[calc(100vh-114px)]'
        ref={refs[2]}
      >
        <AccountPreView control={methods.control} />
      </div>
      <div
        className='min-h-[calc(100vh-114px)]'
        ref={refs[3]}
      >
        <WeddingInfoPreView control={methods.control} />
      </div>
      <div
        className='min-h-[calc(100vh-114px)]'
        ref={refs[4]}
      >
        <NavigationDetailsPreview control={methods.control} />
      </div>
      <div
        className='min-h-[calc(100vh-114px)]'
        ref={refs[4]}
      >
        <GuestInfoPreview control={methods.control} />
      </div>
      <div
        className='min-h-[calc(100vh-114px)]'
        ref={refs[5]}
      >
        colorpalette
      </div>

      <div className='fixed bottom-0 left-0 right-0 px-4 z-10'>
        <FormProvider {...methods}>
          <form
            className='bg-[#bfbfbf] bg-opacity-50 px-4 rounded-lg h-[320px] z-10'
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
                disabled={currentStep === refs.length}
              >
                <MdNavigateNext />
              </button>
            </div>

            {currentStep === 1 && <MainPhotoInput />}
            {currentStep === 2 && <PersonalInfoInput />}
            {currentStep === 3 && <AccountInput />}
            {currentStep === 4 && <WeddingInfoInput />}
            {currentStep === 5 && <NavigationDetailInput />}
            {currentStep === 6 && <GuestInfoInput />}
            {currentStep === 7 && <MainViewInput />}
            {currentStep === refs.length && (
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
    </div>
  );
};

export default CreateCardPage;
