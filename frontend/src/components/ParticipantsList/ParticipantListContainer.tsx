import { ChangeEvent, useEffect, useState } from 'react';
import { ParticipantsPresenter } from './ParticipantListPresenter';

// export let localUser: IUser;
interface IParticipantsContainerProps {
  type: 'WAIT' | 'GAME';
  userId: number;
  userName: string;
  onChangeUserName: (username: string) => void;
  publisher: any;
  streamList: any;
  readyStatus: boolean;
  onChangeIsUpdateUserName: (status: boolean) => void;
}
export default function ParticipantsContainer({
  type,
  userId,
  userName: uname,
  publisher,
  streamList,
  readyStatus,
  ...callback
}: IParticipantsContainerProps) {
  const [userName, setUserName] = useState(uname);
  const [isUpdateUserName, setIsUpdateUserName] = useState(false);
  const onChangeUserName = (e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
    console.log(e.target.value);
  };

  const updateUserName = () => {
    setIsUpdateUserName(true);
  };
  const saveUserName = () => {
    setIsUpdateUserName(false);
    console.log(userName);
    // stream에 userName update 처리 필요
  };
  useEffect(() => {
    callback.onChangeUserName(userName);
  }, [userName, callback]);

  useEffect(() => {
    callback.onChangeIsUpdateUserName(isUpdateUserName);
  }, [isUpdateUserName, callback]);

  return (
    <ParticipantsPresenter
      type={type}
      readyStatus={readyStatus}
      streamList={streamList}
      userId={userId}
      userName={userName}
      onChangeUserName={onChangeUserName}
      isUpdateUserName={isUpdateUserName}
      updateUserName={updateUserName}
      saveUserName={saveUserName}
    />
  );
}
