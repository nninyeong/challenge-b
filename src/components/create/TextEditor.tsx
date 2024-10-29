import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import React from 'react';

interface TextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const TextEditor = ({ value, onChange, placeholder }: TextEditorProps) => {
  const modules = {
    toolbar: [['bold', 'italic', 'underline', { color: [] }, { background: [] }]],
  };

  return (
    <div>
      <ReactQuill
        placeholder={placeholder}
        value={value || ''}
        onChange={(value) => onChange(value)}
        theme='snow'
        modules={modules}
        className='custom-quill-editor'
      />
    </div>
  );
};

export default TextEditor;
