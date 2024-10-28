import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface TextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

const TextEditor = ({ value, onChange, placeholder }: TextEditorProps) => {
  const modules = {
    toolbar: [['bold', 'italic', 'underline'], [{ color: [] }], [{ background: [] }], [{ align: [] }]],
  };

  const handleChange = (content: string) => {
    if (content.trim() === '') {
      onChange('');
    } else {
      onChange(content);
    }
  };

  return (
    <div className='rounded'>
      <ReactQuill
        placeholder={placeholder}
        value={value || ''}
        onChange={handleChange}
        theme='snow'
        modules={modules}
        className='ql-editor w-full h-full rounded bg-white'
      />
    </div>
  );
};

export default TextEditor;
