import { motion } from 'framer-motion';
const OnBoardingStepMotion = ({ step }: { step: number }) => {
  if (step === 0) {
    return (
      <motion.div
        animate={{ y: -35 }}
        transition={{ type: 'spring', repeat: Infinity, duration: 1 }}
        className='w-[20px] h-[20px] rounded-full bg-white'
      />
    );
  }

  if (step === 1) return <div className='w-[40px] h-[30px] border-2 border-white border-solid rounded-lg bg-white' />;

  if (step === 2) {
    return (
      <motion.div
        animate={{
          height: [30, 10, 30],
        }}
        transition={{ duration: 2, repeat: Infinity }}
        className='w-[40px] border-2 border-white border-solid bg-white rounded-lg'
      />
    );
  }

  if (step < 0 || step > 2) return null;
};

export default OnBoardingStepMotion;
