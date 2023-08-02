import { useEffect, useState } from 'react';
import ChatPresenter from './ChatPresenter';

interface IChatContainerProps {
  chatStatus: boolean;
  session: any;
  publisher: any;
  sendMessage: (message: string) => void;
}
export default function ChatContainer({
  chatStatus,
  session,
  publisher,
  sendMessage,
}: IChatContainerProps) {
  const [message, setMessage] = useState('');
  const [messageList, setMessageList] = useState<any[]>([]);

  const onChangeMessage = (e: any) => {
    setMessage(e.target.value);
    console.log(e.target.value);
  };

  const onClickSendMsg = () => {
    sendMessage(message);
    setMessage('');
  };

  const receiveMessage = () => {
    if (session && publisher) {
      publisher.stream.session.on('signal:chat', (e: any) => {
        const data = JSON.parse(e.data);
        setMessageList((msgList) => [
          ...msgList,
          { connectionId: e.from.connectionId, nickname: data.nickname, message: data.message },
        ]);
      });
    }
  };
  useEffect(() => {
    session && publisher && receiveMessage();
  }, [session, publisher]);

  // useEffect(() => {
  //   console.log(messageList);
  // }, [receiveMessage]);

  return (
    <ChatPresenter
      chatStatus={chatStatus}
      messageList={messageList}
      publisher={publisher}
      message={message}
      onChangeMessage={onChangeMessage}
      onClickSendMsg={onClickSendMsg}
    />
  );
}
