import React from 'react';
import { Send } from 'react-feather';

import { RefObject } from 'react';
import { IPlayerInfo } from 'stores/room';
interface IChatPresenterProps {
  chatStatus: boolean;
  messageList: any[];
  publisher: any;
  message: string;
  messageRef: RefObject<HTMLDivElement>;
  playerList: IPlayerInfo[];
  onChangeMessage: (e: any) => void;
  onClickSendMsg: () => void;
}

export default function ChatPresenter({
  chatStatus,
  messageList,
  publisher,
  message,
  messageRef,
  playerList,
  onChangeMessage,
  onClickSendMsg,
}: IChatPresenterProps) {
  return (
    <>
      {chatStatus ? (
        <div id='' className='w-80 bg-white flex flex-col z-40 font-kdisplay'>
          <div className='  text-center bg-gradient-to-b leading-[150%] from-[#FEDCE3] from-70% to-white to-90%  p-3 pb-8 text-white whitespace-nowrap font-medium text-2xl'>
            채팅
          </div>
          {/* <div className='bg-white h-full'> */}
          <div className='flex-grow w-full flex flex-col overflow-auto'>
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
                  {playerList.find((player) => player.playerId === msg.userId)?.nickname}{' '}
                  {msg.connectionId === publisher.stream.connection.connectionId ? '(나)' : '(님)'}
                </div>
                <div
                  className={
                    'rounded-lg p-2 w-11/12 text-justify whitespace-break-spaces ' +
                    `${
                      msg.connectionId === publisher.stream.connection.connectionId
                        ? ' border-[#FF8DA3] border-2'
                        : ' bg-[#FEDCE3]'
                    }`
                  }
                >
                  {msg.message}
                </div>
              </div>
            ))}
            <div ref={messageRef} />
          </div>
          <div className='flex w-full gap-2 p-2 justify-center items-center'>
            <textarea
              className=' h-14  w-full resize-none p-2 border-2 border-[#FF8DA3] rounded-md text-justify focus:outline-none focus:border-[#F9C7C8] focus:ring-1 focus:ring-[#F9C7C8] placeholder:text-[#8E8E8E]'
              placeholder='메세지를 입력해주세요.'
              // type='text'
              value={message}
              onChange={onChangeMessage}
            />
            <button
              className='whitespace-nowrap bg- rounded-md bg-[#FEDCE3]  p-3'
              onClick={onClickSendMsg}
            >
              {/* <FontAwesomeIcon icon={faPaperIconDefinition} color={'#FF8DA3'} fontSize={'28px'} /> */}
              <Send className='text-[#FF8DA3] text-2xl' />
            </button>
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </>
  );
}
