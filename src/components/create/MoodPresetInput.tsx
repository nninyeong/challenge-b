import StickerCategoryButton from './stickerInput/StickerCategoryButton';
import { useFormContext } from 'react-hook-form';
import { useState } from 'react';
import { Mood, Preset, PresetDetail } from '@/types/invitationFormType.type';
import { PRESETS } from '@/constants/invitationPresets';
import { MOOD_PRESETS } from '@/constants/invitationMoodPresets';
import { MOOD_LIST } from '@/constants/invitationMoods';
import { Notify } from 'notiflix';

const MoodPresetInput = () => {
  const { setValue } = useFormContext();
  const [selectedCategory, setSelectedCategory] = useState<Mood>('classic');
  const [selectedPreset, setSelectedPreset] = useState<string>('');
  const moodList = [...MOOD_LIST, { category: 'none', label: '직접제작' }];

  const setFormValue = (presetDetail: PresetDetail | null) => {
    setValue('bgColor', presetDetail?.bgColor || { r: 255, g: 255, b: 255, a: 1, name: '흰색' });
    setValue('mainView', presetDetail?.mainView || '');
    setValue('stickers', presetDetail?.stickers || []);
  };

  const handleSelectCategory = (category: Mood) => {
    setSelectedCategory(category);
    setSelectedPreset('preset1');
    const selectedPresetDetails = MOOD_PRESETS[category]?.preset1;

    if (selectedPresetDetails && category !== 'none') {
      setFormValue(selectedPresetDetails);
    } else {
      setSelectedPreset('');
      setFormValue(null);
    }
  };

  const handleSelectPreset = (preset: Preset) => {
    setSelectedPreset(preset.name);

    const selectedPresetDetails = MOOD_PRESETS[selectedCategory]?.[preset.name];

    if (selectedPresetDetails) {
      setFormValue(selectedPresetDetails);
    } else {
      Notify.success('해당 프리셋은 준비 중입니다.');
      setFormValue(null);
    }
  };

  return (
    <div>
      <div className='flex mb-[14px] gap-[8px] flex-wrap'>
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
        {PRESETS[selectedCategory].map((preset) => (
          <div
            key={preset.name}
            className='flex flex-col justify-center items-center cursor-pointer'
          >
            <label className='flex text-[12px] mb-[6px]'>
              <input
                type='radio'
                className='custom-radio mr-[4px]'
                checked={selectedPreset === preset.name}
                onChange={() => handleSelectPreset(preset)}
                disabled={selectedCategory === 'none'}
              />
              {preset.label}
            </label>
            <div
              onClick={() => {
                if (selectedCategory !== 'none') handleSelectPreset(preset);
              }}
              className={`w-[80px] h-[152px] rounded-lg ${
                selectedPreset === preset.name ? 'border border-primary-300' : 'border border-gray-300'
              }`}
            >
              {preset.image ? (
                <img
                  src={preset.image}
                  alt={preset.label}
                  className='w-full h-full object-cover rounded-lg'
                />
              ) : (
                <div className='w-full h-full bg-gray-200 rounded-lg' />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoodPresetInput;
