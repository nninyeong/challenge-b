import { MutableRefObject, useRef } from 'react';
import { StepType } from '../create/useFormStepController';
import { debounce } from '@/utils/debounce';
import { DELAY_TIME } from '../create/useInvitationFormActions';

export const useIntersectionObserver = (
  refs: MutableRefObject<{ [key: string]: { ref: HTMLDivElement | null; order: number; inputOrder: number } }>,
  setCurrentStep: (step: StepType) => void,
) => {
  const observers = useRef<IntersectionObserver[]>([]);
  const isNavigating = useRef<boolean>(false);

  const observerCallback = debounce((entries: IntersectionObserverEntry[]) => {
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
  }, DELAY_TIME);

  const initializeObserver = () => {
    unsubscribeObservers();
    Object.values(refs.current).forEach((ref, index) => {
      if (ref.ref) {
        const label = ref.ref.getAttribute('data-label');
        const isGuestOrPhoto = label === 'guestPreview' || label === 'photoPreview';
        const threshold = isGuestOrPhoto ? 0.1 : 0.9;
        const observer = new IntersectionObserver(observerCallback, {
          root: null,
          rootMargin: '0px 0px -50% 0px',
          threshold: threshold,
        });
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
