import { useEffect, useRef, useState } from 'react';
import ChatPresenter from './ChatPresenter';
import { signalType } from 'hooks/useOpenvidu';
import { IPlayerInfo } from 'stores/room';

interface IChatContainerProps {
  chatStatus: boolean;
  session: any;
  publisher: any;
  playerList: IPlayerInfo[];
  sendSignal: (message: string, type: signalType) => void;
  // receiveSignal: (type: signalType) => void;
}
export default function ChatContainer({
  chatStatus,
  session,
  publisher,
  playerList,
  sendSignal,
}: // receiveSignal,
IChatContainerProps) {
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState<any[]>([]);
  const messageRef = useRef<HTMLDivElement>(null);
  const onChangeMessage = (e: any) => {
    setMessage(e.target.value);
    console.log(e.target.value);
  };

  const onClickSendMsg = () => {
    sendSignal(message, 'CHAT');
    setMessage('');
  };

  const receiveMessage = (type: signalType) => {
    if (session && publisher) {
      // const data = receiveSignal('CHAT');
      // console.log('message', data);
      publisher.stream.session.on('signal:' + type, (e: any) => {
        const data = JSON.parse(e.data);
        setMessageList((msgList) => [
          ...msgList,
          { connectionId: e.from.connectionId, userId: data.userId, message: data.message },
        ]);
      });
    }
  };
  useEffect(() => {
    session && publisher && receiveMessage('CHAT');
  }, [session, publisher]);

  const scrollToBottom = () => {
    messageRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  useEffect(() => {
    scrollToBottom();
  }, [messageList]);

  return (
    <ChatPresenter
      playerList={playerList}
      chatStatus={chatStatus}
      messageList={messageList}
      publisher={publisher}
      message={message}
      onChangeMessage={onChangeMessage}
      onClickSendMsg={onClickSendMsg}
      messageRef={messageRef}
    />
  );
}
