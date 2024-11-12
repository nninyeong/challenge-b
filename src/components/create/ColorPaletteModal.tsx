'use client';

import { Alpha, Hue, Saturation, useColor } from 'react-color-palette';

import { ColorType } from '@/types/invitationFormType.type';
type ColorPaletteModalProps = {
  setOpenModal: (value: boolean) => void;
  onChangeColor: (color: ColorType) => void;
};

const ColorPaletteModal: React.FC<ColorPaletteModalProps> = ({ setOpenModal, onChangeColor }) => {
  const [color, setColor] = useColor('#ffffff');

  const handleApplyButton = () => {
    const updatedColor = { ...color.rgb, name: '커스텀' };
    onChangeColor(updatedColor);
    setOpenModal(false);
  };

  return (
    <div className='z-50 w-[200px] h-[200px] fixed bottom-24 right-5 bg-white rounded-xl flex flex-col items-center'>
      <div className='w-[200px] h-[100px]'>
        <Saturation
          color={color}
          onChange={setColor}
          height={100}
        />
        <div className='flex-col-center px-2 h-full gap-2'>
          <div className='flex justify-center items-center w-full'>
            <div
              className={`w-[30px] h-[30px] border-2 border-solid rounded-full`}
              style={{ backgroundColor: color.hex }}
            />
            <div className='flex-grow flex flex-col gap-2'>
              <Hue
                color={color}
                onChange={setColor}
              />
              <Alpha
                color={color}
                onChange={setColor}
              />
            </div>
          </div>
          <div className='flex justify-between w-full'>
            <p className='bg-gray-200 w-[90px] text-center rounded-full'>{color.hex}</p>
            <button
              onClick={handleApplyButton}
              className='bg-primary-300 text-white rounded-full w-[60px]'
            >
              적용
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorPaletteModal;
