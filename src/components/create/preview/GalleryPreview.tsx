import { InvitationFormType } from '@/types/invitationFormType.type';
import { Control } from 'react-hook-form';
import WeddingGallery from '@/components/card/WeddingGallery';

const GalleryPreview = ({ control }: { control: Control<InvitationFormType> }) => {
  return <WeddingGallery control={control} />;
};

export default GalleryPreview;
