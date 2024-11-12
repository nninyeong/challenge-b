type NavigationDetailProps = {
  label: string;
  info: string;
  fontColor: string;
};

const NavigationDetailCard = ({ label, info, fontColor }: NavigationDetailProps) => {
  return (
    <div
      style={{ color: `${fontColor}` }}
      className='w-full px-4 mb-6'
    >
      <div className='text-opctiy-50  mb-[14px]'>{label} 안내</div>
      <div className='text-opctiy-70  break-words whitespace-pre-wrap leading-loose'>{info}</div>
    </div>
  );
};

export default NavigationDetailCard;
