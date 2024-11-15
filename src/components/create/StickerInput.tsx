'use client';
import { useState } from 'react';
import StickerCategoryButton from '@/components/create/stickerInput/StickerCategoryButton';
import StickerSlot from '@/components/create/stickerInput/StickerSlot';
import { MOOD_LIST } from '@/constants/invitationMoods';
import { StickerLoading } from '../loading/StickerLoading';
import { useGetCategorizedStickers } from '@/hooks/queries/useGetCategorizedStickers';

const StickerInput = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('classic');

  const { data: categorizedStickers, isLoading, error } = useGetCategorizedStickers();

  useEffect(() => {
    if (categorizedStickers && !categorizedStickers[selectedCategory]) {
      Notify.info('준비중인 서비스입니다.');
    }
  }, [selectedCategory, categorizedStickers]);

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
  };

  const renderSticker = () => {
    if (!categorizedStickers) return null;

    if (selectedCategory === null) {
      return Object.keys(categorizedStickers).map((category) =>
        categorizedStickers[category].map((sticker) => (
          <StickerSlot
            key={sticker.id}
            stickerImage={sticker}
          />
        )),
      );
    }

    return categorizedStickers[selectedCategory]?.map((sticker) => (
      <StickerSlot
        key={sticker.id}
        stickerImage={sticker}
      />
    ));
  };

  return (
    <div>
      <div className='flex mb-[35px] gap-[8px] flex-wrap'>
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
      {isLoading ? (
        <StickerLoading />
      ) : categorizedStickers && categorizedStickers[selectedCategory] ? (
        <div className='grid grid-cols-4 gap-[9px] h-[150px] overflow-auto'>{renderSticker()}</div>
      ) : null}
    </div>
  );
};

export default StickerInput;
