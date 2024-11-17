import DaumPostcode, { Address } from 'react-daum-postcode';
import { useEffect } from 'react';

const AddressModal = ({ onComplete: setAddress }: { onComplete: (value: Address) => void }) => {
  useEffect(() => {
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.documentElement.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className='fixed flex justify-center items-center inset-0 w-full h-full px-[16px] bg-[#404040]/50 z-50'>
      <div className='w-fit'>
        <DaumPostcode onComplete={setAddress} />
      </div>
    </div>
  );
};

export default AddressModal;
