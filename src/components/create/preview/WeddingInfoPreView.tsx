import { Control, useWatch } from 'react-hook-form';
import { InvitationFormType } from '@/types/invitationFormType.type';
import WeddingInfo from '@/components/card/WeddingInfo';

const WeddingInfoPreView = ({ control }: { control: Control<InvitationFormType> }) => {
  const weddingInfo = useWatch({
    control,
    name: 'weddingInfo',
  });

  const fontInfo = useWatch({
    control,
    name: 'fontInfo',
  });

  return (
    <WeddingInfo
      weddingInfo={weddingInfo}
      fontInfo={fontInfo}
    />
  );
};

export default WeddingInfoPreView;
