import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
}

export default function SmallContainer({ children }: ContainerProps) {
  return (
    <div className='lg:flex lg:flex-col gap-4 rounded-lg border-4 border-black w-full h-full bg-white '>
      {children}
    </div>
  );
}
