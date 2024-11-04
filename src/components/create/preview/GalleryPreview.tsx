import { InvitationFormType } from '@/types/invitationFormType.type';
import { Control, useWatch } from 'react-hook-form';
import WeddingGallery from '@/components/card/WeddingGallery';

const GalleryPreview = ({ control }: { control: Control<InvitationFormType> }) => {
  const gallery = useWatch({
    control,
    name: 'gallery',
  });

  return <WeddingGallery gallery={gallery} />;
};

export default GalleryPreview;
