'use client';

import 'react-color-palette/css';
import { useFormContext } from 'react-hook-form';
import { ImSpinner11 } from 'react-icons/im';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import ColorPaletteModal from './ColorPaletteModal';
import { ColorType, DecorateImageType } from '@/types/invitationFormType.type';
import DecorateImageTypeComponent from './DecorateImageTypeComponent';
export const COLOR_DEFAULT_PALETTE: ColorType[] = [
  { r: 0, g: 0, b: 0, a: 1, name: '블랙' }, // #000000
  { r: 90, g: 90, b: 90, a: 1, name: '그레이' }, // #5A5A5A
  { r: 202, g: 126, b: 121, a: 1, name: '핑크' }, // #Ca7E79
  { r: 158, g: 132, b: 117, a: 1, name: '브라운' }, // #9E8475
  { r: 134, g: 169, b: 197, a: 1, name: '블루' }, // #86A9C5
  { r: 235, g: 193, b: 171, a: 1, name: '코랄' }, // #EBC1AB
  { r: 147, g: 115, b: 156, a: 1, name: '퍼플' }, // #93739C
  { r: 226, g: 205, b: 175, a: 1, name: '베이지' }, // #E2CDAF
] as const;

export const DECORATE_IMAGE_TYPE: DecorateImageType[] = [
  { name: '기본', type: 'default' },
  { name: '채우기', type: 'fill' },
  { name: '아치', type: 'arch' },
  { name: '타원', type: 'ellipse' },
] as const;

const MainViewInput = () => {
  const { setValue } = useFormContext();
  const [myColor, setMyColor] = useState<ColorType>({ r: 255, g: 255, b: 255, a: 1, name: '커스텀' });
  const [portalElement, setPortalElement] = useState<Element | null>(null);
  const [selectedType, setSelectedType] = useState<DecorateImageType>({ name: '기본', type: 'default' });
  const [openModal, setOpenModal] = useState<boolean>(false);
  useEffect(() => {
    setPortalElement(document.getElementById('modal'));
  }, []);

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
      <p className='font-bold text-xl'>청첩장 배경 컬러</p>
      <div className='grid grid-cols-5 place-content-center place-items-center text-sm'>
        <div className='flex-col-center'>
          <button
            type='button'
            className='w-[30px] h-[30px] border-2 border-solid rounded-full flex justify-center items-center bg-white'
            onClick={() => setValue('bgColor', { r: 255, g: 255, b: 255, a: 1 })}
          >
            <ImSpinner11 className='rotate-90' />
          </button>
          <p>원본</p>
        </div>

        {COLOR_DEFAULT_PALETTE.map((colorElement) => {
          return (
            <div
              className='flex-col-center'
              key={`colorElement${colorElement.r}${colorElement.g}${colorElement.b}${colorElement.a}`}
            >
              <button
                type='button'
                onClick={() => setValue('bgColor', colorElement)}
                className={`w-[30px] h-[30px] border-2 border-solid border-white rounded-full`}
                style={{
                  backgroundColor: `rgba(${colorElement.r},${colorElement.g},${colorElement.b},${colorElement.a})`,
                }} //NOTE - Tailwind는 동적으로 background color 지정이 안됨
              />
              <p>{colorElement.name}</p>
            </div>
          );
        })}
        <div className='flex-col-center'>
          <button
            type='button'
            className='w-[30px] h-[30px] border-2 border-solid rounded-full flex justify-center items-center bg-white'
            style={{ backgroundColor: `rgba(${myColor.r}, ${myColor.g}, ${myColor.b}, ${myColor.a})` }}
            onClick={() => setOpenModal(!openModal)}
          />
          <p>직접 선택</p>
        </div>
        {openModal && portalElement
          ? createPortal(
              <ColorPaletteModal
                setOpenModal={setOpenModal}
                setMyColor={setMyColor}
              />,
              portalElement,
            )
          : null}
      </div>
    </div>
  );
};

export default MainViewInput;
