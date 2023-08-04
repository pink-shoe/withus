interface IInputProps {
  type: 'text' | 'password' | 'email' | 'entercode';
  label?: string | undefined;
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  version?: number;
}

export default function InputComponent({ type, label, placeholder, value, onChange }: IInputProps) {
  let windcss: string;
  const inputId = label ? label : 'input';
  if (placeholder === undefined) placeholder = '입력해주세요';
  if (type === 'entercode') {
    windcss =
      'block w-80 h-8 mx-auto rounded-md px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-[#FF8D8D] placeholder:text-[#FF8D8D] focus:ring-1 focus:ring-inset focus:ring-[#FF8D8D] sm:text-sm sm:leading-6 font-edisplay';
  } else {
    windcss =
      'block w-80 h-8 mx-auto rounded-md px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-[#FF8D8D] placeholder:text-[#FF8D8D] focus:ring-1 focus:ring-inset focus:ring-[#FF8D8D] sm:text-sm sm:leading-6 font-kdisplay';
  }

  return (
    <div className='sm:col-span-2 m-4'>
      {label && <label className='font-kdisplay text-2xl hover:text-[#FF8D8D]'>{label}</label>}
      <div className='mt-1.5'>
        <input
          className={windcss}
          type={type}
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
