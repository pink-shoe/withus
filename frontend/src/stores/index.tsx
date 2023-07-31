import { atom } from 'jotai';

// Atom 생성: nickname을 전역 상태로 관리하는 Atom jotai에서 상태관리를 하는 변수는 뒤에 Atom을 붙인다.
export const nicknameAtom = atom<string>('');
export const memberIdAtom = atom<number | null>(null);
export const emailAtom = atom<string | null>(null);
