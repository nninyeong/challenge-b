'use client';
import { ColorType } from '@/types/invitationFormType.type';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useFormContext } from 'react-hook-form';
import ColorPaletteModal from './ColorPaletteModal';

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
const BackgroundColorInput = () => {
  const { setValue } = useFormContext();
  const [myColor, setMyColor] = useState<ColorType>({ r: 255, g: 255, b: 255, a: 1, name: '커스텀' });
  const [portalElement, setPortalElement] = useState<Element | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false);
  useEffect(() => {
    setPortalElement(document.getElementById('modal'));
  }, []);
  return (
    <div className='mt-[21px]'>
      <div className='grid grid-cols-5 place-content-center place-items-center text-sm gap-y-[27px]'>
        <div className='flex-col-center'>
          <button
            type='button'
            className='w-[35px] h-[35px] border-2 border-solid rounded-full flex justify-center items-center bg-white'
            onClick={() => setValue('bgColor', { r: 255, g: 255, b: 255, a: 1 })}
          >
            <img
              src='/assets/images/icons/replay.svg'
              alt='replay'
              className='w-[27px] h-[27px] rounded-full bg-gray-200'
            />
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
                className={`w-[35px] h-[35px] border-[1px] border-solid border-gray-200 rounded-full flex-col-center`}
              >
                <p
                  className='w-[27px] h-[27px] rounded-full'
                  style={{
                    backgroundColor: `rgba(${colorElement.r},${colorElement.g},${colorElement.b},${colorElement.a})`,
                  }}
                ></p>
              </button>
              <p>{colorElement.name}</p>
            </div>
          );
        })}
        <div className='flex-col-center'>
          <button
            type='button'
            className='w-[35px] h-[35px] border-[1px] border-solid border-gray-200 rounded-full flex justify-center items-center bg-white'
            style={{ backgroundColor: `rgba(${myColor.r}, ${myColor.g}, ${myColor.b}, ${myColor.a})` }}
            onClick={() => setOpenModal(!openModal)}
          >
            <img
              src='/assets/images/icons/ellipse-346.svg'
              alt='직접선택'
            />
          </button>
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

export default BackgroundColorInput;
