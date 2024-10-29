'use client';

const DecorateImageTypeComponent = ({ type }: { name: string; type: string }) => {
  const styleConverter = () => {
    const styleStr = 'bg-gray-200 h-[55px]';
    switch (type) {
      case 'fill':
        return styleStr + ' w-full';
      case 'arch':
        return styleStr + ' w-[40px] rounded-t-full';
      case 'ellipse':
        return styleStr + ' w-[40px] rounded-t-full rounded-b-full';
      default:
        return styleStr + ' w-[40px]';
    }
  };

  return (
    <div className='w-[55px] h-[100px] rounded-lg border-2 border-gray-200 flex flex-col justify-end items-center'>
      <div className={styleConverter()} />
      <div className='w-[30px] h-[4px] rounded-full bg-gray-200 mt-[6px]' />
      <div className='w-[30px] h-[2px] rounded-full bg-gray-200 mt-[2px]' />
      <div className='w-[30px] h-[2px] rounded-full bg-gray-200 mt-[1px] mb-[9px]' />
    </div>
  );
};

export default DecorateImageTypeComponent;
