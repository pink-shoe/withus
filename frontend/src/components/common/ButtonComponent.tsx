import React from 'react';

interface IButtonProps {
  type?: 'isSmall' | 'isBig' | 'tiny' | 'tinyPointed';
  onClick?: () => any;
  children: React.ReactNode;
}

export default function ButtonComponent({ type, onClick, children }: IButtonProps) {
  let buttonCss: string;
  let textCss: string;
  let margin = '';

  if (type === 'isBig') {
    buttonCss = 'rounded-xl w-96 h-8 bg-[#FF8D8D]  hover:border-[#FF8D8D]';
    textCss = 'font-kdisplay text-xl';
    margin = 'm-1';
  } else if (type === 'tiny') {
    buttonCss = 'rounded w-24 h-8 border-2 bg-white hover:border-[#FF8D8D]';
    textCss = 'font-kdisplay';
  } else if (type === 'tinyPointed') {
    buttonCss = 'rounded w-28 h-8 bg-[#FF8D8D]  hover:border-[#FF8D8D]';
    textCss = 'font-kdisplay';
  } else {
    buttonCss = 'rounded-xl w-64 h-8 bg-[#FF8D8D]  hover:border-[#FF8D8D]';
    textCss = 'font-kdisplay text-lg';
  }
  return (
    <div className={`flex justify-center ${margin}`}>
      <button type='button' className={buttonCss} onClick={onClick}>
        <div className={textCss}>{children}</div>
      </button>
    </div>
  );
}
