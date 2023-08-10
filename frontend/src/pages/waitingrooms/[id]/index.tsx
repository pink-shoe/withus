import Background from '@components/common/Background';
import { useEffect, useState } from 'react';
import { VideoStream } from '@components/VideoStream';
import { useLocation, useNavigate } from 'react-router-dom';
import { signalType, useOpenvidu } from 'hooks/useOpenvidu';
import ParticipantsContainer from '@components/ParticipantsList/ParticipantListContainer';
import ChatContainer from '@components/Chat/ChatContainer';
import { useAtom } from 'jotai';
import { IUserAtom, userAtom } from 'stores/user';
import { IPlayerInfo, IRoomAtom, roomAtom } from 'stores/room';
import { ControlBarContainer } from '@components/Controlbar/ControlBarContainer';
import Board from '@components/common/Board';
import { getRoomInfoApi } from 'apis/roomApi';
import { useQuery } from '@tanstack/react-query';
export default function WaitingRoom() {
  const location = useLocation();
  const currentPath = Number(
    location.pathname.slice(location.pathname.lastIndexOf('/') + 1, location.pathname.length)
  );
  const navigate = useNavigate();

  const [user, setUser] = useAtom<IUserAtom>(userAtom);
  const [roomInfo, setRoomInfo] = useAtom(roomAtom);
  const [isHost, setIsHost] = useState<boolean>(false);
  const [chatStatus, setChatStatus] = useState<boolean>(true);
  const [playerList, setPlayerList] = useState<IPlayerInfo[]>([]);

  const { data } = useQuery(['rooms/info'], () => getRoomInfoApi(currentPath), {});
  const [isReady, setIsReady] = useState<boolean>(false);
  const getRoomData = async () => {
    const result = (await getRoomInfoApi(currentPath)) as IRoomAtom;
    if (result) {
      setRoomInfo(result);
      setPlayerList(result.playerInfos);
      setIsHost(result.hostId === user.memberId);
    }
  };

  useEffect(() => {
    if (data) {
      setRoomInfo(data as IRoomAtom);
      const roomInfo = data as IRoomAtom;
      console.log('roominfo', roomInfo);
      roomInfo.playerInfos && setPlayerList(roomInfo.playerInfos);
      roomInfo.hostId && setIsHost(roomInfo.hostId === user.memberId);

      if (roomInfo.playerInfos) {
        const player = roomInfo.playerInfos.find((player) => {
          return player.playerId === user.memberId;
        });
        player && setIsReady(player?.ready);
      }
    }
  }, [data]);

  // const [isUpdateUserName, setIsUpdateUserName] = useState<boolean>(false);
  // const player: IPlayerAtom = {
  //   memberId: user.memberId,
  //   nickname: user.nickname,
  //   ready: readyStatus,
  // };
  const {
    session,
    publisher,
    streamList,
    // subscribers,
    // setSubscribers,
    // updateUserStatus,
    onChangeCameraStatus,
    onChangeMicStatus,
    sendSignal,
  } = useOpenvidu(
    user.memberId,
    // user.nickname,
    currentPath
  );

  const onChangeChatStatus = (chatStatus: boolean) => {
    setChatStatus(!chatStatus);
  };

  // const onChangeUserName = (userName: string) => {
  //   setUserName(userName);
  // };

  // const onChangeIsUpdateUserName = (isUpdateteteUserName: boolean) => {
  //   setIsUpdateUserName(!isUpdateUserName);
  // };
  // const onChangeUpdateUserNameStatus = (updateUserNameStatus: boolean) => {
  //   setUpdateUserNameStatus(!updateUserNameStatus);
  // };

  const receiveSignal = (type: signalType) => {
    if (session && publisher) {
      publisher.stream.session.on('signal:' + type, (e: any) => {
        const result = JSON.parse(e.data);
        if (type === 'START') navigate(`/gamerooms/${currentPath}`);
        if (result) getRoomData();
      });
    }
  };

  useEffect(() => {
    session &&
      publisher &&
      (receiveSignal('READY'), receiveSignal('CANCEL_READY'), receiveSignal('START'));
  }, [session, publisher]);

  useEffect(() => {
    getRoomData();
    console.log('streamlist', streamList);
  }, [streamList]);

  return (
    <Background isLobbyPage={false}>
      <div className='flex w-full h-full'>
        {/* 참가자 목록 */}
        <div className='justify-start bg-white z-40'>
          {(data as IRoomAtom) && playerList && roomInfo && (
            <ParticipantsContainer
              type={'WAIT'}
              user={user}
              // userId={userId}
              // userName={userName}
              // onChangeUserName={onChangeUserName}
              playerList={playerList}
              hostId={roomInfo.hostId}
              roomRound={roomInfo.room.roomRound}
              roomType={roomInfo.room.roomType} // onChangeIsUpdateUserName={onChangeIsUpdateUserName}
            />
          )}
        </div>
        {/* openvidu 화면 */}
        <div className='w-full'>
          <Board boardType='WAIT'>
            {/* <header className=''>
          <div className=' text-white font-extrabold text-6xl text-center py-3'>[] with us</div>
        </header> */}
            <div className='aspect-[4/3]'>
              {publisher && (
                <div className='w-full'>
                  <VideoStream streamManager={publisher} name={user.nickname} isMe={true} />
                </div>
              )}
            </div>
          </Board>
          <div className='mt-5 p-2 align-bottom'>
            {(data as IRoomAtom) && roomInfo.room && roomInfo.room.roomId !== 0 && (
              <ControlBarContainer
                type={'WAIT'}
                isHost={isHost}
                readyStatus={isReady}
                onChangeMicStatus={onChangeMicStatus}
                onChangeCameraStatus={onChangeCameraStatus}
                onChangeChatStatus={onChangeChatStatus}
                sendSignal={sendSignal}
                roomId={roomInfo.room.roomId}
                roomCode={Number(currentPath)}
              />
            )}
          </div>
        </div>
        <ChatContainer
          chatStatus={chatStatus}
          session={session}
          publisher={publisher}
          sendSignal={sendSignal}
        />
      </div>
    </Background>
  );
}
