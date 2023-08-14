import { useEffect, useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import saveAs from 'file-saver';
import './GameRoom.css';
import { VideoStream } from '@components/VideoStream';
import { useLocation, useNavigate } from 'react-router-dom';
import { signalType, useOpenvidu } from 'hooks/useOpenvidu';
import { ControlBarContainer } from '@components/Controlbar/ControlBarContainer';
import ParticipantsContainer from '@components/ParticipantsList/ParticipantListContainer';
import ChatContainer from '@components/Chat/ChatContainer';
import { IUserAtom, userAtom } from 'stores/user';
import { useAtom, useAtomValue } from 'jotai';
import { IPlayerInfo, IRoomAtom, roomAtom } from 'stores/room';
import Background from '@components/common/Background';
import Board from '@components/common/Board';
import { useQuery } from '@tanstack/react-query';
import { IGameInfo, getGameInfoApi, getGameResultApi } from 'apis/gameApi';
import Modal from '@components/common/Modal';

export default function GameRoom() {
  const location = useLocation();
  const currentPath = Number(
    location.pathname.slice(location.pathname.lastIndexOf('/') + 1, location.pathname.length)
  );
  const navigate = useNavigate();

  const [user, setUser] = useAtom<IUserAtom>(userAtom);
  const roomInfo = useAtomValue<IRoomAtom>(roomAtom);

  // 모달 만들면서 추가한 부분
  const currentRound = roomInfo.room.roomRound;
  const [remainingTime, setRemainingTime] = useState(3);
  const [shapeURL, setShapeURL] = useState('');
  const [isProblemModal, setIsProblemModal] = useState(false);
  // 겹치는 부분 있는지 확인점
  const [gameRoomInfo, setGameRoomInfo] = useState<IGameInfo>();
  const [isHost, setIsHost] = useState<boolean>(false);
  const [chatStatus, setChatStatus] = useState<boolean>(true);
  const [playerList, setPlayerList] = useState<IPlayerInfo[]>([]);
  const { data } = useQuery(['games/info'], () => getGameInfoApi(roomInfo.room.roomId));
  const getGameData = async () => {
    const result = (await getGameInfoApi(roomInfo.room.roomId)) as IGameInfo;
    if (result) {
      setGameRoomInfo(result);
      setPlayerList(result.playerInfos);
      setIsHost(result.hostId === user.memberId);
      // 해당 부분은 api 연결 후 추가 확인 필요.
      if (result.currentRound === result.room.roomRound) await getGameResultApi(result.room.roomId);
    }
  };

  const closeProblemModal = () => {
    setIsProblemModal(false);
  };

  // 라운드 변경시 모달창 띄우기
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (isProblemModal) {
      setRemainingTime(3); // 모달이 열릴 때 남은 시간 초기화

      // 모달 열기와 함께 타이머 시작
      timeoutId = setTimeout(() => {
        const updatedTime = remainingTime - 1;
        setRemainingTime(updatedTime);

        if (updatedTime > 0) {
          // 남은 시간이 있을 경우 타이머 재실행
          timeoutId = setTimeout(() => {
            setRemainingTime(updatedTime - 1);
          }, 1000);
        } else {
          // 시간이 다 되면 모달 닫기
          setIsProblemModal(false);
        }
      }, 1000);
    }
  }, [currentRound]);

  useEffect(() => {
    if (data) {
      const gameData = data as IGameInfo;
      setGameRoomInfo(gameData);
      gameData.playerInfos && setPlayerList(gameData.playerInfos);
      gameData.hostId && setIsHost(gameData.hostId === user.memberId);
      gameData.shapes.shapeUrl && setShapeURL(gameData.shapes.shapeUrl);
    }
    console.log(data);
  }, [data]);

  const { session, publisher, streamList, onChangeCameraStatus, onChangeMicStatus, sendSignal } =
    useOpenvidu(
      user.memberId,
      // user.nickname,
      currentPath
    );

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
      const gameroom = data as IGameInfo;
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
        if (result) getGameData();
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
        {/* 라운드마다 문제 나오는 모달창 */}
        {isProblemModal && (
          <Modal openModal={isProblemModal} isSettingModal={false}>
            <div className='animate-shake'>
              <p className='text-[#514148] font-kdisplay font-medium text-4xl mb-10 text-center'>
                {roomInfo.room.roomRound}라운드 문제
              </p>
              <div className='flex mb-7 w-48 h-48 border-2 border-[#8D98FF]'>
                <img src={shapeURL} />
              </div>
              <p className='text-[#514148] font-kdisplay font-medium text-2xl mb-10 text-center'>
                게임 시작{' '}
                <span className='text-blue-500 font-medium text-4xl'>{remainingTime}초</span>초 전
              </p>
            </div>
          </Modal>
        )}
        {/* 참가자 목록 */}
        <div className='justify-start bg-white z-40'>
          {(data as IGameInfo) && playerList && gameRoomInfo && gameRoomInfo.room && (
            <ParticipantsContainer
              type={'GAME'}
              user={user}
              playerList={playerList}
              hostId={gameRoomInfo.hostId}
              currentRound={gameRoomInfo.currentRound}
              roomRound={gameRoomInfo.room.roomRound}
              roomType={gameRoomInfo.room.roomType}
            />
          )}
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
                  {(data as IGameInfo) &&
                    playerList &&
                    gameRoomInfo &&
                    streamList
                      .sort((a: any, b: any) => b.userId - a.userId)
                      ?.map((stream: any, idx: number) => {
                        const player = playerList.find((player: IPlayerInfo) => {
                          return player.playerId === stream.userId;
                        });
                        return (
                          <div className='w-full h-full' key={idx}>
                            {player && (
                              <VideoStream
                                streamManager={stream.streamManager}
                                name={player.nickname}
                                isMe={stream.userId === user.memberId}
                              />
                            )}
                          </div>
                        );
                      })}
                </div>
              )}
            </div>
          </Board>
          <div className='p-2 mt-2 align-bottom'>
            {(data as IGameInfo) &&
              gameRoomInfo &&
              gameRoomInfo.room &&
              gameRoomInfo.room.roomId !== 0 && (
                <ControlBarContainer
                  type={'GAME'}
                  isHost={isHost}
                  onChangeMicStatus={onChangeMicStatus}
                  onChangeCameraStatus={onChangeCameraStatus}
                  onChangeChatStatus={onChangeChatStatus}
                  sendSignal={sendSignal}
                  roomId={gameRoomInfo.room.roomId}
                  roomCode={Number(currentPath)}
                />
              )}
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
