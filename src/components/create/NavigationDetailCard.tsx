type NavigationDetailProps = {
  label: string;
  info: string;
};

const NavigationDetailCard = ({ label, info }: NavigationDetailProps) => {
  return (
    <div>
      <div>{label} 안내</div>
      <div>{info}</div>
    </div>
  );
};

export default NavigationDetailCard;
