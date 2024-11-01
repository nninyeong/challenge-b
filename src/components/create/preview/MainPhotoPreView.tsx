import { InvitationFormType } from '@/types/invitationFormType.type';
import { Control, useWatch } from 'react-hook-form';
import MainPhoto from '@/components/card/MainPhoto';

const MainPhotoPreView = ({ control }: { control: Control<InvitationFormType> }) => {
  const mainPhotoInfo = useWatch({
    control,
    name: 'mainPhotoInfo',
  });

  const svgBgColor = useWatch({
    control,
    name: 'bgColor',
  });

  const mainViewType = useWatch({
    control,
    name: 'mainView',
  });

  const stickers = useWatch({
    control,
    name: 'stickers',
  });

  return (
    <MainPhoto
      mainPhotoInfo={mainPhotoInfo}
      bgColor={svgBgColor}
      mainView={mainViewType}
      stickers={stickers}
    />
  );
};

export default MainPhotoPreView;
