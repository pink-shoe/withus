import { atom } from 'jotai';

// Atom 생성: nickname, memberId, email을 전역 상태로 관리하는 객체 Atom
export const userAtom = atom<{ nickname: string; memberId: number; email: string }>({
  nickname: '',
  memberId: 0,
  email: '',
});
