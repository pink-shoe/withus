import { Dispatch, SetStateAction, createContext } from 'react';

export interface IErrorAtom {
  code: string;
  message: string;
  setError: Dispatch<SetStateAction<any>>;
}

// export const errorAtom = atom<IErrorAtom>({ errorCode: '', message: '' });
export const ErrorContext = createContext<IErrorAtom>({
  code: '',
  message: '',
  setError: () => {},
});
