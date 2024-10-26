import { useFormContext } from 'react-hook-form';
import { useAllStickers } from '@/hooks/queries/useStickers';
import { useState } from 'react';
import StickerCategoryButton from '@/components/create/stickerInput/StickerCategoryButton';
import Image from 'next/image';
import StickerSlot from '@/components/create/stickerInput/StickerSlot';

const StickerInput = () => {
  const { setValue } = useFormContext();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { data: stickerByCategory, isLoading, error } = useAllStickers();
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    console.error(error.message);
    throw new Error(error.message);
  }

  const categories: string[] = isLoading ? [] : Object.keys(stickerByCategory ?? {});
  const handleSelectCategory = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(category);
    }
  };

  const renderSticker = () => {
    if (!stickerByCategory) return null;

    if (selectedCategory === null) {
      return Object.keys(stickerByCategory).flatMap((category) =>
        stickerByCategory[category].map((sticker) => <StickerSlot sticker={sticker} />),
      );
    }

    return stickerByCategory[selectedCategory].map((sticker) => <StickerSlot sticker={sticker} />);
  };

  return (
    <div>
      <div>
        {categories.map((category) => (
          <StickerCategoryButton
            category={category}
            onClick={() => {
              handleSelectCategory(category);
            }}
            isSelected={selectedCategory === category}
          />
        ))}
      </div>
      <div className='grid grid-cols-4'>{renderSticker()}</div>
    </div>
  );
};

export default StickerInput;
