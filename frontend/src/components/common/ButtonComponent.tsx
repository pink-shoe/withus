import React from 'react';

interface IButtonProps {
  version?: number;
  onClick?: () => any;
  children: React.ReactNode;
}

// version을 타입으로 없애고 코드 수정 필요 일단 넘겨!
// className={
//                     'border-2 rounded-lg p-2 w-11/12 text-justify whitespace-break-spaces ' +
//                     `${
//                       msg.connectionId === publisher.stream.connection.connectionId
//                         ? ' bg-white'
//                         : ' bg-[#ede4fd]'
//                     }`
//                   }

export default function ButtonComponent({ version, onClick, children }: IButtonProps) {
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
