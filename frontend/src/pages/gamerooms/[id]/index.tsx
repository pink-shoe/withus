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
import { IGameInfo, getGameInfoApi, getGameResultApi, sendCaptureImageApi } from 'apis/gameApi';
import Modal from '@components/common/Modal';
import MvpModal from '@components/MvpModal/MvpModal';
import { sendRoundInfoApi } from 'apis/ai';

export default function GameRoom() {
  const location = useLocation();
  const currentPath = Number(
    location.pathname.slice(location.pathname.lastIndexOf('/') + 1, location.pathname.length)
  );
  const navigate = useNavigate();
  const [roundTimer, setRoundTimer] = useState<number>(7);
  const [canPlay, setCanPlay] = useState<boolean>(true);
  const [gameRoomInfo, setGameRoomInfo] = useState<IGameInfo>();
  const [currentRound, setCurrentRound] = useState(gameRoomInfo?.room.currentRound);
  const [isHost, setIsHost] = useState<boolean>(false);
  const [chatStatus, setChatStatus] = useState<boolean>(true);
  const [playerList, setPlayerList] = useState<IPlayerInfo[]>([]);
  const { data } = useQuery(['games/info'], () => getGameInfoApi(roomInfo.room.roomId));
  const [user, setUser] = useAtom<IUserAtom>(userAtom);
  const roomInfo = useAtomValue<IRoomAtom>(roomAtom);
  const [readySet, setReadySet] = useState<number[]>([]);
  const [ruleModal, setRuleModal] = useState(true);
  const [roundModal, setRoundModal] = useState(false);

  // 모달 만들면서 추가한 부분 겹치는거 확인점
  const getGameData = async () => {
    const result = (await getGameInfoApi(roomInfo.room.roomId)) as IGameInfo;
    if (result) {
      setGameRoomInfo(result);
      setPlayerList(result.playerInfos);
      setIsHost(result.hostId === user.memberId);
      // 해당 부분은 api 연결 후 추가 확인 필요.
    }
  };

  // 라운드 변경시 모달창 띄우기
  useEffect(() => {
    setReadySet([]);
    gameRoomInfo &&
      gameRoomInfo.room.currentRound &&
      session &&
      publisher &&
      (sendSignal(`${gameRoomInfo.room.currentRound}`, 'ROUND'),
      setReadySet((prev) => [...prev.filter((v) => v !== user.memberId), user.memberId]));
  }, [gameRoomInfo]);

  useEffect(() => {
    if (data) {
      const gameData = data as IGameInfo;
      setGameRoomInfo(gameData);
      gameData.room.currentRound && setCurrentRound(gameData.room.currentRound);
      gameData.playerInfos && setPlayerList(gameData.playerInfos);
      gameData.hostId && setIsHost(gameData.hostId === user.memberId);
    }
  }, [data]);

  const { session, publisher, streamList, onChangeCameraStatus, onChangeMicStatus, sendSignal } =
    useOpenvidu(user.memberId, currentPath);

  const onChangeChatStatus = (chatStatus: boolean) => {
    setChatStatus(!chatStatus);
  };

  const divRef = useRef<HTMLDivElement>(null);
  const handleSendImage = async () => {
    gameRoomInfo?.room.currentRound && setCurrentRound(gameRoomInfo?.room.currentRound + 1);
    if (
      gameRoomInfo &&
      gameRoomInfo.room.currentRound &&
      (gameRoomInfo.room.currentRound < 1 || gameRoomInfo.room.currentRound > 5)
    ) {
      setCanPlay(false);
      return;
    }
    setRoundModal(true);
    if (!divRef.current) return;

    try {
      if (isHost) {
        const div = divRef.current;
        const canvas = await html2canvas(div, { scale: 1 });
        const gameroom = gameRoomInfo as IGameInfo;

        // flask 쪽 rest api 연결 완료 시 해당 주석 제거 후 api 연결.
        if (gameroom.room.currentRound) {
          const result = await sendRoundInfoApi(
            gameroom.room.roomId,
            canvas.toDataURL(),
            gameroom.room.currentRound,
            gameroom.shapes[gameroom.room.currentRound - 1].shapeId
          );
          if (result) {
            getGameData();
            console.log(result);
          }
        }
        const byteString = atob(canvas.toDataURL().split(',')[1]);

        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([ia], {
          type: 'image/png',
        });
        const padded = String(gameroom.room.roomId);
        const file = new File(
          [blob],
          `${padded.padStart(6, '0')}${gameroom.room.currentRound}.png`
        );

        const formData = new FormData();
        formData.append('captureImage', file);
        if (gameroom.room.currentRound) {
          const imageResult = await sendCaptureImageApi(
            gameroom.room.roomId,
            gameroom.room.currentRound,
            formData
          );
          if (imageResult) {
            if (imageResult.status === 204) {
              console.log('게임 종료!');
              sendSignal(`GAMEEND`, 'GAMEEND');
              setCanPlay(false);
            }
          }
          console.log(imageResult);
          sendSignal(`${gameroom.room.currentRound}`, 'NEXTROUND');
          getGameData();
        }
      }
    } catch (error) {
      console.error('Error converting div to image:', error);
    }
  };

  const receiveSignal = (type: signalType) => {
    if (session && publisher) {
      publisher.stream.session.on('signal:' + type, (e: any) => {
        const result = JSON.parse(e.data);
        console.log(result);
        if (type === 'GAMEEND') {
          console.log('게임종료', result);
          setCanPlay(false);
        } else if (type === 'ROUND') {
          setReadySet((prev) => [...prev.filter((v) => v !== result.userId), result.userId]);
        } else if (type === 'NEXTROUND') {
          getGameData();
        } else if (result) {
          getGameData();
        }
      });
    }
  };
  useEffect(() => {
    session &&
      publisher &&
      (receiveSignal('ROUND'), receiveSignal('NEXTROUND'), receiveSignal('GAMEEND'));
  }, [session, publisher]);

  useEffect(() => {
    getGameData();
  }, [streamList]);

  useEffect(() => {
    console.log(readySet, gameRoomInfo?.playerInfos);
    if (readySet.length === gameRoomInfo?.playerInfos.length) {
      console.log('라운드 타이머 시작!');
      setRoundTimer(10);
      setCanPlay(true);
    }
  }, [readySet]);

  const closeRuleModal = () => {
    setRuleModal(false);
    setRoundModal(true);
    console.log('rule modal 닫기');
  };
  useEffect(() => {
    let timer = setTimeout(closeRuleModal, 7000);
    return () => clearTimeout(timer);
  }, []);

  const closeRoundModal = () => {
    setRoundModal(false);
  };
  useEffect(() => {
    if (roundModal) {
      let timer = setTimeout(closeRoundModal, 3000);
      return () => clearTimeout(timer);
    }
  }, [roundModal]);

  return (
    <Background backgroundType='NOLOBBY' isLobbyDropdown={false}>
      {/* 최종 라운드가 마무리되면 MVP 모달이 나옴 */}
      {gameRoomInfo?.room.roomRound &&
        gameRoomInfo?.room.currentRound === gameRoomInfo.room.roomRound && (
          <MvpModal playerList={gameRoomInfo?.playerInfos}></MvpModal>
        )}
      {/* 라운드가 변할 때마다 roundModal의 상태가 true가 되도록 해야 함 */}
      {/* 라운드 모달(예시 : Round 1) */}
      {currentRound &&
        currentRound >= 1 &&
        currentRound <= 5 &&
        gameRoomInfo &&
        gameRoomInfo.shapes[currentRound - 1] &&
        gameRoomInfo.shapes[currentRound - 1].shapeUrl && (
          <Modal openModal={roundModal} closeModal={closeRoundModal} isSettingModal={false}>
            <div className='flex w-full flex-col justify-center me-2 mt-11 pb-2 font-edisplay text-6xl'>
              <div className='flex justify-center w-full'>
                <span className='text-2xl'>✨</span>
                Round {currentRound}
                <span className='text-3xl'>✨</span>
              </div>
              <div className='flex justify-center items-center mt-11 mb-6 w-full h-48'>
                <div className='flex w-5/12'>
                  <img
                    src={gameRoomInfo?.shapes[currentRound - 1].shapeUrl}
                    className='w-full h-full'
                  />
                </div>
              </div>
            </div>
          </Modal>
        )}
      {/* 주의 사항 모달창 */}
      {/* 게임 페이지로 이동한 후 가장 먼저 나오고 7초 후 자동적으로 사라짐 */}
      <Modal openModal={ruleModal} closeModal={closeRuleModal} isSettingModal={false}>
        <div className='font-kdisplay pt-2 px-2 ms-1 me-4'>
          <div className='w-full text-center mt-3 mb-11 text-5xl animate-bounce'>📢주의사항📢</div>
          <div className='text-3xl ms-1 me-2 mb-2'>
            <div className='mb-5'>
              1. 오른쪽 손목 - 가슴 - 왼쪽 손목이 하나의 선으로 이어져있다 생각해주세요!!
            </div>
            <div className='mb-5'>2. 머리카락이 몸을 가리면 정확도가 떨어져요ㅜㅜ</div>
            <div className='mb-6'>3. 네트워크 환경에 따라 진행 상황이 조금씩 다를 수 있어요😥</div>
          </div>
          <div className='mt-3 mb-5 text-2xl text-[#FA8D8D] text-center'>
            (게임은 7초 뒤 자동적으로 시작해요)
          </div>
        </div>
      </Modal>
      <div className='flex w-full h-full'>
        {/* 참가자 목록 */}
        <div className='justify-start bg-white z-40'>
          {(data as IGameInfo) && playerList && gameRoomInfo && gameRoomInfo.room && (
            <ParticipantsContainer
              type={'GAME'}
              user={user}
              playerList={playerList}
              hostId={gameRoomInfo.hostId}
              currentRound={gameRoomInfo.room.currentRound}
              roomRound={gameRoomInfo.room.roomRound}
              roomType={gameRoomInfo.room.roomType}
            />
          )}
        </div>
        {/* openvidu 화면 */}
        <div className='w-full'>
          {currentRound &&
            currentRound >= 1 &&
            currentRound <= 5 &&
            gameRoomInfo &&
            gameRoomInfo.shapes[currentRound - 1] &&
            gameRoomInfo.shapes[currentRound - 1].shapeUrl && (
              <Board
                currentShapeUrl={gameRoomInfo?.shapes[currentRound - 1].shapeUrl}
                boardType='GAME'
                roundTimer={roundTimer}
                handleSendImage={handleSendImage}
                canPlay={canPlay}
              >
                <header className=' h-fit flex items-center'></header>
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
                              // 화면 크기가 커졌을 때,
                              // 카메라 화면들이 Board 밖으로 나가는 것을 방지하기 위해
                              // xl: h-[17rem] 추가
                              <div className='w-full h-full xl:h-[17rem]' key={idx}>
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
            )}
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
        </div>
        {(data as IRoomAtom) && playerList && roomInfo && roomInfo.room && (
          <ChatContainer
            chatStatus={chatStatus}
            session={session}
            publisher={publisher}
            sendSignal={sendSignal}
            playerList={playerList}
          />
        )}
      </div>
    </Background>
  );
}
