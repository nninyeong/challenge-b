'use client';
import AccountInput from '@/components/create/AccountInput';
import AttendanceInput from '@/components/create/AttendanceInput';
import AttendancePreview from '@/components/create/preview/AttendancePreview';
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
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { InvitationFormType } from '@/types/invitationFormType.type';

const CreateCardPage = () => {
  const browserClient = createClient();
  const queryClient = useQueryClient();

  const { data: existingInvitation } = useQuery({
    queryKey: ['invitation'],
    queryFn: async () => {
      const user = await getUserInfo();

      if (user) {
        const { data, error } = await browserClient.from('invitation').select('*').eq('user_id', user.user.id).single();

        if (error) {
          console.error(error);
          return null;
        }
        return data ?? null;
      }
      return null;
    },
  });

  const mutation = useMutation({
    mutationFn: async (formattedData: InvitationFormType) => {
      const user = await getUserInfo();

      const { error } = existingInvitation
        ? await browserClient.from('invitation').update(formattedData).eq('user_id', user.user.id)
        : await browserClient.from('invitation').insert([formattedData]);

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
      gallery: '',
      type: '',
      mood: '',
      main_view: '',
      bg_color: '',
      stickers: '',
      img_ratio: '',
      main_text: '',
      greeting_message: '',
    },
  });
  const { reset } = methods;

  useEffect(() => {
    if (existingInvitation) {
      reset(existingInvitation);
    }
  }, [existingInvitation]);

  const onSubmit = async (invitationData: InvitationFormType) => {
    // 폼 완료되면 수정해야함
    const formattedData = {
      ...invitationData,
      gallery: '',
      type: '',
      mood: '',
      main_view: '',
      bg_color: '',
      stickers: '',
      img_ratio: '',
      main_text: '',
      greeting_message: '',
    };
    console.log(invitationData);

    mutation.mutate(formattedData);
  };

  const [currentStep, setCurrentStep] = useState(1);
  const refs = [
    useRef<HTMLDivElement | null>(null),
    useRef<HTMLDivElement | null>(null),
    useRef<HTMLDivElement | null>(null),
    useRef<HTMLDivElement | null>(null),
  ];

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
  console.log(currentStep);
  return (
    <div className='relative w-full h-full'>
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
      {/*참석여부*/}
      <div
        className='min-h-[calc(100vh-114px)]'
        ref={refs[3]}
      >
        <AttendancePreview control={methods.control} />
      </div>

      <div className='fixed bottom-0 left-0 right-0 px-4'>
        <FormProvider {...methods}>
          <form
            className='bg-[#bfbfbf] bg-opacity-50 px-4 rounded-lg h-[320px]'
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
            {currentStep === 4 && <AttendanceInput />}
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
