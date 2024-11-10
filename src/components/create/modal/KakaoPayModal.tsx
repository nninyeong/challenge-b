type ModalProps = {
  isModalOpen: boolean;
  value: string;
  onClose: () => void;
  onSave: () => void;
  onChange: (value: string) => void;
}

const KakaoPayModal: React.FC<ModalProps> = ({ isModalOpen, value, onClose, onSave, onChange }) => {
  if (!isModalOpen) return null;

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
      <div className='bg-white p-4 rounded-md'>
        <h2 className='text-lg font-bold mb-4'>카카오페이 정보 입력</h2>
        <input
          type='text'
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder='카카오페이 정보 입력'
          className='w-full px-4 py-2 mb-4 border rounded'
        />
        <div className='flex justify-end gap-2'>
          <button onClick={onClose} className='px-4 py-2 bg-gray-300 rounded'>
            취소
          </button>
          <button onClick={onSave} className='px-4 py-2 bg-blue-500 text-white rounded'>
            저장
          </button>
        </div>
      </div>
    </div>
  );
};

export default KakaoPayModal;
