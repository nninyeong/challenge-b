'use client';
import { useEffect, useRef, useState } from 'react';
import { Control, FormProvider, useForm, useFormContext, useWatch } from 'react-hook-form';

const Test1Watch = ({ control }: { control: Control<{ test1: string; test2: string; test3: string }> }) => {
  const test1Watch = useWatch({
    control,
    name: 'test1',
  });
  return <p>Watch: {test1Watch}</p>;
};
const Test2Watch = ({ control }: { control: Control<{ test1: string; test2: string; test3: string }> }) => {
  const test2Watch = useWatch({
    control,
    name: 'test2',
  });
  return <p>Watch: {test2Watch}</p>;
};
const Test3Watch = ({ control }: { control: Control<{ test1: string; test2: string; test3: string }> }) => {
  const test3Watch = useWatch({
    control,
    name: 'test3',
  });
  return <p>Watch: {test3Watch}</p>;
};

const CreateCardPage = () => {
  const methods = useForm({ mode: 'onChange', defaultValues: { test1: '', test2: '', test3: '' } });
  const onSubmit = (data: { test1: string; test2: string; test3: string }) => console.log(data);
  const [currentStep, setCurrentStep] = useState(1);
  const refs = [
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
            setCurrentStep(stepIndex + 1); // Update the step based on visible section
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
    <div className='relative'>
      <div className='fixed bottom-0 w-full'>
        <button
          type='button'
          onClick={handlePrevious}
          className='bg-red-300'
          disabled={currentStep === 1}
        >
          Previous
        </button>
        <button
          className='bg-blue-300'
          type='button'
          onClick={handleNext}
          disabled={currentStep === refs.length}
        >
          Next
        </button>
      </div>
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
        className='overflow-auto'
        style={{ height: 'calc(100vh - 114px)', paddingBottom: '60px' }}
      >
        {/* 현재 단계에 맞는 컴포넌트 및 입력 필드 */}
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className='fixed bottom-5 right-0'
          >
            <div style={{ display: currentStep === 1 ? 'block' : 'none' }}>
              <InputTest1 />
            </div>
            <div style={{ display: currentStep === 2 ? 'block' : 'none' }}>
              <InputTest2 />
            </div>
            <div style={{ display: currentStep === 3 ? 'block' : 'none' }}>
              <InputTest3 />
            </div>
            <button
              style={{ display: currentStep === 3 ? 'block' : 'none' }}
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
