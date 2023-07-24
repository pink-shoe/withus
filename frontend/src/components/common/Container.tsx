import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
}

export default function Container({ children }: ContainerProps) {
  return (
    <div className='lg:flex lg:flex-col mx-4 gap-4 rounded-lg border-2 border-black w-full h-full bg-white'>
      {children}
    </div>
  );
}
