'use client';

const STYLE_LIST = {
  fill: ' w-full',
  arch: ' w-[40px] rounded-t-full',
  ellipse: ' w-[40px] rounded-t-full rounded-b-full',
  default: ' w-[40px]',
} as const;

const DEFAULT_STYLE = 'bg-gray-200 h-[55px]' as const;

const DecorateImageTypeComponent = ({ type, isSelected }: { type: string; isSelected: boolean }) => {
  const styleConverter = () => {
    switch (type) {
      case 'fill':
        return DEFAULT_STYLE + STYLE_LIST.fill;
      case 'arch':
        return DEFAULT_STYLE + STYLE_LIST.arch;
      case 'ellipse':
        return DEFAULT_STYLE + STYLE_LIST.ellipse;
      default:
        return DEFAULT_STYLE + STYLE_LIST.default;
    }
  };

  return (
    <div
      className={`w-[55px] h-[100px] rounded-lg border-[1px] flex flex-col justify-end items-center   ${
        isSelected ? 'border-primary-300 shadow-primary-200 shadow-sm' : 'border-gray-200'
      }`}
    >
      <div className={styleConverter()} />
      <div className='w-[30px] h-[4px] rounded-full bg-gray-200 mt-[6px]' />
      <div className='w-[30px] h-[2px] rounded-full bg-gray-200 mt-[2px]' />
      <div className='w-[30px] h-[2px] rounded-full bg-gray-200 mt-[1px] mb-[9px]' />
    </div>
  );
};

export default DecorateImageTypeComponent;
