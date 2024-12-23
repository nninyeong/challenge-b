'use client';

import usePayModalFlip from '@/hooks/kakaopay/usePayModalFlip';

type ModalProps = {
  isModalOpen: boolean;
  onClose: () => void;
  onSave: (e: React.FormEvent) => void;
  children?: React.ReactNode;
};

const KakaoPayModal: React.FC<ModalProps> = ({ isModalOpen, onClose, onSave, children }) => {
  const { isFlipped, toggleFlip } = usePayModalFlip();

  if (!isModalOpen) return null;

  return (
    <div
      className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'
      onClick={onClose}
    >
      <div
        className='bg-white p-4 desktop:px-9 desktop:py-8 rounded-xl w-[343px] desktop:w-[612px]'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='flex justify-between'>
          <h2 className='text-[16px] font-bold mb-4'>카카오페이 등록 방법</h2>
          <img
            src='/assets/images/icons/x-03.webp'
            alt='x'
            className='w-[24px] h-[24px]'
            onClick={onClose}
            loading='lazy'
          />
        </div>
        <div
          className='relative cursor-pointer w-full h-[355px] flex justify-center items-center overflow-hidden desktop:mb-4 desktop:gap-6'
          onClick={toggleFlip}
        >
          <img
            src='/assets/images/kakaopay/pay-html-1.webp'
            alt='Card_1'
            className={`absolute w-[183px] h-[355px] transition-transform duration-500 ${
              isFlipped ? 'z-10 translate-x-2' : 'z-20 -translate-x-2'
            } desktop:translate-x-0 desktop:z-10 desktop:relative`}
            loading='lazy'
          />
          <img
            src='/assets/images/kakaopay/pay-html-2.webp'
            alt='Card_2'
            className={`absolute w-[183px] h-[355px] transition-transform duration-500 ${
              isFlipped ? 'z-20 -translate-x-2' : 'z-10 translate-x-2'
            } desktop:translate-x-0 desktop:z-10 desktop:relative`}
            loading='lazy'
          />
        </div>
        <div className='flex justify-center items-center desktop:hidden'>
          <p className='flex justify-center items-center w-8 h-[18px] px-2 py-[2px] font-semibold mt-2 mb-4 bg-gray-100 rounded-full text-gray-700 text-[12px]'>
            {isFlipped ? '2/2' : '1/2'}
          </p>
        </div>
        <h2 className='text-[16px] font-bold mb-2 desktop:mb-[14px]'>카카오페이 등록</h2>
        {children && <div className='mt-4'>{children}</div>}
        <button
          onClick={onSave}
          className='w-full h-12 bg-primary300 text-[16px] font-bold text-white rounded-xl'
        >
          저장
        </button>
      </div>
    </div>
  );
};

export default KakaoPayModal;
