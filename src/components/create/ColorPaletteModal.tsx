'use client';

import { Alpha, Hue, Saturation, useColor } from 'react-color-palette';
import { useFormContext } from 'react-hook-form';
import { ColorType } from '@/types/invitationFormType.type';
import FlexColCenterContainer from '../FlexColCenterContainer';

const ColorPaletteModal = ({
  setOpenModal,
  setMyColor,
}: {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setMyColor: React.Dispatch<React.SetStateAction<ColorType>>;
}) => {
  const [color, setColor] = useColor('#ffffff');
  const { setValue } = useFormContext();

  const handleApplyButton = () => {
    setValue('bgColor', { ...color.rgb, name: '커스텀' });
    setMyColor({ ...color.rgb, name: '커스텀' });
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
        <FlexColCenterContainer className='px-2 h-full gap-2'>
          <div className='flex justify-center items-center w-full'>
            <div
              className={`w-[30px] h-[30px] border-2 border-solid rounded-full`}
              style={{ backgroundColor: color.hex }} //NOTE - Tailwind는 동적으로 background color 지정이 안됨
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
        </FlexColCenterContainer>
      </div>
    </div>
  );
};

export default ColorPaletteModal;
