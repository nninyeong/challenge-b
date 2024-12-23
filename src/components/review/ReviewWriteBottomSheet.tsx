'use client';

import { motion } from 'framer-motion';
import ReviewForm from './ReviewForm';
import { useReviewBottomSheetContext } from '@/provider/reviewBottomSheetProvider';

const ReviewWriteBottomSheet = () => {
  const { setIsReviewBottomSheetOpen } = useReviewBottomSheetContext((state) => state);
  return (
    <motion.div
      key='bottom-sheet'
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      transition={{ stiffness: 100 }}
      className='fixed bottom-0 inset-x-0 mx-auto max-w-[375px] h-[555px] p-[16px] pb-[27px] rounded-t-[24px] z-50 flex flex-col items-center justify-end bg-white shadow-lg'
      style={{ transform: 'translateY(0%)' }}
    >
      <button
        onClick={() => setIsReviewBottomSheetOpen(false)}
        className='absolute top-[16px] right-[16px]'
      >
        <img
          src='/assets/images/icons/x-03.webp'
          alt='close'
          className='w-[24px] h-[24px]'
          loading='lazy'
        />
      </button>
      <ReviewForm />
    </motion.div>
  );
};

export default ReviewWriteBottomSheet;
