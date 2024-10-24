import { FieldPath, UseFormRegister } from 'react-hook-form';
import { SignInFormValues, SignUpFormValues } from '@/types/auth.types';

const InputForValidate = ({ type = 'text', placeholder, validateFor, register, errorMessage }: InputFieldProps) => {
  return (
    <div className='grid grid-rows-[50px_8px] w-full'>
      <input
        type={type}
        placeholder={placeholder}
        {...register(validateFor)}
        className='border rounded w-full h-[48px] px-5'
      />
      {errorMessage && <p className='text-red-500 text-sm'>{errorMessage}</p>}
    </div>
  );
};

type InputFieldProps = {
  type: string;
  placeholder: string;
  validateFor: FieldPath<SignInFormValues | SignUpFormValues>;
  register: UseFormRegister<SignInFormValues | SignUpFormValues>;
  errorMessage?: string;
};

export default InputForValidate;
