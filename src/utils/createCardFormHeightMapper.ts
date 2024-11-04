const HEIGHT_COMPACT = '54px';
const HEIGHT_MAIN_OR_BACKGROUND = '240px';
const HEIGHT_DEFAULT = '320px';

const createCardFormHeightMapper = (toggleInput: boolean, currentInputName: string) => {
  if (!toggleInput) return HEIGHT_COMPACT;

  const isMainOrBackground = ['청첩장 메인 화면', '청첩장 배경 컬러'].includes(currentInputName);
  return isMainOrBackground ? HEIGHT_MAIN_OR_BACKGROUND : HEIGHT_DEFAULT;
};

export default createCardFormHeightMapper;
