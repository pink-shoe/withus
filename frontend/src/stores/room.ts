import { atom } from 'jotai';
export interface IPlayerInfo {
  nickname: string;
  playerId: number;
  ready: boolean;
  teamType: number;
  vote: number;
}
export interface IRoom {
  currentRound: number;
  roomCode: number;
  roomId: number;
  roomLink: string;
  roomRound: number;
  roomTime: number;
  roomType: string;
  start: 'no' | 'yes' | 'playing' | 'end';
}
export interface IRoomAtom {
  hostId: number;
  playerInfos: IPlayerInfo[];
  room: IRoom;
}

// Atom 생성: nickname, memberId, email을 전역 상태로 관리하는 객체 Atom
export const roomAtom = atom<IRoomAtom>({
  hostId: -1,
  playerInfos: [],
  room: {
    currentRound: -1,
    roomCode: -1,
    roomId: -1,
    roomLink: '',
    roomRound: -1,
    roomTime: -1,
    roomType: '',
    start: 'no',
  },
});
