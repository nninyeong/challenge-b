import { OrderItem } from '@/types/invitationFormType.type';
import { useDrag, useDrop } from 'react-dnd';
import Image from 'next/image';
import { memo } from 'react';

const DraggableRenderOrder = ({
  option,
  moveOption,
  findOption,
}: {
  option: OrderItem;
  moveOption: (order: number, atOrder: number, state: 'hover' | 'drop') => void;
  findOption: (order: number) => { option: OrderItem; index: number };
}) => {
  const originalOrder = findOption(option.order).index;
  const { order, labelForInput } = option;
  const [{ isDragging }, dragRef] = useDrag(
    () => ({
      type: 'INVITATION_RENDER_OPTION',
      item: { order, originalOrder, labelForInput },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      previewOptions: {
        captureDraggingState: true,
      },
    }),
    [originalOrder],
  );

  const [, dropRef] = useDrop(
    {
      accept: 'INVITATION_RENDER_OPTION',
      hover: ({ order: draggedOrder }: { order: number }) => {
        if (draggedOrder !== order) {
          const { index: overIndex } = findOption(order);
          moveOption(draggedOrder, overIndex, 'hover');
        }
      },
      drop: ({ order: draggedOrder }: { order: number }) => {
        const { index: overIndex } = findOption(order);
        moveOption(draggedOrder, overIndex, 'drop');
      },
    },
    [findOption, moveOption],
  );

  const combinedRef = (node: HTMLDivElement | null) => {
    dragRef(node);
    dropRef(node);
  };

  return (
    <div
      ref={combinedRef}
      className={`${isDragging && 'opacity-50'} flex justify-start items-center gap-[8px] h-[24px] text-[16px] text-gray-800 font-main font-medium`}
    >
      <Image
        src='/assets/images/icons/equals.svg'
        alt=''
        width={24}
        height={24}
      />
      <span>{labelForInput}</span>
    </div>
  );
};

export default memo(DraggableRenderOrder);
