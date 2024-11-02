import { Control, useWatch } from 'react-hook-form';
import { InvitationFormType } from '@/types/invitationFormType.type';
import WeddingInfo from '@/components/card/WeddingInfo';

const WeddingInfoPreView = ({ control }: { control: Control<InvitationFormType> }) => {
  const weddingInfo = useWatch({
    control,
    name: 'weddingInfo',
  });

  return <WeddingInfo weddingInfo={weddingInfo} />;
};

export default WeddingInfoPreView;
