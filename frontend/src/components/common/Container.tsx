import { ReactNode } from 'react';

interface IContainerProps {
  children: ReactNode;
  type?: 'isBig' | 'isSmall';
}

export default function Container({ children, type }: IContainerProps) {
  let containerCss =
    'lg:flex lg:flex-col gap-4 rounded-lg border-2 border-[#FF8D8D] w-96 h-96 bg-white';

  if (type === 'isBig') {
    containerCss =
      'lg:flex lg:flex-col gap-4 rounded-lg border-2 border-[#FF8D8D] w-1/2 h-96 bg-white';
  }

  return <div className={containerCss}>{children}</div>;
}
