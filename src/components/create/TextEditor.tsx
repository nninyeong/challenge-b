import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import React from 'react';
type TextStyle = {
  width: string;
  height: string;
};
type TextEditorProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  style: TextStyle;
};

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

const TextEditor = ({ value, onChange, placeholder, style }: TextEditorProps) => {
  const modules = {
    toolbar: [
      [
        'bold',
        'italic',
        'underline',
        {
          color: [
            'black',
            'white',
            'pink',
            'blue',
            'skyblue',
            'gray',
            'beige',
            'darkGray',
            'navy',
            'ivory',
            'brown',
            'red',
            'orange',
            'yellow',
            'green',
          ],
        },
        {
          background: [
            'black',
            'white',
            'pink',
            'blue',
            'skyblue',
            'gray',
            'beige',
            'darkGray',
            'navy',
            'ivory',
            'brown',
            'red',
            'orange',
            'yellow',
            'green',
          ],
        },
        { align: [] },
      ],
    ],
  };

  return (
    <ReactQuill
      placeholder={placeholder}
      value={value || ''}
      onChange={(value) => onChange(value)}
      theme='snow'
      modules={modules}
      style={style}
      className='custom-quill-editor'
    />
  );
};

export default TextEditor;
