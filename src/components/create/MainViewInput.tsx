'use client';

import 'react-color-palette/css';
import { useFormContext } from 'react-hook-form';
import { DecorateImageType } from '@/types/invitationFormType.type';
import DecorateImageTypeComponent from './DecorateImageTypeComponent';
import { useState } from 'react';

export const DECORATE_IMAGE_TYPE: DecorateImageType[] = [
  { name: '기본', type: 'default' },
  { name: '채우기', type: 'fill' },
  { name: '아치', type: 'arch' },
  { name: '타원', type: 'ellipse' },
] as const;

const MainViewInput = () => {
  const { setValue } = useFormContext();
  const [selectedType, setSelectedType] = useState<DecorateImageType>({ name: '기본', type: 'default' });

  const handleDecorateImage = (item: DecorateImageType) => {
    setSelectedType(item);
    setValue('mainView', item);
  };

  return (
    <div>
      <div className='w-full h-[150px] flex justify-between items-center'>
        {DECORATE_IMAGE_TYPE.map((item) => (
          <div
            key={item.type}
            onClick={() => handleDecorateImage(item)}
            className={`p-2 cursor-pointer flex flex-col justify-center items-center ${
              selectedType.type === item.type ? 'text-primary-300' : 'text-gray-600'
            }`}
          >
            <label className='flex justify-center gap-[4px] items-center'>
              <input
                type='radio'
                name='decorateImage'
                value={item.type}
                checked={selectedType.type === item.type}
                onChange={() => handleDecorateImage(item)}
                className='sr-only'
              />
              <span
                className={`w-3.5 h-3.5 rounded-full border-[1px] flex items-center justify-center ${
                  selectedType.type === item.type ? 'border-primary-300' : 'border-gray-400'
                }`}
              >
                {selectedType.type === item.type && <span className='w-2 h-2 bg-primary-300 rounded-full' />}
              </span>
              <p className='font-md'>{item.name}</p>
            </label>

            <DecorateImageTypeComponent
              type={item.type}
              isSelected={selectedType.type === item.type}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainViewInput;
