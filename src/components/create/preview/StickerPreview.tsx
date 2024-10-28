import { Control, useWatch } from 'react-hook-form';
import { InvitationFormType } from '@/types/invitationFormType.type';
import Sticker from '@/components/create/stickerInput/Sticker';
import { useRef } from 'react';

const StickerPreview = ({ control }: { control: Control<InvitationFormType> }) => {
  const stickersWatch = useWatch({
    control,
    name: 'stickers',
  });

  const previewRef = useRef<HTMLDivElement | null>(null);
  const preventDefaultBehaviour = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div
      className='w-full h-full relative'
      ref={previewRef}
      onDrop={preventDefaultBehaviour}
      onDragOver={preventDefaultBehaviour}
    >
      {stickersWatch?.map((sticker) => (
        <Sticker
          key={sticker.id}
          sticker={sticker}
          previewRef={previewRef}
        />
      ))}
    </div>
  );
};

export default StickerPreview;
