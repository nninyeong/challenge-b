import { createStore } from 'zustand';

export interface ReviewBottomSheetProps {
  isReviewBottomSheetOpen: boolean;
}

export interface ReviewBottomSheetState extends ReviewBottomSheetProps {
  setIsReviewBottomSheetOpen: (isReviewBottomSheetOpen: boolean) => void;
}
export type ReviewBottomSheetStore = ReturnType<typeof createReviewBottomSheetStore>;
export const createReviewBottomSheetStore = (initProps?: Partial<ReviewBottomSheetProps>) => {
  const DEFAULT_PROPS: ReviewBottomSheetProps = {
    isReviewBottomSheetOpen: false,
  };

  return createStore<ReviewBottomSheetState>()((set) => ({
    ...DEFAULT_PROPS,
    ...initProps,
    setIsReviewBottomSheetOpen: (isReviewBottomSheetOpen: boolean) => set({ isReviewBottomSheetOpen }),
  }));
};
