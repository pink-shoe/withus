import { ChangeEvent, useEffect, useState } from 'react';
import { ParticipantsPresenter } from './ParticipantListPresenter';
import { IUserAtom } from 'stores/user';
import { IPlayerInfo } from 'stores/room';
import { updateMemberNicknameApi } from 'apis/roomApi';
import { signalType } from 'hooks/useOpenvidu';

// export let localUser: IUser;
interface IParticipantsContainerProps {
  type: 'WAIT' | 'GAME';
  user: IUserAtom;
  hostId: number;
  playerList: IPlayerInfo[];
  currentRound?: number;
  roomRound: number;
  roomType: string;
  sendSignal?: (message: string, type: signalType) => void;
}
export default function ParticipantsContainer({
  type,
  user,
  hostId,
  playerList,
  currentRound,
  roomRound,
  roomType,
  sendSignal,
}: IParticipantsContainerProps) {
  const [userName, setUserName] = useState(user.nickname);
  const [isUpdateUserName, setIsUpdateUserName] = useState(false);
  const onChangeUserName = (e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const updateUserName = () => {
    setIsUpdateUserName(true);
  };
  const saveUserName = async () => {
    if (type === 'WAIT' && sendSignal) {
      setIsUpdateUserName(false);
      console.log(userName);
      const result: any = await updateMemberNicknameApi(userName);
      console.log(result);
      if (result.status === 200) sendSignal(`${user.memberId} ${userName}`, 'UPDATE');
      // stream에 userName update 처리 필요
    }
  };

  return (
    <ParticipantsPresenter
      type={type}
      playerList={playerList}
      user={user}
      onChangeUserName={onChangeUserName}
      isUpdateUserName={isUpdateUserName}
      onChangeUpdateUserNameStatus={updateUserName}
      saveUserName={saveUserName}
      hostId={hostId}
      currentRound={currentRound}
      roomRound={roomRound}
      roomType={roomType}
      userName={userName}
    />
  );
}
