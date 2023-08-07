import React from 'react';

interface IButtonProps {
  type?: 'isSmall' | 'isBig' | 'google';
  onClick?: () => any;
  children: React.ReactNode;
}

// version을 타입으로 없애고 코드 수정 필요 일단 넘겨!
// buttonCss={
//                     'border-2 rounded-lg p-2 w-11/12 text-justify whitespace-break-spaces ' +
//                     `${
//                       msg.connectionId === publisher.stream.connection.connectionId
//                         ? ' bg-white'
//                         : ' bg-[#ede4fd]'
//                     }`
//                   }

export default function ButtonComponent({ type, onClick, children }: IButtonProps) {
  let buttonCss: string;
  let textCss: string;

  if (type === 'isBig') {
    buttonCss = 'rounded-xl w-96 h-8 bg-[#FF8D8D]  hover:border-[#FF8D8D]';
    textCss = 'font-kdisplay text-2xl';
  } else if (type === 'google') {
    buttonCss =
      'bg-white hover:bg-[#4285F4] text-24 font-bold px-4 w-64 h-8 mx-auto rounded-[12px] hover:text-white flex items-center';
    textCss = '';
  } else {
    buttonCss = 'rounded-xl w-64 h-8 bg-[#FF8D8D]  hover:border-[#FF8D8D]';
    textCss = 'font-kdisplay text-xl';
  }
  return (
    <div className='flex justify-center'>
      <button type='button' className={buttonCss} onClick={onClick}>
        <div className={textCss}>{children}</div>
      </button>
    </div>
  );
}
