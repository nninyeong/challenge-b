'use client';

import { motion } from 'framer-motion';
import ReviewForm from './ReviewForm';

const ReviewWriteBottomSheet = ({
  setOpenBottomSheet,
}: {
  setOpenBottomSheet: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <motion.div
      key='bottom-sheet'
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      transition={{ stiffness: 100 }}
      className='fixed bottom-0 inset-x-0 mx-auto w-[375px] h-[555px] p-[16px] rounded-t-[24px] z-50 flex flex-col items-center bg-white shadow-lg'
      style={{ transform: 'translateY(0%)' }}
    >
      <button
        onClick={() => setOpenBottomSheet(false)}
        className='fixed top-[16px] right-[16px]'
      >
        <img
          src='/assets/images/icons/x-03.svg'
          alt='close'
        />
      </button>
      <ReviewForm setOpenBottomSheet={setOpenBottomSheet} />
    </motion.div>
  );
};

export default ReviewWriteBottomSheet;
