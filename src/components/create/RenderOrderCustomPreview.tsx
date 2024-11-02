import { useDragLayer } from 'react-dnd';
import Image from 'next/image';

const RenderOrderCustomPreview = () => {
  const { item, isDragging, currentOffset } = useDragLayer((monitor) => ({
    item: monitor.getItem(),
    isDragging: monitor.isDragging(),
    currentOffset: monitor.getSourceClientOffset(),
  }));

  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (!isDragging || !currentOffset || !isTouchDevice) return null;

  return (
    <div
      className='fixed pointer-events-none transform -translate-x-1/2 -translate-y-1/2 flex justify-start items-center gap-[8px] w-[311px] h-[24px] text-[16px] text-gray-800 font-main font-medium'
      style={{
        left: 188,
        top: currentOffset.y,
      }}
    >
      <Image
        src='/assets/images/icons/equals.svg'
        alt=''
        width={24}
        height={24}
      />
      <span>{item.labelForInput}</span>
    </div>
  );
};

export default RenderOrderCustomPreview;
