import { InvitationFormType } from '@/types/invitationFormType.type';
import { Control, useWatch } from 'react-hook-form';

const MainPhotoPreView = ({ control }: { control: Control<InvitationFormType> }) => {
  const MainPhotoWatch = useWatch({
    control,
    name: 'mainPhoto_info',
  });
  return <div>MainPhotoPreView</div>;
};

export default MainPhotoPreView;
