import { useEffect, useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import saveAs from 'file-saver';
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
import EndGameModal from '@components/common/EndGameModal';
import Modal from '@components/common/Modal';
import MvpModal from '@components/MvpModal/MvpModal';

export default function GameRoom() {
  const location = useLocation();
  const currentPath = Number(
    location.pathname.slice(location.pathname.lastIndexOf('/') + 1, location.pathname.length)
  );
  const navigate = useNavigate();

  const [user, setUser] = useAtom<IUserAtom>(userAtom);
  const roomInfo = useAtomValue<IRoomAtom>(roomAtom);
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

  useEffect(() => {
    if (data) {
      const gameData = data as IGameInfo;
      setGameRoomInfo(gameData);
      gameData.playerInfos && setPlayerList(gameData.playerInfos);
      gameData.hostId && setIsHost(gameData.hostId === user.memberId);
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

  const [ruleModal, setRuleModal] = useState(true);
  const [roundModal, setRoundModal] = useState(true);

  const closeRuleModal = () => {
    setRuleModal(false);
  };
  setTimeout(closeRuleModal, 7000);

  const closeRoundModal = () => {
    setRoundModal(false);
  };
  setTimeout(closeRoundModal, 10000);

  return (
    <Background backgroundType='NOLOBBY' isLobbyDropdown={false}>
      {/* 최종 라운드가 마무리되면 MVP 모달이 나옴 */}
      {/* {gameRoomInfo?.currentRound === roomInfo.room.roomRound ? (<MvpModal></MvpModal>) : (null)} */}

      <MvpModal></MvpModal>

      {/* 라운드가 변할 때마다 roundModal의 상태가 true가 되도록 해야 함 */}
      {/* 라운드 모달(예시 : Round 1) */}
      <Modal openModal={roundModal} closeModal={closeRoundModal} isSettingModal={false}>
        <div className='flex justify-center me-2 mt-11 pb-2 font-edisplay text-6xl'>
          <span className='text-2xl'>✨</span>
          Round {gameRoomInfo?.currentRound}
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
          {roomInfo.playerInfos.length < 0 ? (
            <EndGameModal endReason='NOPLAYER' openModal={true}></EndGameModal>
          ) : (
            <></>
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
