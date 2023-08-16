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
// import ExceptionModal from '@components/common/ExceptionModal';

export default function GameRoom() {
  const location = useLocation();
  const currentPath = Number(
    location.pathname.slice(location.pathname.lastIndexOf('/') + 1, location.pathname.length)
  );
  const navigate = useNavigate();
  const [roundTimer, setRoundTimer] = useState<number>(0);
  const [canStart, setCanStart] = useState<boolean>(false);
  const [gameRoomInfo, setGameRoomInfo] = useState<IGameInfo>();
  const [currentRound, setCurrentRound] = useState(gameRoomInfo?.room.currentRound);
  // const [remainingTime, setRemainingTime] = useState(3);
  // const [isProblemModal, setIsProblemModal] = useState(false);
  const [isHost, setIsHost] = useState<boolean>(false);
  const [chatStatus, setChatStatus] = useState<boolean>(true);
  const [playerList, setPlayerList] = useState<IPlayerInfo[]>([]);
  const { data } = useQuery(['games/info'], () => getGameInfoApi(roomInfo.room.roomId));
  const [user, setUser] = useAtom<IUserAtom>(userAtom);
  const roomInfo = useAtomValue<IRoomAtom>(roomAtom);
  const readySet = new Set();

  // 모달 만들면서 추가한 부분 겹치는거 확인점
  const getGameData = async () => {
    const result = (await getGameInfoApi(roomInfo.room.roomId)) as IGameInfo;
    if (result) {
      readySet.clear();
      setGameRoomInfo(result);
      setCurrentRound(result.room.currentRound);
      setPlayerList(result.playerInfos);
      setIsHost(result.hostId === user.memberId);
      // 해당 부분은 api 연결 후 추가 확인 필요.
      if (result.room.currentRound - 1 === result.room.roomRound)
        await getGameResultApi(result.room.roomId);
    }
  };

  // 라운드 변경시 모달창 띄우기
  useEffect(() => {
    console.log('aaaaa,', currentRound);
    currentRound && session && publisher && sendSignal(`${currentRound}`, 'ROUND');
  }, [currentRound]);
  // useEffect(() => {
  //   if (gameRoomInfo?.room.currentRound) {
  //     function fetchData() {
  //       // if (gameRoomInfo?.room.currentRound === 1) {
  //       setRoundModal(true);
  //       sendSignal(`${gameRoomInfo?.room.currentRound}`, 'ROUND');
  //       // await new Promise((resolve) => setTimeout(resolve, 7000));
  //       // }

  //       // let timeoutId: NodeJS.Timeout;
  //       // setIsProblemModal(true);

  //       // if (isProblemModal) {
  //       //   setRemainingTime(3);
  //       //   // sendSignal(`${gameRoomInfo?.room.currentRound}`, 'ROUND');

  //       //   timeoutId = setTimeout(() => {
  //       //     const updatedTime = remainingTime - 1;
  //       //     setRemainingTime(updatedTime);

  //       //     if (updatedTime > 0) {
  //       //       timeoutId = setTimeout(() => {
  //       //         setRemainingTime(updatedTime - 1);
  //       //       }, 1000);
  //       //     } else {
  //       //       // 시간이 다 되면 모달 닫기
  //       //       setIsProblemModal(false);
  //       //     }
  //       //   }, 1000);
  //       // }
  //     }

  //     fetchData();
  //   }
  // }, [gameRoomInfo?.room.currentRound]);

  useEffect(() => {
    if (data) {
      const gameData = data as IGameInfo;
      setGameRoomInfo(gameData);
      gameData.room.currentRound && setCurrentRound(gameData.room.currentRound);
      gameData.playerInfos && setPlayerList(gameData.playerInfos);
      gameData.hostId && setIsHost(gameData.hostId === user.memberId);
      // gameData.shapes.shapeUrl && setShapeURL(gameData.shapes.shapeUrl);
    }
  }, [data]);

  const { session, publisher, streamList, onChangeCameraStatus, onChangeMicStatus, sendSignal } =
    useOpenvidu(user.memberId, currentPath);

  const onChangeChatStatus = (chatStatus: boolean) => {
    setChatStatus(!chatStatus);
  };

  const divRef = useRef<HTMLDivElement>(null);
  const handleSendImage = async () => {
    if (!divRef.current) return;

    try {
      const div = divRef.current;
      const canvas = await html2canvas(div, { scale: 1 });
      const gameroom = gameRoomInfo as IGameInfo;

      // flask 쪽 rest api 연결 완료 시 해당 주석 제거 후 api 연결.
      if (currentRound) {
        const result = await sendRoundInfoApi(
          gameroom.room.roomId,
          canvas.toDataURL(),
          currentRound,
          gameroom.shapes[currentRound - 1].shapeId
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
      const file = new File([blob], `${padded.padStart(6, '0')}${currentRound}.png`);

      const formData = new FormData();
      formData.append('captureImage', file);
      if (currentRound) {
        const imageResult = await sendCaptureImageApi(gameroom.room.roomId, currentRound, formData);
        if (imageResult) {
          console.log(imageResult);
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
        if (result) {
          getGameData();
        }
        if (type === 'ROUND') {
          readySet.add(result.userId);
          console.log('readySet', readySet);
        }
      });
    }
  };
  useEffect(() => {
    session && publisher && receiveSignal('ROUND');
  }, [session, publisher]);

  useEffect(() => {
    getGameData();
  }, [streamList]);

  useEffect(() => {
    if (readySet.size === gameRoomInfo?.playerInfos.length) {
      closeRoundModal();
    }
  }, [readySet]);

  const [ruleModal, setRuleModal] = useState(true);
  const [roundModal, setRoundModal] = useState(false);

  const closeRuleModal = () => {
    setRuleModal(false);
    console.log('rule modal 닫기');
    setRoundModal(true);
    console.log('roundmodal 열기');
  };
  // setTimeout(closeRuleModal, 7000);
  useEffect(() => {
    let timer = setTimeout(closeRuleModal, 7000);
    return () => clearTimeout(timer);
  }, []);

  const closeRoundModal = () => {
    setRoundModal(false);
    console.log('round modal 닫기', '7초 세팅');
    setRoundTimer(7);
  };
  useEffect(() => {
    let timer = setTimeout(closeRoundModal, 7000);
    return () => clearTimeout(timer);
  }, [roundModal]);

  // setTimeout(closeRoundModal, 10000);

  return (
    <Background backgroundType='NOLOBBY' isLobbyDropdown={false}>
      {/* 최종 라운드가 마무리되면 MVP 모달이 나옴 */}
      {gameRoomInfo?.playerInfos &&
        gameRoomInfo?.room.currentRound === gameRoomInfo.room.roomRound && (
          <MvpModal playerList={gameRoomInfo?.playerInfos}></MvpModal>
        )}

      {/* 라운드가 변할 때마다 roundModal의 상태가 true가 되도록 해야 함 */}
      {/* 라운드 모달(예시 : Round 1) */}
      <Modal openModal={roundModal} closeModal={closeRoundModal} isSettingModal={false}>
        <div className='flex justify-center me-2 mt-11 pb-2 font-edisplay text-6xl'>
          <span className='text-2xl'>✨</span>
          Round {currentRound}
          <span className='text-3xl'>✨</span>
        </div>
      </Modal>
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
            <div className='mb-5'>3. 네트워크 환경에 따라 진행 상황이 조금씩 다를 수 있어요😥</div>
          </div>
          <div className='mt-3 mb-5 text-2xl text-[#FA8D8D] text-center'>
            (게임은 7초 뒤 자동적으로 시작해요)
          </div>
        </div>
      </Modal>
      <div className='flex w-full h-full'>
        {/* 라운드마다 문제 나오는 모달창 */}
        {/* {isProblemModal && (
          <Modal openModal={isProblemModal} isSettingModal={false}>
            <div className='animate-shake'>
              <p className='text-[#514148] font-kdisplay font-medium text-4xl mb-10 text-center'>
                {roomInfo.room.roomRound}라운드 문제
              </p>
              <div className='flex mb-7 w-48 h-48 border-2 border-[#8D98FF]'>
                <img src={shapeURL} />
              </div>
              <p className='text-[#514148] font-kdisplay font-medium text-2xl mb-10 text-center'>
                게임 시작
                <span className='text-blue-500 font-medium text-4xl'>{remainingTime}</span>초 전
              </p>
            </div>
          </Modal>
        )} */}
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
          <Board boardType='GAME' roundTimer={roundTimer} handleSendImage={handleSendImage}>
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
          {/* 인원이 4명 미만이 되면 게임 종료 */}
          {/* {roomInfo.playerInfos.length < 0 ? (
            <ExceptionModal
              message={'인원이 4명 미만으로 게임이 종료됩니다.'}
              // openModal={true}
            ></ExceptionModal>
          ) : (
            <></>
          )} */}
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
          {/* <button onClick={handleSendImage}>다운로드</button> */}
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
