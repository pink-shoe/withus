import { atom } from 'jotai';

export interface IErrorAtom {
  errorCode: string;
  message: string;
}

export const errorAtom = atom<IErrorAtom>({ errorCode: '', message: '' });
