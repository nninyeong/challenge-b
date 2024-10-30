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
      className={`border rounded ${isSelected ? 'bg-primary-300 text-white' : 'bg-gray-500'}`}
    >
      {label}
    </button>
  );
};

export default StickerCategoryButton;
