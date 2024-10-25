'use client';
import AccountInput from '@/components/create/AccountInput';
import AttendanceInput from '@/components/create/AttendanceInput';
import AccountPreView from '@/components/create/preview/AccountPreView';
import AttendancePreview from '@/components/create/preview/AttendancePreview';
import { AccountInfoType } from '@/types/accountType.type';
import { useEffect, useRef, useState } from 'react';
import { Control, FormProvider, useForm, useFormContext, useWatch } from 'react-hook-form';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';

export type FormType = {
  test1: string;
  test2: string;
  test3: string;
  account: AccountInfoType;
  guestbook: boolean;
  attendance: boolean;
};

const Test1Watch = ({ control }: { control: Control<FormType> }) => {
  const test1Watch = useWatch({
    control,
    name: 'test1',
  });
  return <p>Watch: {test1Watch}</p>;
};
const Test2Watch = ({ control }: { control: Control<FormType> }) => {
  const test2Watch = useWatch({
    control,
    name: 'test2',
  });
  return <p>Watch: {test2Watch}</p>;
};
const Test3Watch = ({ control }: { control: Control<FormType> }) => {
  const test3Watch = useWatch({
    control,
    name: 'test3',
  });
  return <p>Watch: {test3Watch}</p>;
};

const CreateCardPage = () => {
  const methods = useForm({
    mode: 'onChange',
    defaultValues: {
      test1: '',
      test2: '',
      test3: '',
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
    },
  });

  const onSubmit = (data: FormType) => console.log(data);
  const [currentStep, setCurrentStep] = useState(1);
  const refs = [
    useRef<HTMLDivElement | null>(null),
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
        style={{ minHeight: 'calc(100vh - 114px)' }}
        ref={refs[0]}
      >
        테스트1
        <Test1Watch control={methods.control} />
      </div>
      <div
        style={{ minHeight: 'calc(100vh - 114px)' }}
        ref={refs[1]}
      >
        테스트2
        <Test2Watch control={methods.control} />
      </div>
      <div
        style={{ minHeight: 'calc(100vh - 114px)' }}
        ref={refs[2]}
      >
        테스트3
        <Test3Watch control={methods.control} />
      </div>
      <div
        style={{ minHeight: 'calc(100vh - 114px)' }}
        ref={refs[3]}
      >
        <AccountPreView control={methods.control} />
      </div>
      <div
        style={{ minHeight: 'calc(100vh - 114px)' }}
        ref={refs[4]}
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
            <div style={{ display: currentStep === 1 ? 'block' : 'none' }}>
              <InputTest1 />
            </div>
            <div style={{ display: currentStep === 2 ? 'block' : 'none' }}>
              <InputTest2 />
            </div>
            <div style={{ display: currentStep === 3 ? 'block' : 'none' }}>
              <InputTest3 />
            </div>
            <div style={{ display: currentStep === 4 ? 'block' : 'none' }}>
              <AccountInput />
            </div>
            <div style={{ display: currentStep === 5 ? 'block' : 'none' }}>
              <AttendanceInput />
            </div>
            <button
              style={{ display: currentStep === 5 ? 'block' : 'none' }}
              type='submit'
            >
              제출
            </button>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

const InputTest1 = () => {
  const { register } = useFormContext();
  return (
    <div>
      <input
        {...register('test1')}
        placeholder='input1'
      />
    </div>
  );
};

const InputTest2 = () => {
  const { register } = useFormContext();
  return (
    <div>
      <input
        {...register('test2')}
        placeholder='input2'
      />
    </div>
  );
};

const InputTest3 = () => {
  const { register } = useFormContext();
  return (
    <div>
      <input
        {...register('test3')}
        placeholder='input3'
      />
    </div>
  );
};

export default CreateCardPage;
