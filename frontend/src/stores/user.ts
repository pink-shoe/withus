import { atom } from 'jotai';

export interface IUserAtom {
  nickname: string;
  memberId: number;
  email: string;
}

export interface IPlayerAtom {
  // playerId: number;
  memberId: number;
  nickname: string;
  // teamType: number;
  // roomdId: number;
  ready: boolean;
}
// Atom 생성: nickname, memberId, email을 전역 상태로 관리하는 객체 Atom
export const userAtom = atom<IUserAtom>({
  nickname: '',
  memberId: 0,
  email: '',
});

export const playerAtom = atom<IPlayerAtom>({
  // playerId: 0,
  memberId: 0,
  nickname: '',
  // teamType: 0,
  // roomdId: 0,
  ready: false,
});
