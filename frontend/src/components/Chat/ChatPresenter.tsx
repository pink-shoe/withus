import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useOpenvidu } from 'hooks/useOpenvidu';
interface IChatPresenterProps {
  chatStatus: boolean;
  messageList: any[];
  publisher: any;
  message: string;
  onChangeMessage: (e: any) => void;
  onClickSendMsg: () => void;
}
export default function ChatPresenter({
  chatStatus,
  messageList,
  publisher,
  message,
  onChangeMessage,
  onClickSendMsg,
}: IChatPresenterProps) {
  return (
    <>
      {chatStatus ? (
        <div id='' className=' w-80 bg-white'>
          <div className='text-center bg-[#112364] p-3 text-white whitespace-nowrap font-bold text-xl'>
            채팅창
          </div>
          {/* <div className='bg-white h-full'> */}
          <div className='w-full h-5/6 flex flex-col'>
            {messageList.map((msg, idx) => (
              <div
                key={idx}
                className={
                  'flex flex-col p-2 ' +
                  `${
                    msg.connectionId === publisher.stream.connection.connectionId
                      ? 'items-end'
                      : 'items-start'
                  }`
                }
              >
                <div>
                  {msg.nickname}{' '}
                  {msg.connectionId === publisher.stream.connection.connectionId ? '(나)' : '(님)'}
                </div>
                <div>{msg.message}</div>
              </div>
            ))}
          </div>
          <div className='flex w-full justify-center items-center'>
            <input
              className='w-full p-2 border-2 border-blue-800 rounded-md text-center focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500 placeholder:text-slate-400'
              placeholder='메세지를 입력해주세요.'
              type='text'
              value={message}
              onChange={onChangeMessage}
            />
            <button className='whitespace-nowrap' onClick={onClickSendMsg}>
              전송
            </button>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}
