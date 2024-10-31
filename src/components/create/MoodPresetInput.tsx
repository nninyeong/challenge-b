import { MOOD_LIST } from '@/constants/invitationMoods';
import StickerCategoryButton from './stickerInput/StickerCategoryButton';
import { useFormContext } from 'react-hook-form';
import { useState } from 'react';

const MoodPresetInput = () => {
  const { setValue } = useFormContext();
  const [selectedCategory, setSelectedCategory] = useState<string>('none');
  const [selectedPreset, setSelectedPreset] = useState<string>('');
  const moodList = [...MOOD_LIST, { category: 'none', label: '직접제작' }];
  const presets = ['프리셋1', '프리셋2', '프리셋3'];

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);
    if (category === 'none') {
      setSelectedPreset('');
      setValue('moodPreset', { mood: category, preset: '' });
    } else {
      setValue('moodPreset', { mood: category, preset: selectedPreset });
    }
  };

  const handleSelectPreset = (preset: string) => {
    setSelectedPreset(preset);
    setValue('moodPreset', { mood: selectedCategory, preset });
  };

  return (
    <div>
      <div className='flex mb-[40px] gap-[8px] flex-wrap'>
        {moodList.map((mood) => (
          <StickerCategoryButton
            key={`${mood.category}-button`}
            category={mood}
            onClick={() => handleSelectCategory(mood.category)}
            isSelected={selectedCategory === mood.category}
          />
        ))}
      </div>

      <div className='flex justify-center items-center gap-[35px]'>
        {presets.map((preset) => (
          <div
            key={preset}
            className='flex flex-col justify-center items-center cursor-pointer'
          >
            <label className='flex text-[12px] mb-[6px]'>
              <input
                type='radio'
                className='custom-radio mr-[4px]'
                checked={selectedPreset === preset}
                onChange={() => handleSelectPreset(preset)}
                disabled={selectedCategory === 'none'}
              />
              {preset}
            </label>
            <div
              onClick={() => {
                if (selectedCategory !== 'none') handleSelectPreset(preset);
              }}
              className={`w-[80px] h-[152px] bg-gray-200 rounded-lg ${selectedPreset === preset ? 'border border-primary-300' : 'border border-gray-300'}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoodPresetInput;
