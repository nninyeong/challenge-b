import { useFormContext, useWatch } from 'react-hook-form';

import { memo, useCallback } from 'react';
import DraggableRenderOrder from '@/components/create/DraggableRenderOrder';
import RenderOrderCustomPreview from '@/components/create/RenderOrderCustomPreview';

const RenderingOrderInput = () => {
  const { setValue } = useFormContext();
  const renderOrder = useWatch({ name: 'renderOrder' });

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
    <div className='mt-[10px] h-[204px]'>
      <RenderOrderCustomPreview />
      <div>
        {sortedRenderOrder.map((option) => {
          if (option.typeOnSharedCard === 'MAIN_PHOTO') return;
          if (option.typeOnSharedCard === 'ONLY_FOR_CREATE') return;

          return (
            <DraggableRenderOrder
              key={option.labelForInput}
              option={option}
              moveOption={moveOption}
              findOption={findOption}
            />
          );
        })}
      </div>
    </div>
  );
};

export default memo(RenderingOrderInput);
