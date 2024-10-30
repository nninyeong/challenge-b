import { MutableRefObject, useEffect, useRef } from 'react';

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

export const useIntersectionObserver = (
  refs: MutableRefObject<(HTMLDivElement | null)[]>,
  setCurrentStep: (step: number) => void,
  options: ObserverOptions = DEFAULT_OPTIONS,
) => {
  const observers = useRef<IntersectionObserver[]>([]);
  const isNavigating = useRef<boolean>(false);

  const observerCallback = (entries: IntersectionObserverEntry[]) => {
    if (isNavigating.current) return;

    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const currentStepIndex = refs.current.findIndex((ref) => ref === entry.target);
        setCurrentStep(currentStepIndex + 1);
      }
    });
  };

  const unsubscribeObservers = () => {
    observers.current.forEach((observer, index) => {
      if (refs.current[index]) observer.unobserve(refs.current[index]!);
    });
  };

  const initializeObserver = () => {
    unsubscribeObservers();
    refs.current.forEach((ref, index) => {
      if (ref) {
        const observer = new IntersectionObserver(observerCallback, options);
        observer.observe(ref);
        observers.current[index] = observer;
      }
    });
  };

  useEffect(() => {
    initializeObserver();
    return () => unsubscribeObservers();
  }, [refs.current]);

  return { isNavigating };
};
