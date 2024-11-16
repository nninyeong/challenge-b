'use client';
import { useGetCategorizedStickers } from '@/hooks/queries/useGetStickers';
import { useState, useEffect } from 'react';
import StickerCategoryButton from '@/components/create/stickerInput/StickerCategoryButton';
import StickerSlot from '@/components/create/stickerInput/StickerSlot';
import { MOOD_LIST } from '@/constants/invitationMoods';
import { Notify } from 'notiflix';
import { StickerLoading } from '../loading/StickerLoading';

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
    <div className='flex flex-col items-center gap-[10px]'>
      <div className='flex gap-[8px] flex-wrap'>
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
        <div className='grid grid-cols-4 gap-[9px] h-[150px] overflow-x-hidden overflow-y-auto'>{renderSticker()}</div>
      ) : null}
    </div>
  );
};

export default StickerInput;
