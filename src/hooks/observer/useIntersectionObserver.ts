import { MutableRefObject, useRef } from 'react';

type ObserverOptions = {
  root?: HTMLElement | null;
  rootMargin?: string;
  threshold?: number;
};

const DEFAULT_OPTIONS: ObserverOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.65,
};

export const useIntersectionObserver = (
  refs: MutableRefObject<(HTMLDivElement | null)[]>,
  setCurrentStep: (step: number) => void,
  setNameIndex: (step: number) => void,
  setInputIndex: (step: number) => void,
) => {
  const observers = useRef<IntersectionObserver[]>([]);
  const isNavigating = useRef<boolean>(false);
  const observerCallback = (entries: IntersectionObserverEntry[]) => {
    if (isNavigating.current) return;
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const currentStepIndex = refs.current.findIndex((ref) => ref === entry.target);
        setNameIndex(0);
        setInputIndex(0);
        setCurrentStep(currentStepIndex);
      }
    });
  };
  const initializeObserver = () => {
    refs.current.forEach((ref, index) => {
      if (ref) {
        const observer = new IntersectionObserver(observerCallback, DEFAULT_OPTIONS);
        observer.observe(ref);
        observers.current[index] = observer;
      }
    });
  };
  const unsubscribeObservers = () => {
    observers.current.forEach((observer, index) => {
      if (refs.current[index]) observer.unobserve(refs.current[index]);
    });
  };

  return { isNavigating, initializeObserver, unsubscribeObservers };
};
