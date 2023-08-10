import { useEffect, useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import saveAs from 'file-saver';
import { VideoStream } from '@components/VideoStream';
import { useLocation } from 'react-router-dom';
import { signalType, useOpenvidu } from 'hooks/useOpenvidu';
import { ControlBarContainer } from '@components/Controlbar/ControlBarContainer';
import ParticipantsContainer from '@components/ParticipantsList/ParticipantListContainer';
import ChatContainer from '@components/Chat/ChatContainer';
import { IUserAtom, userAtom } from 'stores/user';
import { useAtom } from 'jotai';
import { IPlayerInfo, IRoomAtom, roomAtom } from 'stores/room';
import Background from '@components/common/Background';
import Board from '@components/common/Board';
import { getRoomInfoApi } from 'apis/roomApi';
import { useQuery } from '@tanstack/react-query';
import { IGameInfo, getGameInfoApi, sendCaptureImageApi } from 'apis/gameApi';

export default function GameRoom() {
  const location = useLocation();
  const currentPath = Number(
    location.pathname.slice(location.pathname.lastIndexOf('/') + 1, location.pathname.length)
  );

  const [user, setUser] = useAtom<IUserAtom>(userAtom);
  const [roomInfo, setRoomInfo] = useAtom(roomAtom);
  const [gameRoomInfo, setGameRoomInfo] = useState<IGameInfo>();
  const [isHost, setIsHost] = useState<boolean>(true);
  const [chatStatus, setChatStatus] = useState<boolean>(true);
  // const [playerList, setPlayerList] = useState<IPlayerInfo[]>([]);

  const { data } = useQuery(['rooms/info'], () => getRoomInfoApi(currentPath), {});
  const { data: gameRoomData } = useQuery(
    ['games/info'],
    () => getGameInfoApi((data as IRoomAtom).room.roomId),
    { enabled: !data }
  );
  const getGameData = async () => {
    const room = data as IRoomAtom;
    const result = (await getGameInfoApi(room.room.roomId)) as IGameInfo;
    if (result) {
      setGameRoomInfo(result);
    }
  };
  useEffect(() => {
    if (data) {
      setRoomInfo(data as IRoomAtom);
      const roomInfo = data as IRoomAtom;
      roomInfo.hostId && setIsHost(roomInfo.hostId === user.memberId);
    }
  }, [data]);

  useEffect(() => {
    if (gameRoomData) {
      const gameData = gameRoomData as IGameInfo;
      setGameRoomInfo(gameData);
    }
  }, [gameRoomData]);

  const { session, publisher, streamList, onChangeCameraStatus, onChangeMicStatus, sendSignal } =
    useOpenvidu(user.memberId, user.nickname, roomInfo.room.roomId!);

  const onChangeChatStatus = (chatStatus: boolean) => {
    setChatStatus(!chatStatus);
  };

  const divRef = useRef<HTMLDivElement>(null);
  const handleDownload = async () => {
    if (!divRef.current) return;

    try {
      const div = divRef.current;
      const canvas = await html2canvas(div, { scale: 1 });
      console.log(canvas.toDataURL());
      const gameroom = gameRoomData as IGameInfo;
      // flask 쪽 rest api 연결 완료 시 해당 주석 제거 후 api 연결.
      // const result = await sendCaptureImageApi(
      //   canvas.toDataURL(),
      //   gameroom.currentRound,
      //   gameroom.room.roomId,
      //   gameroom.shapes.shapeId
      // );
      // console.log(result);
      canvas.toBlob((blob) => {
        if (blob !== null) {
          saveAs(blob, 'result.png');
        }
      });
    } catch (error) {
      console.error('Error converting div to image:', error);
    }
  };

  const receiveSignal = (type: signalType) => {
    if (session && publisher) {
      publisher.stream.session.on('signal:' + type, (e: any) => {
        const result = JSON.parse(e.data);
        console.log(result);

        if (e.data) getGameData();
      });
    }
  };
  useEffect(() => {
    session && publisher && receiveSignal('ROUND');
  }, [session, publisher]);

  useEffect(() => {
    getGameData();
    console.log('streamlist', streamList);
  }, [streamList]);

  return (
    <Background isLobbyPage={false}>
      <div className='flex w-full h-full'>
        {/* 참가자 목록 */}
        <div className='justify-start bg-white z-40'>
          <ParticipantsContainer
            type={'GAME'}
            user={user}
            playerList={roomInfo.playerInfos}
            hostId={roomInfo.hostId}
            currentRound={0}
            roomRound={0}
            roomType='coop'
            // roomRound={roomInfo.room.roomRound}
            // roomType={roomInfo.room.roomType}
          />
        </div>
        {/* openvidu 화면 */}
        <div className='w-full'>
          <Board boardType='GAME'>
            <header className=' h-fit flex items-center gap-2 '></header>
            <div className='aspect-[4/3]'>
              {publisher && (
                <div
                  id='captureDiv'
                  ref={divRef}
                  className='aspect-[4/3] grid grid-flow-dense grid-rows-2 grid-cols-2'
                >
                  {streamList
                    .sort((a: any, b: any) => b.userId - a.userId)
                    ?.map((stream: any, idx: number) => {
                      return (
                        <div className='w-full h-full' key={idx}>
                          <VideoStream
                            streamManager={stream.streamManager}
                            name={stream.userName}
                            isMe={stream.userId === user.memberId}
                          />
                        </div>
                      );
                    })}
                </div>
              )}
            </div>
          </Board>
          <div className='p-2 mt-2 align-bottom'>
            <ControlBarContainer
              type={'GAME'}
              isHost={isHost}
              onChangeMicStatus={onChangeMicStatus}
              onChangeCameraStatus={onChangeCameraStatus}
              onChangeChatStatus={onChangeChatStatus}
              sendSignal={sendSignal}
              roomId={roomInfo.room.roomId}
              roomCode={Number(currentPath)}
            />
          </div>
          <button onClick={handleDownload}>다운로드</button>
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
