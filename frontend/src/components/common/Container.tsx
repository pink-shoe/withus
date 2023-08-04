import { ReactNode } from 'react';

interface IContainerProps {
  children: ReactNode;
  // isBig, isSmall 구분으로 크기 나누기 등
}

export default function Container({ children }: IContainerProps) {
  return (
    <div className='lg:flex lg:flex-col gap-4 rounded-lg border-2 border-[#FF8D8D] w-96 h-96 bg-white '>
      {children}
    </div>
  );
}
