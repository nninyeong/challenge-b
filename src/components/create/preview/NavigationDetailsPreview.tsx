import { InvitationFormType } from '@/types/invitationFormType.type';
import { Control, useWatch } from 'react-hook-form';
import NavigationDetails from '@/components/card/NavigationDetails';

const NavigationDetailsPreview = ({ control }: { control: Control<InvitationFormType> }) => {
  const navigationDetail = useWatch({
    control,
    name: 'navigationDetail',
  });

  const weddingInfo = useWatch({
    control,
    name: 'weddingInfo',
  });

  return (
    <NavigationDetails
      navigationDetail={navigationDetail}
      weddingInfo={weddingInfo}
    />
  );
};

export default NavigationDetailsPreview;
