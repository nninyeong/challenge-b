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
            className={`p-2 cursor-pointer flex flex-col justify-center items-center `}
          >
            <DecorateImageTypeComponent
              type={item.type}
              isSelected={selectedType.type === item.type}
            />
            <p className={`${selectedType.type === item.type && 'text-primary-300'} font-semibold text-gray-600 mt-2`}>
              {item.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainViewInput;
