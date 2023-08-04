import React from 'react';

interface IButtonProps {
  type?: 'isSmall' | 'isBig' | undefined;
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

export default function ButtonComponent({ type, onClick, children }: IButtonProps) {
  let className: string =
    'rounded w-56 h-8 border-2 border-white bg-[#FF8D8D]  hover:border-[#FF8D8D]';

  if (type === 'isSmall') {
    className = 'rounded w-56 h-8 border-2 bg-[#FF8D8D]  hover:border-[#FF8D8D]';
  } else if (type === 'isBig') {
  } else {
  }

  return (
    <div className='flex justify-center'>
      <button type='button' className={className} onClick={onClick}>
        {children}
      </button>
    </div>
  );
}
