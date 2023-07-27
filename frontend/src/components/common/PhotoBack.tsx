import React, { ReactNode } from 'react';

interface PhotoBackProps {
  children: ReactNode;
}

export default function PhotoBack({ children }: PhotoBackProps) {
  return <div className=''>{children}</div>;
}
