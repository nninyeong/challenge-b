import StickerCategoryButton from './stickerInput/StickerCategoryButton';
import { useFormContext } from 'react-hook-form';
import { useState } from 'react';
import { Mood, Preset } from '@/types/invitationFormType.type';
import { PRESETS } from '@/constants/invitationPresets';
import { MOOD_PRESETS } from '@/constants/invitationMoodPresets';
import { MOOD_LIST } from '@/constants/invitationMoods';

const MoodPresetInput = () => {
  const { setValue } = useFormContext();
  const [selectedCategory, setSelectedCategory] = useState<Mood>('classic');
  const [selectedPreset, setSelectedPreset] = useState<string>('');
  const moodList = [...MOOD_LIST, { category: 'none', label: '직접제작' }];

  const handleSelectCategory = (category: Mood) => {
    setSelectedCategory(category);
    if (category === 'none') {
      setSelectedPreset('');
    }
  };

  const handleSelectPreset = (preset: Preset) => {
    setSelectedPreset(preset);
    if (MOOD_PRESETS[selectedCategory] !== null) {
      setValue('bgColor', MOOD_PRESETS[selectedCategory][preset].bgColor);
      setValue('mainView', MOOD_PRESETS[selectedCategory][preset].mainView);
      setValue('stickers', MOOD_PRESETS[selectedCategory][preset].stickers);
    }
  };

  return (
    <div>
      <div className='flex mb-[40px] gap-[8px] flex-wrap'>
        {moodList.map((mood) => (
          <StickerCategoryButton
            key={`${mood.category}-button`}
            category={mood}
            onClick={() => handleSelectCategory(mood.category as Mood)}
            isSelected={selectedCategory === mood.category}
          />
        ))}
      </div>

      <div className='flex justify-center items-center gap-[35px]'>
        {PRESETS.map((preset) => (
          <div
            key={preset.name}
            className='flex flex-col justify-center items-center cursor-pointer'
          >
            <label className='flex text-[12px] mb-[6px]'>
              <input
                type='radio'
                className='custom-radio mr-[4px]'
                checked={selectedPreset === preset.name}
                onChange={() => handleSelectPreset(preset.name as Preset)}
                disabled={selectedCategory === 'none'}
              />
              {preset.label}
            </label>
            <div
              onClick={() => {
                if (selectedCategory !== 'none') handleSelectPreset(preset.name as Preset);
              }}
              className={`w-[80px] h-[152px] bg-gray-200 rounded-lg ${
                selectedPreset === preset.name ? 'border border-primary-300' : 'border border-gray-300'
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoodPresetInput;
