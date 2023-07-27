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
      let msgList = messageList;
      publisher.stream.session.on('signal:chat', (e: any) => {
        console.log('test', e);
        const data = JSON.parse(e.data);
        msgList.push({
          connectionId: e.from.connectionId,
          nickname: data.nickname,
          message: data.message,
        });
        console.log('test', msgList);
      });
      setMessageList(msgList);
    }
  };
  useEffect(() => {
    session && publisher && receiveMessage();
  }, [session, publisher]);

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
