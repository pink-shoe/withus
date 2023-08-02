import { ReactNode } from 'react';

interface IContainerProps {
  children: ReactNode;
  // isBig, isSmall 구분으로 크기 나누기 등
}

export default function Container({ children }: IContainerProps) {
  return (
    <div className='lg:flex lg:flex-col gap-4 rounded-lg border-4 border-black w-full h-full bg-white '>
      {children}
    </div>
  );
}
