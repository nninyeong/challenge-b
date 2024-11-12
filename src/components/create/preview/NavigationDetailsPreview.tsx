import { InvitationFormType } from '@/types/invitationFormType.type';
import { Control, useWatch } from 'react-hook-form';
import NavigationDetails from '@/components/card/NavigationDetails';

const NavigationDetailsPreview = ({ control }: { control: Control<InvitationFormType> }) => {
  const [navigationDetail, weddingInfo, fontInfo] = useWatch({
    control,
    name: ['navigationDetail', 'weddingInfo', 'fontInfo'],
  });

  return (
    <NavigationDetails
      navigationDetail={navigationDetail}
      weddingInfo={weddingInfo}
      fontInfo={fontInfo}
    />
  );
};

export default NavigationDetailsPreview;
