import { useGetAllStickers } from '@/hooks/queries/useGetStickers';
import { useState } from 'react';
import StickerCategoryButton from '@/components/create/stickerInput/StickerCategoryButton';
import StickerSlot from '@/components/create/stickerInput/StickerSlot';
import { MOOD_LIST } from '@/constants/invitationMoods';

const StickerInput = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('classic');

  const { data: stickerByCategory, isLoading, error } = useGetAllStickers();
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
  };

  const renderSticker = () => {
    if (!stickerByCategory) return null;

    if (selectedCategory === null) {
      return Object.keys(stickerByCategory).map((category) =>
        stickerByCategory[category].map((sticker) => (
          <StickerSlot
            key={sticker.id}
            stickerImage={sticker}
          />
        )),
      );
    }

    return stickerByCategory[selectedCategory].map((sticker) => (
      <StickerSlot
        key={sticker.id}
        stickerImage={sticker}
      />
    ));
  };

  return (
    <div>
      <div className='flex mb-[40px] gap-[8px] flex-wrap'>
        {MOOD_LIST.map((mood) => (
          <StickerCategoryButton
            key={`${mood.category}-button`}
            category={mood}
            onClick={() => {
              handleSelectCategory(mood.category);
            }}
            isSelected={selectedCategory === mood.category}
          />
        ))}
      </div>
      {stickerByCategory && stickerByCategory[selectedCategory as string] ? (
        <div className='grid grid-cols-4 grid-cols-row-2 gap-[8px]'>{renderSticker()}</div>
      ) : (
        <div className='w-full text-center'>준비중인 무드입니다.</div>
      )}
    </div>
  );
};

export default StickerInput;
