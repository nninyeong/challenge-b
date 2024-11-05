'use client';
import {
  createReviewBottomSheetStore,
  ReviewBottomSheetProps,
  ReviewBottomSheetState,
  ReviewBottomSheetStore,
} from '@/store/reviewBottomSheetStore';
import { createContext, useContext, useRef } from 'react';
import { useStore } from 'zustand';

export const useReviewBottomSheetContext = <T,>(selector: (state: ReviewBottomSheetState) => T) => {
  const store = useContext(ReviewBottomSheetContext);
  if (!store) throw new Error('Missing CartContext.Provider in the tree');
  return useStore(store, selector);
};

export const ReviewBottomSheetContext = createContext<ReviewBottomSheetStore | null>(null);

type ReviewBottomSheetProviderProps = React.PropsWithChildren<ReviewBottomSheetProps>;

export const ReviewBottomSheetProvider = ({ children, ...props }: ReviewBottomSheetProviderProps) => {
  const storeRef = useRef<ReviewBottomSheetStore>();
  if (!storeRef.current) {
    storeRef.current = createReviewBottomSheetStore(props);
  }
  return <ReviewBottomSheetContext.Provider value={storeRef.current}>{children}</ReviewBottomSheetContext.Provider>;
};
