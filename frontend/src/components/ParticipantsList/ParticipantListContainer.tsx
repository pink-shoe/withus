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
  onChangeIsEditUserName: (status: boolean) => void;
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
  const [isEditUserName, setIsEditUserName] = useState(false);
  const onChangeUserName = (e: ChangeEvent<HTMLInputElement>) => {
    setUserName(e.target.value);
    console.log(e.target.value);
  };

  const editUserName = () => {
    setIsEditUserName(true);
  };
  const saveUserName = () => {
    setIsEditUserName(false);
    console.log(userName);
    // stream에 userName update 처리 필요
  };
  useEffect(() => {
    callback.onChangeUserName(userName);
  }, [userName, callback]);

  useEffect(() => {
    callback.onChangeIsEditUserName(isEditUserName);
  }, [isEditUserName, callback]);

  return (
    <ParticipantsPresenter
      type={type}
      readyStatus={readyStatus}
      streamList={streamList}
      userId={userId}
      userName={userName}
      onChangeUserName={onChangeUserName}
      isEditUserName={isEditUserName}
      editUserName={editUserName}
      saveUserName={saveUserName}
    />
  );
}
