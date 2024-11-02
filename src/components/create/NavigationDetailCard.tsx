type NavigationDetailProps = {
  label: string;
  info: string;
};

const NavigationDetailCard = ({ label, info }: NavigationDetailProps) => {
  return (
    <div className='w-full px-4 mb-6'>
      <div className='text-gray-800 mb-[14px]'>{label} 안내</div>
      <div className='text-gray-500 break-words whitespace-pre-wrap leading-loose'>{info}</div>
    </div>
  );
};

export default NavigationDetailCard;
