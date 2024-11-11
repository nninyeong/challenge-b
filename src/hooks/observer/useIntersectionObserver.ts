import { MutableRefObject, useRef } from 'react';
import { StepType } from '../create/useFormStepController';

type ObserverOptions = {
  root?: HTMLElement | null;
  rootMargin?: string;
  threshold?: number;
};

const DEFAULT_OPTIONS: ObserverOptions = {
  root: null,
  rootMargin: '0px 0px -70% 0px',
  threshold: 0.2,
};

export const useIntersectionObserver = (
  refs: MutableRefObject<{ [key: string]: { ref: HTMLDivElement | null; order: number; inputOrder: number } }>,
  setCurrentStep: (step: StepType) => void,
) => {
  const observers = useRef<IntersectionObserver[]>([]);
  const isNavigating = useRef<boolean>(false);
  const observerCallback = (entries: IntersectionObserverEntry[]) => {
    if (isNavigating.current) return;
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const label = entry.target.getAttribute('data-label');
        const currentStepIndex = refs.current[label!].order;
        const currentStepInputIndex = refs.current[label!].inputOrder;
        setCurrentStep({
          currentPreviewStep: currentStepIndex,
          currentInputStep: currentStepInputIndex,
        });
      }
    });
  };
  const initializeObserver = () => {
    Object.values(refs.current).forEach((ref, index) => {
      if (ref) {
        const observer = new IntersectionObserver(observerCallback, DEFAULT_OPTIONS);
        observer.observe(ref.ref as Element);
        observers.current[index] = observer;
      }
    });
  };
  const unsubscribeObservers = () => {
    observers.current.forEach((observer, index) => {
      if (refs.current[index]) observer.unobserve(refs.current[index].ref as Element);
    });
  };

  return { isNavigating, initializeObserver, unsubscribeObservers };
};
