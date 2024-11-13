export const FOLDED_HEIGHT = '54px';
const MAIN_OR_BACKGROUND_HEIGHT = '240px';
const DEFAULT_HEIGHT = '320px';

const createCardFormHeightMapper = (toggleInput: boolean, currentInputName: string) => {
  if (!toggleInput) return FOLDED_HEIGHT;

  const isMainOrBackground = [
    '청첩장 대표 사진',
    '청첩장 메인 화면',
    '청첩장 배경 컬러',
    '청첩장 갤러리',
    '방명록',
  ].includes(currentInputName);
  return isMainOrBackground ? MAIN_OR_BACKGROUND_HEIGHT : DEFAULT_HEIGHT;
};

export default createCardFormHeightMapper;
