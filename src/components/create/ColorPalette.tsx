// ColorPalette.tsx
'use client';
import React, { useState, useEffect } from 'react';
import { ColorType } from '@/types/invitationFormType.type';
import ColorPaletteModal from './ColorPaletteModal';
import { createPortal } from 'react-dom';

export const COLOR_DEFAULT_PALETTE: ColorType[] = [
  { r: 0, g: 0, b: 0, a: 1, name: '블랙' },
  { r: 90, g: 90, b: 90, a: 1, name: '그레이' },
  { r: 202, g: 126, b: 121, a: 1, name: '핑크' },
  { r: 158, g: 132, b: 117, a: 1, name: '브라운' },
  { r: 134, g: 169, b: 197, a: 1, name: '블루' },
  { r: 235, g: 193, b: 171, a: 1, name: '코랄' },
  { r: 147, g: 115, b: 156, a: 1, name: '퍼플' },
  { r: 226, g: 205, b: 175, a: 1, name: '베이지' },
] as const;

type ColorPaletteProps = {
  selectedColor: ColorType;
  onChangeColor: (color: ColorType) => void;
};

const ColorPalette: React.FC<ColorPaletteProps> = ({ selectedColor, onChangeColor }) => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [portalElement, setPortalElement] = useState<Element | null>(null);

  useEffect(() => {
    setPortalElement(document.getElementById('modal'));
  }, []);

  return (
    <div className='grid grid-cols-5 place-content-center place-items-center text-sm gap-y-[27px]'>
      <div className='flex-col-center'>
        <button
          type='button'
          className='w-[35px] h-[35px] border-2 border-solid rounded-full flex justify-center items-center bg-white'
          onClick={() => onChangeColor({ r: 255, g: 255, b: 255, a: 1, name: 'default' })}
        >
          <img
            src='/assets/images/icons/replay.svg'
            alt='replay'
            className='w-[27px] h-[27px] rounded-full bg-gray-200'
          />
        </button>
        <p>원본</p>
      </div>

      {COLOR_DEFAULT_PALETTE.map((colorElement) => (
        <div
          className='flex flex-col justify-center items-center '
          key={`colorElement${colorElement.r}${colorElement.g}${colorElement.b}${colorElement.a}`}
        >
          <button
            type='button'
            onClick={() => onChangeColor(colorElement)}
            className='w-[35px] h-[35px] border-[1px] border-solid border-gray-200 rounded-full flex justify-center items-center'
          >
            <p
              className='w-[27px] h-[27px] rounded-full'
              style={{
                backgroundColor: `rgba(${colorElement.r},${colorElement.g},${colorElement.b},${colorElement.a})`,
              }}
            />
          </button>
          <p>{colorElement.name}</p>
        </div>
      ))}

      <div className='flex flex-col-center justify-center items-center '>
        <button
          type='button'
          className='w-[35px] h-[35px] border-[1px] border-solid border-gray-200 rounded-full flex justify-center items-center bg-white'
          style={{
            backgroundColor: `rgba(${selectedColor.r}, ${selectedColor.g}, ${selectedColor.b}, ${selectedColor.a})`,
          }}
          onClick={() => setOpenModal(true)}
        >
          <img
            src='/assets/images/icons/ellipse-346.svg'
            alt='직접선택'
          />
        </button>
        <p>직접 선택</p>

        {openModal &&
          portalElement &&
          createPortal(
            <ColorPaletteModal
              setOpenModal={setOpenModal}
              onChangeColor={onChangeColor}
            />,
            portalElement,
          )}
      </div>
    </div>
  );
};

export default ColorPalette;
