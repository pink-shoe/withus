interface IInputProps {
  type: 'text' | 'password' | 'email' | 'entercode' | 'nickname';
  label?: string | undefined;
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputComponent({ type, label, placeholder, value, onChange }: IInputProps) {
  let inputCss =
    'block w-80 h-8 mx-auto rounded-md py-1 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-[#FF8D8D] placeholder:text-[#FF8D8D] focus:ring-1 focus:ring-inset focus:ring-[#FF8D8D] sm:text-sm sm:leading-6 font-kdisplay';
  let inputType = 'text';

  const inputId = label ? label : 'input';
  if (placeholder === undefined) placeholder = '입력해주세요';
  if (type === 'email') {
    inputType = 'email';
  } else if (type === 'nickname') {
    inputCss =
      'block w-full lg:w-[384px] h-8 mx-auto rounded-md py-1 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-[#FF8D8D] placeholder:text-[#FF8D8D] focus:ring-1 focus:ring-inset focus:ring-[#FF8D8D] sm:text-sm sm:leading-6 font-kdisplay';
  } else if (type === 'password') {
    inputType = 'password';
  }

  return (
    <div className='sm:col-span-2 m-4'>
      {label && <label className='font-kdisplay text-2xl hover:text-[#FF8D8D]'>{label}</label>}
      <div className='mt-1.5'>
        <input
          className={inputCss}
          type={inputType}
          id={inputId}
          value={value}
          name={inputId}
          placeholder={placeholder}
          onChange={onChange}
        />
      </div>
    </div>
  );
}
