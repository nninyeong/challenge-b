import { DndProvider } from 'react-dnd-multi-backend';
import { useFormContext, useWatch } from 'react-hook-form';
import { HTML5toTouch } from '@/lib/reactDnd/dndBackends';
import { memo, useCallback } from 'react';
import { OrderItem } from '@/types/invitationFormType.type';
import { useDrag, useDrop } from 'react-dnd';

const RenderOrderInput = () => {
  const { setValue } = useFormContext();

  const renderOrder = useWatch({ name: 'renderOrder' });
  console.log('renderOrder', renderOrder);
  const sortedRenderOrder = [...renderOrder].sort((a, b) => a.order - b.order);
  const findOption = useCallback(
    (order: number) => {
      const option = sortedRenderOrder.filter((item) => item.order === order)[0];
      return {
        option,
        index: sortedRenderOrder.indexOf(option),
      };
    },
    [sortedRenderOrder],
  );

  const moveOption = useCallback(
    (order: number, atOrder: number, state: 'hover' | 'drop') => {
      const { option, index } = findOption(order);
      const reorderedOptions = [...sortedRenderOrder];
      reorderedOptions.splice(index, 1);
      reorderedOptions.splice(atOrder, 0, option);

      const updatedOptions = reorderedOptions.map((item, i) => ({
        ...item,
        order: i,
      }));

      if (state === 'drop') setValue('renderOrder', updatedOptions);
    },
    [findOption, renderOrder, setValue],
  );

  return (
    <div>
      <DndProvider options={HTML5toTouch}>
        <div>
          {sortedRenderOrder.map((option) => (
            <DraggableOptions
              key={option.labelForInput}
              option={option}
              moveOption={moveOption}
              findOption={findOption}
            />
          ))}
        </div>
      </DndProvider>
    </div>
  );
};

export default memo(RenderOrderInput);

const DraggableOptions = ({
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
  const [{ isDragging }, dragRef, preview] = useDrag(
    () => ({
      type: 'INVITATION_RENDER_OPTION',
      item: { order, originalOrder },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
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
    preview(node);
  };

  return (
    <div
      ref={combinedRef}
      className={`${isDragging && 'opacity-50'}`}
    >
      {labelForInput}
    </div>
  );
};
