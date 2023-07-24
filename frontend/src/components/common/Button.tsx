import React from 'react';

interface ButtonProps {
  version?: number;
  onClick?: () => void;
  children: React.ReactNode;
}

export default function Button({ version, onClick, children }: ButtonProps) {
  let windcss: string = 'rounded w-full  border-2  bg-violet-600  hover:border-indigo-500/100';

  if (version == 1) {
    windcss = 'rounded w-full border-solid border-2 border-indigo-600';
  } else {
  }

  return (
    <div className='flex justify-center'>
      <button type='button' className={windcss} onClick={onClick}>
        {children}
      </button>
    </div>
  );
}
