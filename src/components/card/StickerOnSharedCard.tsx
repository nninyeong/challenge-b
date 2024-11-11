import { StickerType } from '@/types/invitationFormType.type';

const StickerOnSharedCard = ({ sticker }: { sticker: StickerType }) => {
  return (
    <img
      src={sticker.url}
      alt=''
      style={{
        position: 'absolute',
        top: `${sticker.posY}%`,
        left: `${sticker.posX}%`,
        width: `${sticker.width}px`,
        height: `${sticker.height}px`,
        transform: `translate(-50%, -50%) rotate(${sticker.rotation}deg) scale(${sticker.scale ?? 1})`,
      }}
    />
  );
};

export default StickerOnSharedCard;
