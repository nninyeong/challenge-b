import { useFormContext } from 'react-hook-form';
import ColorPalette from './ColorPalette';

import { ColorType } from '@/types/invitationFormType.type';
import SelectBox from '@/components/ui/SelectBox';

const FONT_MENU = [
  { name: '고운 바탕체', font: 'GowunBatang-Regular' },
  { name: 'Hahmlet', font: 'Hahmlet-VariableFont_wght' },
  { name: '나눔손글씨', font: 'NanumPen' },
  { name: '하이멜로디', font: 'HiMelody-Regular' },
  { name: '카페24 아네모네', font: 'Cafe24' },
  { name: '제주고딕', font: 'JejuGothic' },
  { name: '배달의민족 도현체', font: 'Bmdohyeon' },
  { name: '에스코어 드림', font: 'SCDream1' },
];

const FontSizeList = [-2, -1, 0, +1, +2];
const FontInput = () => {
  const { setValue, getValues } = useFormContext();

  const currentFontName = getValues('fontInfo.fontName') || 'main';

  const currentFontSize = getValues('fontInfo.size') || 0;

  const handleSelectFontName = (fontName: string) => {
    setValue('fontInfo.fontName', fontName);
  };

  const handleFontSizeChange = (size: number) => {
    setValue('fontInfo.size', size);
  };

  const handleFontColorChange = (color: ColorType) => {
    setValue('fontInfo.color', color);
  };

  const fontColor = getValues('fontInfo.color');

  return (
    <div>
      <div className='flex w-full gap-6 items-center'>
        <label className='text-[14px] text-gray-700 font-medium'>글꼴 선택</label>
        <SelectBox
          onSelect={handleSelectFontName}
          optionList={FONT_MENU.map((font) => font.font)}
          value={currentFontName}
          width='w-[228px]'
          limitOptionHeight='128px'
        />
      </div>
      <div className='flex w-full gap-6 items-center mt-2'>
        <label className='text-[14px] text-gray-700 font-medium'>글꼴 크기</label>
        <div className='flex justify-between w-[228px]'>
          {FontSizeList.map((size) => (
            <button
              className={`w-[40px] h-[32px] rounded-[8px] text-[12px] ${
                currentFontSize === size ? 'bg-primary-300 text-white' : 'bg-gray-50 text-gray-400 hover:bg-primary-300'
              }`}
              key={size}
              type='button'
              onClick={() => handleFontSizeChange(size)}
            >
              {size}
            </button>
          ))}
        </div>
      </div>
      <div className='mt-[21px] desktop:flex desktop:justify-center desktop:mb-[4px]'>
        <ColorPalette
          onChangeColor={(color) => handleFontColorChange(color)}
          selectedColor={fontColor}
        />
      </div>
    </div>
  );
};

export default FontInput;
