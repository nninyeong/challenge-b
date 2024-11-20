type PropsType = {
  category: { category: string; label: string };
  onClick: () => void;
  isSelected: boolean;
};

const StickerCategoryButton = ({ category, onClick, isSelected }: PropsType) => {
  const label = category.label || 'mood 설정 필요';

  return (
    <button
      type='button'
      onClick={onClick}
      className={`rounded-full px-[8px] py-[4px] text-[14px] font-medium ${isSelected ? 'bg-primary-300 text-white' : 'bg-gray-100 text-gray-400'}`}
    >
      {label}
    </button>
  );
};

export default StickerCategoryButton;
