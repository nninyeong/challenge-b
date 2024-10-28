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
  NavigationDetailType,
  PersonalInfoType,
  WeddingInfoType,
} from '@/types/invitationFormType.type';
import { AccountInfoType } from '@/types/accountType.type';
import NavigationDetailsPreview from '@/components/create/preview/NavigationDetailsPreview';
import NavigationDetailInput from '@/components/create/NavigationDetailInput';
import MainViewInput from '@/components/create/MainViewInput';
import { Invitation } from '@/types/InvitationData.type';
import { useInvitationQuery } from '@/hooks/queries/useInvitationQuery';

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
      stickers: '',
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
      stickers: invitation.stickers,
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
    };
  };

  const underscoreInvitation = (invitation: InvitationFormType) => {
    return {
      gallery: invitation.gallery,
      type: invitation.type,
      mood: invitation.mood,
      main_view: invitation.mainView,
      bg_color: invitation.bgColor,
      stickers: invitation.stickers,
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
  ];

  useEffect(() => {
    const subscription = methods.watch((value) => {
      const color = value.mainView.color;
      if (color) {
        setBackgroundColor(`rgba(${color.r},${color.g},${color.b},${color.a})`);
      }
      return () => subscription.unsubscribe();
    });
  }, [methods]);

  const handleNext = () => {
    if (currentStep < refs.length) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  useEffect(() => {
    if (refs[currentStep - 1].current) {
      refs[currentStep - 1].current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [currentStep]);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.9,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const stepIndex = refs.findIndex((ref) => ref.current === entry.target);
          if (stepIndex !== -1) {
            setCurrentStep(stepIndex + 1);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    refs.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      refs.forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, [refs]);
  return (
    <div
      className='relative w-full h-full'
      style={{
        backgroundColor: backgroundColor,
      }}
    >
      <div
        className='min-h-[calc(100vh-114px)]'
        ref={refs[0]}
      >
        <PersonalInfoPreview control={methods.control} />
      </div>
      {/*r계좌 프리뷰*/}
      <div
        className='min-h-[calc(100vh-114px)]'
        ref={refs[1]}
      >
        <AccountPreView control={methods.control} />
      </div>
      {/*웨딩 정보 프리뷰*/}
      <div
        className='min-h-[calc(100vh-114px)]'
        ref={refs[2]}
      >
        <WeddingInfoPreView control={methods.control} />
      </div>
      {/* 지도, 교통정보 */}
      <div
        className='min-h-[calc(100vh-114px)]'
        ref={refs[3]}
      >
        <NavigationDetailsPreview control={methods.control} />
      </div>
      {/*참석여부*/}
      <div
        className='min-h-[calc(100vh-114px)]'
        ref={refs[4]}
      >
        <GuestInfoPreview control={methods.control} />
      </div>
      {/*참석여부*/}
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
                onClick={handlePrevious}
                className='bg-red-300'
                disabled={currentStep === 1}
              >
                <MdNavigateBefore />
              </button>
              <button
                className='bg-blue-300'
                type='button'
                onClick={handleNext}
                disabled={currentStep === refs.length}
              >
                <MdNavigateNext />
              </button>
            </div>
            {currentStep === 1 && <PersonalInfoInput />}
            {currentStep === 2 && <AccountInput />}
            {currentStep === 3 && <WeddingInfoInput />}
            {currentStep === 4 && <NavigationDetailInput />}
            {currentStep === 5 && <GuestInfoInput />}
            {currentStep === 6 && <MainViewInput />}
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
