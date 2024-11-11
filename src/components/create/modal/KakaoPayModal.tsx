type ModalProps = {
  isModalOpen: boolean;
  value: string;
  onClose: () => void;
  onSave: () => void;
  onChange: (value: string) => void;
};

const KakaoPayModal: React.FC<ModalProps> = ({ isModalOpen, value, onClose, onSave, onChange }) => {
  if (!isModalOpen) return null;

  return (
    <div
      className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'
      onClick={onClose}
    >
      <div className='bg-white p-4 rounded-md w-[343px]' onClick={(e) => e.stopPropagation()}>
        <h2 className='text-[16px] font-bold mb-4'>카카오페이 등록</h2>
        <input
          type='text'
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder='카카오페이 송금 링크 복사'
          className='w-full px-4 py-2 mb-4 border rounded'
        />
        <button
          onClick={onSave}
          className='w-full h-12 bg-primary300 text-[16px] font-bold text-white rounded'
        >
          저장
        </button>
      </div>
    </div>
  );
};

export default KakaoPayModal;
