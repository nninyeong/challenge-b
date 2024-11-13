'use client';

import { motion } from 'framer-motion';

const Loading = () => {
  return (
    <div className='flex flex-col justify-center items-center h-screen relative'>
      <div className='flex flex-col justify-center items-center'>
        <motion.img
          src='/assets/images/branding/3D-logo.webp'
          alt='드림카드'
          className='w-[104px] h-[98px] z-[20]'
          initial={{ y: 0, opacity: 1, rotate: 15 }}
          animate={{ y: [0, -20, 0], opacity: 1 }}
          transition={{
            duration: 1.5,
            ease: 'easeInOut',
            repeat: Infinity,
          }}
        />

        <motion.img
          src='/assets/images/branding/shadow.png'
          alt='Loading..'
          initial={{ width: '117px', height: '18px' }}
          animate={{
            width: ['117px', '97px', '117px'],
            height: ['18px', '10px', '18px'],
          }}
          transition={{
            duration: 1.5,
            ease: 'easeInOut',
            repeat: Infinity,
          }}
        />
      </div>

      <p className='absolute top-[calc(50%+90px)] text-center w-full'>특별한 순간을 준비하는 중이에요!</p>
    </div>
  );
};

export default Loading;
