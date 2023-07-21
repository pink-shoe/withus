interface InputProps {
  type: 'text' | 'password' | 'email';
  label?: string;
  placeholder?: string;
  value?: string;
  version?: number;
}

function Input({ type, label, placeholder, value, version }: InputProps) {
  let windcss: string;
  if (label === undefined) label = '임시';
  // if (placeholder === undefined) placeholder = '입력해주세요';

  if (version == 1) {
    windcss = 'test중';
  } else {
    windcss =
      'block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6';
  }

  return (
    <div className='sm:col-span-2 m-4'>
      <label className='block text-xl font-semibold leading-6 text-gray-900'>{label}</label>
      <div className='mt-2.5 '>
        <input className={windcss} type={type} id={label} name={label} placeholder={placeholder} />
      </div>
    </div>
  );
}

export default Input;
