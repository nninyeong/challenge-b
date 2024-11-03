import { InvitationFormType } from '@/types/invitationFormType.type';
import { Control } from 'react-hook-form';
import WeddingGallery from '@/components/card/WeddingGallery';
import { DndProvider } from 'react-dnd';
import { HTML5toTouch } from '@/lib/reactDnd/dndBackends';
const GalleryPreview = ({ control }: { control: Control<InvitationFormType> }) => {
  return (
    <DndProvider options={HTML5toTouch}>
      <WeddingGallery control={control} />;
    </DndProvider>
  );
};

export default GalleryPreview;
