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
import { getUserInfo } from '@/utils/server-action';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  InvitationFormType,
  MainPhotoType,
  NavigationDetailType,
  PersonalInfoType,
  StickerType,
  WeddingInfoType,
} from '@/types/invitationFormType.type';
import { AccountInfoType } from '@/types/accountType.type';
import { Invitation } from '@/types/InvitationData.type';
import { useInvitationQuery } from '@/hooks/queries/useInvitationQuery';
import MainPhotoPreView from '@/components/create/preview/MainPhotoPreView';
import MainPhotoInput from '@/components/create/MainPhotoInput';
import NavigationDetailsPreview from '@/components/create/preview/NavigationDetailsPreview';
import NavigationDetailInput from '@/components/create/NavigationDetailInput';
import MainViewInput from '@/components/create/MainViewInput';
import StickerInput from '@/components/create/StickerInput';
import StickerPreview from '@/components/create/preview/StickerPreview';
import { debounce } from '@/utils/debounce';

const OBSERVER_OPTIONS = {
  root: null,
  rootMargin: '0px',
  threshold: 0.9,
};

const DELAY_TIME: number = 300;

const CreateCardPage = () => {
  const browserClient = createClient();
  const queryClient = useQueryClient();
  const { data: existingInvitation } = useInvitationQuery();

  const mutation = useMutation({
    mutationFn: async (invitationData: InvitationFormType) => {
      const user = await getUserInfo();

      const convertedInvitation = underscoreInvitation(invitationData);

      const { error } = existingInvitation
        ? await browserClient.from('invitation').update(convertedInvitation).eq('user_id', user.user.id)
        : await browserClient.from('invitation').insert([convertedInvitation]);

      if (error) {
        console.error(error);
      } else {
        existingInvitation ? alert('수정 완료되었습니다.') : alert('제출 완료되었습니다.');
      }
    },
    onSuccess: () => queryClient.invalidateQueries(),
  });

  const methods = useForm<InvitationFormType>({
    mode: 'onChange',
    defaultValues: {
      mainView: {
        color: '#ffffff',
      },
      stickers: [],
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
      },
      navigationDetail: {
        map: false,
        navigationButton: false,
        car: '',
        subway: '',
        bus: '',
      },
      gallery: '',
      type: '',
      mood: '',
      bgColor: '',
      imgRatio: '',
      mainText: '',
      greetingMessage: '',
      dDay: false,
    },
  });
  const { reset } = methods;

  const camelizeInvitation = (invitation: Invitation): InvitationFormType => {
    return {
      gallery: invitation.gallery,
      type: invitation.type,
      mood: invitation.mood,
      mainView: invitation.main_view,
      bgColor: invitation.bg_color,
      stickers: invitation.stickers as StickerType[],
      imgRatio: invitation.img_ratio,
      mainText: invitation.main_text,
      greetingMessage: invitation.greeting_message,
      guestbook: invitation.guestbook as boolean,
      attendance: invitation.attendance as boolean,
      personalInfo: invitation.personal_info as PersonalInfoType,
      weddingInfo: invitation.wedding_info as WeddingInfoType,
      account: invitation.account as AccountInfoType,
      navigationDetail: invitation.navigation_detail as NavigationDetailType,
      dDay: invitation.d_day as boolean,
      mainPhotoInfo: invitation.main_photo_info as MainPhotoType,
    };
  };

  const underscoreInvitation = (invitation: InvitationFormType) => {
    return {
      gallery: invitation.gallery,
      type: invitation.type,
      mood: invitation.mood,
      main_view: invitation.mainView,
      bg_color: invitation.bgColor,
      stickers: invitation.stickers as StickerType[],
      img_ratio: invitation.imgRatio,
      main_text: invitation.mainText,
      greeting_message: invitation.greetingMessage,
      guestbook: invitation.guestbook as boolean,
      attendance: invitation.attendance as boolean,
      personal_info: invitation.personalInfo as PersonalInfoType,
      wedding_info: invitation.weddingInfo as WeddingInfoType,
      account: invitation.account as AccountInfoType,
      navigation_detail: invitation.navigationDetail as NavigationDetailType,
      d_day: invitation.dDay as boolean,
      main_photo_info: invitation.mainPhotoInfo as MainPhotoType,
    };
  };

  useEffect(() => {
    if (existingInvitation) {
      const convertedInvitation = camelizeInvitation(existingInvitation);
      reset(convertedInvitation);
    }
  }, [existingInvitation]);

  const onSubmit = async (invitationData: InvitationFormType) => {
    mutation.mutate(invitationData);
  };

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
    useRef<HTMLDivElement | null>(null),
  ];

  const observers = useRef<IntersectionObserver[]>([]);
  const isNavigating = useRef<boolean>(false);

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
      const color = value.mainView.color;
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
        ref={refs[5]}
      >
        <GuestInfoPreview control={methods.control} />
      </div>
      <div
        className='min-h-[calc(100vh-114px)]'
        ref={refs[6]}
      >
        colorpalette
      </div>
      {/*스티커 붙이기*/}
      <div
        className='min-h-[calc(100vh-114px)]'
        ref={refs[7]}
      >
        <div
          id='main-photo'
          className='w-full h-[400px] bg-amber-100 relative'
        >
          임시 메인사진 영역
          <StickerPreview control={methods.control} />
        </div>
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
            {currentStep === 8 && <StickerInput />}
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
