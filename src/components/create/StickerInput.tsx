'use client';
import { useGetAllStickers } from '@/hooks/queries/useGetStickers';
import { useState, useEffect } from 'react';
import StickerCategoryButton from '@/components/create/stickerInput/StickerCategoryButton';
import StickerSlot from '@/components/create/stickerInput/StickerSlot';
import { MOOD_LIST } from '@/constants/invitationMoods';
import { Notify } from 'notiflix';

const StickerInput = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('classic');

  const { data: stickerByCategory, isLoading, error } = useGetAllStickers();

  useEffect(() => {
    if (stickerByCategory && !stickerByCategory[selectedCategory]) {
      Notify.info('준비중인 서비스입니다.');
    }
  }, [selectedCategory, stickerByCategory]);

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

    return stickerByCategory[selectedCategory]?.map((sticker) => (
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
      {stickerByCategory && stickerByCategory[selectedCategory] ? (
        <div className='grid grid-cols-4 gap-[9px] h-[150px] overflow-auto'>{renderSticker()}</div>
      ) : null}
    </div>
  );
};

export default StickerInput;
