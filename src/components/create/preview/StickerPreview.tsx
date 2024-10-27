import { Control, useWatch } from 'react-hook-form';
import { InvitationFormType } from '@/types/invitationFormType.type';
import Image from 'next/image';

const StickerPreview = ({ control }: { control: Control<InvitationFormType> }) => {
  const stickersWatch = useWatch({
    control,
    name: 'stickers',
  });

  console.log('StickerPreview: ', stickersWatch);

  return (
    <div className='w-full h-full'>
      {stickersWatch?.map((sticker) => (
        <Image
          src={sticker.url}
          alt={sticker.stickerImageId}
          key={sticker.id}
          width={100}
          height={100}
        />
      ))}
    </div>
  );
};

export default StickerPreview;
