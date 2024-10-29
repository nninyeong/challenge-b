import { ColorType } from '@/types/invitationFormType.type';

const colorConverter = (color: ColorType) => {
  return `rgba(${color.r},${color.g},${color.b},${color.a})`;
};

export default colorConverter;
