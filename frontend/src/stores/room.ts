import { atom } from 'jotai';

export interface IRoomAtom {
  roomCode: number;
  roomId: number;
  roomLink: string;
  roomRound: number;
  roomTime: number;
  roomType: string;
  hostId: number;
}

// Atom 생성: nickname, memberId, email을 전역 상태로 관리하는 객체 Atom
export const roomAtom = atom<IRoomAtom>({
  roomCode: 0,
  roomId: 0,
  roomLink: '',
  roomRound: 0,
  roomTime: 0,
  roomType: '',
  hostId: 0,
});
