import React, { ReactNode } from 'react';

interface IAlbumBackGroundProps {
  children: ReactNode;
}

export default function AlbumBackGround({ children }: IAlbumBackGroundProps) {
  return <div className=''>{children}</div>;
}
