import { useEffect, useRef } from 'react';

type ObserverOptions = {
  root?: HTMLElement | null;
  rootMargin?: string;
  threshold?: number;
};

const DEFAULT_OPTIONS: ObserverOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.9,
};

export const useIntersectionObserver = (refs: (HTMLDivElement | null)[], setCurrentStep: (step: number) => void) => {
  const observers = useRef<IntersectionObserver[]>([]);
  const isNavigating = useRef<boolean>(false);

  useEffect(() => {
    const initializeObserver = () => {
      unsubscribeObservers();
      refs.forEach((ref, index) => {
        if (ref) {
          const observer = new IntersectionObserver(observerCallback, DEFAULT_OPTIONS);
          observer.observe(ref);
          observers.current[index] = observer;
        }
      });
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      if (isNavigating.current) return;
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const currentStepIndex = refs.findIndex((ref) => ref === entry.target);
          setCurrentStep(currentStepIndex + 1);
        }
      });
    };

    const unsubscribeObservers = () => {
      observers.current.forEach((observer, index) => {
        if (refs[index]) observer.unobserve(refs[index]!);
      });
    };

    initializeObserver();

    return () => unsubscribeObservers();
  }, [refs, setCurrentStep]);

  return { isNavigating };
};
