import { ChangeEvent, useEffect, useState } from 'react';
import { ParticipantsPresenter } from './ParticipantListPresenter';
import { IUserAtom } from 'stores/user';

// export let localUser: IUser;
interface IParticipantsContainerProps {
  type: 'WAIT' | 'GAME';
  user: IUserAtom;
  // onChangeUserName: (username: string) => void;
  publisher: any;
  streamList: any;
  readyStatus: boolean;
  // onChangeIsUpdateUserName: (status: boolean) => void;
}
export default function ParticipantsContainer({
  type,
  user,
  publisher,
  streamList,
  readyStatus,
  ...callback
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

  return (
    <ParticipantsPresenter
      type={type}
      streamList={streamList}
      user={user}
      onChangeUserName={onChangeUserName}
      isUpdateUserName={isUpdateUserName}
      onChangeUpdateUserNameStatus={updateUserName}
      saveUserName={saveUserName}
    />
  );
}
