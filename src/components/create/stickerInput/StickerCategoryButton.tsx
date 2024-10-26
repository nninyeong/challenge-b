type PropsType = {
  category: string;
  onClick: () => void;
  isSelected: boolean;
};

const INVITATION_MOODS: Record<string, { label: string }> = {
  classic: { label: '클래식' },
  modern: { label: '모던' },
};

const StickerCategoryButton = ({ category, onClick, isSelected }: PropsType) => {
  const label = INVITATION_MOODS[category].label || 'mood 설정 필요';

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
