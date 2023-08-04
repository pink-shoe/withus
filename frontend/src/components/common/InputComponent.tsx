interface IInputProps {
  type: 'text' | 'password' | 'email';
  label?: string | undefined;
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  version?: number;
}

export default function InputComponent({
  type,
  label,
  placeholder,
  value,
  version,
  onChange,
}: IInputProps) {
  let windcss: string;
  const inputId = label ? label : 'input';
  if (placeholder === undefined) placeholder = '입력해주세요';
  if (version == 1) {
    windcss = 'test중';
  } else {
    windcss =
      'block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6';
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
