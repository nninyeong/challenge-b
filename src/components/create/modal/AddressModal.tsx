import DaumPostcode, { Address } from 'react-daum-postcode';

const AddressModal = ({ onComplete: setAddress }: { onComplete: (value: Address) => void }) => {
  return (
    <div className='fixed top-0 bottom-0 left-0 right-0 w-full h-full px-[16px] bg-[#404040]/50 flex justify-center items-center'>
      <DaumPostcode onComplete={setAddress} />
    </div>
  );
};

export default AddressModal;
