'use client';

import { ColorType } from '@/types/invitationFormType.type';
import { useState } from 'react';

import { useFormContext } from 'react-hook-form';

import ColorPalette from './ColorPalette';

const BackgroundColorInput = () => {
  const { setValue } = useFormContext();
  const [myColor, setMyColor] = useState<ColorType>({
    r: 255,
    g: 255,
    b: 255,
    a: 1,
    name: '커스텀',
  });

  const handleColorChange = (color: ColorType) => {
    setMyColor(color);
    setValue('bgColor', color);
  };

  return (
    <div className='mt-[17px] desktop:mt-[44px] desktop:flex desktop:justify-center'>
      <ColorPalette
        selectedColor={myColor}
        onChangeColor={handleColorChange}
      />
    </div>
  );
};

export default BackgroundColorInput;
