import { InvitationFormType } from '@/types/invitationFormType.type';
import { Control, useWatch } from 'react-hook-form';
import WeddingGallery from '@/components/card/WeddingGallery';

const GalleryPreview = ({ control }: { control: Control<InvitationFormType> }) => {
  const gallery = useWatch({
    control,
    name: 'gallery',
  });

  const fontInfo = useWatch({
    control,
    name: 'fontInfo',
  });

  return (
    <WeddingGallery
      gallery={gallery}
      fontInfo={fontInfo}
    />
  );
};

export default GalleryPreview;
