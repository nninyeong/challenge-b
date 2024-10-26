import { StickerImage } from '@/types/stickerData.types';
import Image from 'next/image';
import FlexColCenterContainer from '@/components/FlexColCenterContainer';

type PropsType = {
  sticker: StickerImage;
};

const StickerSlot = ({ sticker }: PropsType) => {
  return (
    <FlexColCenterContainer className='bg-gray-600/50 rounded w-[71px] h-[71px]'>
      <Image
        alt='sticker'
        key={sticker.id}
        src={sticker.url}
        className='w-16 h-16 object-cover m-2'
        width={100}
        height={100}
      />
    </FlexColCenterContainer>
  );
};

export default StickerSlot;
