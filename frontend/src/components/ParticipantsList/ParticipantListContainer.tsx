import { ChangeEvent, useEffect, useState } from 'react';
import { ParticipantsPresenter } from './ParticipantListPresenter';
import { IUserAtom } from 'stores/user';
import { IPlayerInfo } from 'stores/room';

// export let localUser: IUser;
interface IParticipantsContainerProps {
  type: 'WAIT' | 'GAME';
  user: IUserAtom;
  isHost: boolean;
  // onChangeUserName: (username: string) => void;
  playerList: IPlayerInfo[];
  // readyStatus: boolean;
  // onChangeIsUpdateUserName: (status: boolean) => void;
}
export default function ParticipantsContainer({
  type,
  user,
  isHost,
  playerList,
}: IParticipantsContainerProps) {
  const [userName, setUserName] = useState(user.nickname);
  const [isUpdateUserName, setIsUpdateUserName] = useState(false);
  const onChangeUserName = (e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
  };

  const updateUserName = () => {
    setIsUpdateUserName(true);
  };
  const saveUserName = () => {
    setIsUpdateUserName(false);
    console.log(userName);
    // stream에 userName update 처리 필요
  };
  // useEffect(() => {
  //   callback.onChangeUserName(userName);
  // }, [userName, callback]);

  // useEffect(() => {
  //   callback.onChangeIsUpdateUserName(isUpdateUserName);
  // }, [isUpdateUserName, callback]);

  // useEffect(() => {
  //   console.log('plist', pList);
  //   setPlayerList(pList);
  //   console.log(playerList);
  // }, []);
  // useEffect(() => {
  //   console.log('players', playerList);
  // }, [playerList]);
  return (
    <ParticipantsPresenter
      type={type}
      playerList={playerList}
      user={user}
      onChangeUserName={onChangeUserName}
      isUpdateUserName={isUpdateUserName}
      onChangeUpdateUserNameStatus={updateUserName}
      saveUserName={saveUserName}
      isHost={isHost}
    />
  );
}
