import { ScrollRefsType } from '@/app/(noLayout)/create/card/page';
import { MutableRefObject } from 'react';

type PreviewElementPropsType = {
  element: React.ReactElement;
  refs: MutableRefObject<ScrollRefsType>;
  order: number;
  inputOrder: number;
};
const PreviewElement = ({ element, refs, order, inputOrder }: PreviewElementPropsType) => {
  return (
    <div
      data-label={element.key}
      ref={(el) => {
        refs.current[element.key!] = { order: order, ref: el, inputOrder };
      }}
    >
      {element}
    </div>
  );
};

export default PreviewElement;
