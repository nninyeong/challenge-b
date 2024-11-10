import { useFontStore } from '@/store/useFontStore';
import { useFormContext } from 'react-hook-form';
import BackgroundColorInput from './BackgroundColorInput';

const FONTMENU = [
  { name: '나눔손글씨', font: 'NanumPen' },
  { name: '카페24 아네모네', font: 'Cafe24' },
  { name: '제주고딕', font: 'JejuGothic' },
  { name: '배달의민족 도현체', font: 'Bmdohyeon' },
  { name: '에스코어 드림', font: 'SCDream1' },
  { name: '눈누 난나체', font: 'Main' },
];

const FontSizeList = [-2, -1, 0, +1, +2];
const FontInput = () => {
  const { setValue, getValues } = useFormContext();
  const currentFontSize = getValues('fontInfo.size') || 0;
  const handleSelectFontname = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedFontName = event.target.value;
    setValue('fontInfo.fontName', selectedFontName);
  };

  const { increaseFontSize, decreaseFontSize, resetFontSize } = useFontStore();

  const handleFontSizeChange = (size: number) => {
    if (size > 0) {
      increaseFontSize(size);
    } else if (size < 0) {
      decreaseFontSize(Math.abs(size));
    } else {
      resetFontSize();
    }
    setValue('fontInfo.size', size);
  };

  return (
    <div>
      <div className='flex w-full gap-6 items-center'>
        <label className='text-[14px]'>글꼴 선택</label>
        <form>
          <select
            name='글꼴을 선택해주세요'
            onChange={handleSelectFontname}
            className='bg-gray-50 w-[228px]  rounded-lg p-2'
          >
            {FONTMENU.map((font) => (
              <option
                key={font.name}
                value={font.font}
              >
                {font.font}
              </option>
            ))}
          </select>
        </form>
      </div>
      <div className='flex w-full gap-6 items-center mt-2'>
        <label className='text-[14px]'>글꼴 크기</label>
        <div className='flex justify-between w-[228px]'>
          {FontSizeList.map((size) => (
            <button
              className={`w-[40px] h-[32px] rounded-xl text-[12px] ${
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
      <BackgroundColorInput />
    </div>
  );
};

export default FontInput;
