// 게임 결과를 나타내는 모달창
import { Fragment, useState, useEffect } from 'react';
import Modal from './Modal';
import { useAtomValue } from 'jotai';
import { IRoomAtom } from 'stores/room';

import { useNavigate } from 'react-router-dom';
import { X, Circle } from 'react-feather';
import { ITotalGameResult, getGameResultApi } from 'apis/gameApi';
import { roomAtom } from 'stores/room';
import { exitRoomApi, participateRoomApi } from 'apis/roomApi';
import { signalType } from 'hooks/useOpenvidu';

interface IResultModalProps {
  openModal: any;
  sendSignal: (message: string, type: signalType) => void;
}

export default function ResultModal({ openModal, sendSignal }: IResultModalProps) {
  const roomInfo = useAtomValue<IRoomAtom>(roomAtom);
  const [resultData, setResultData] = useState<ITotalGameResult[]>([]);
  const token = sessionStorage.getItem('token');
  const navigate = useNavigate();

  const getResultData = async () => {
    const result = await getGameResultApi(roomInfo.room.roomId);
    if (result) setResultData(result);
  };
  useEffect(() => {
    openModal && getResultData();
  }, [openModal]);

  const backToWaiting = async () => {
    const result: any = await participateRoomApi(roomInfo.room.roomCode);
    if (result.status === 200) navigate(`/waitingrooms/${roomInfo.room.roomCode}`);
  };

  // 종료 버튼 클릭 시
  const onClickFinish = async () => {
    const result: any = await exitRoomApi(roomInfo.room.roomId);
    if (result.status <= 300) {
      sendSignal(`${roomInfo.room.roomCode}`, 'EXIT');
      if (token != null) {
        // 로그인된 유저면, '/lobby' 페이지로 이동
        navigate('/lobby');
      } else {
        // 게스트면, '/login' 페이지로 이동
        navigate('/login');
      }
    }
  };

  // 토큰이 있냐 없냐(로그인 여부)에 따라 대기실 버튼 유무가 달라짐
  function resultButton() {
    let buttons = [];
    // 토큰이 있다면 '대기실 이동' 버튼이 있음
    {
      if (token != null) {
        buttons.push(
          <div className='flex justify-center mt-8' key={'twoButtons'}>
            <button
              onClick={backToWaiting}
              className='bg-[#8D98FF] hover:bg-violet-700 rounded-lg w-1/3 h-11 me-2 p-1 font-kdisplay text-2xl text-white'
            >
              대기실 이동
            </button>
            {/* 로비 또는 로그인 페이지로 이동 */}
            <button
              onClick={onClickFinish}
              className='bg-[#FF8D8D] hover:bg-red-500 rounded-lg w-1/4 h-11 ms-2 p-1 font-kdisplay text-2xl text-white'
            >
              종료
            </button>
          </div>
        );
        // 토큰이 없다면 '대기실 이동' 버튼이 없음
      } else {
        buttons.push(
          <div className='flex justify-center mt-8' key={'oneButton'}>
            <button
              onClick={onClickFinish}
              className='bg-[#FF8D8D] hover:bg-red-500 rounded-lg w-1/3 h-14 ms-2 p-1 font-kdisplay text-2xl text-white'
            >
              종료
            </button>
          </div>
        );
      }
    }
    return buttons;
  }

  return (
    <Fragment>
      <Modal openModal={openModal} isSettingModal={false}>
        <div className='text-center text-[#514148] font-medium font-kdisplay text-5xl mt-5 mb-10'>
          🏆게임결과🏆
        </div>
        <div className='overflow-y-auto h-96'>
          {resultData &&
            resultData.map((result, i) => (
              <div className='flex justify-center' key={i}>
                <span className='me-5'>
                  <span className='font-medium font-kdisplay text-2xl whitespace-nowrap'>
                    ROUND {result.gameResult.round}
                  </span>
                  {result.gameResult.correct ? (
                    <div className=' text-[#112364] mt-2 flex justify-center'>
                      <Circle size='60' className='z-10' />
                    </div>
                  ) : (
                    <div className='text-[#F84C4C] flex justify-center'>
                      <X size='80' className='z-10' />
                    </div>
                  )}
                  <div className='relative top-20 left-[0.38rem]'>
                    <img src={result.answerUrl} className='w-20 h-20' />
                  </div>
                </span>
                {result.captureUrl && (
                  <img
                    className='w-36 h-28 rounded-lg display: inline me-2'
                    src={result.captureUrl}
                  />
                )}
                <img
                  className='w-36 h-28 rounded-lg display: inline'
                  src={result.predictionShape.shapeUrl}
                />
              </div>
            ))}
        </div>
        <div>{resultButton()}</div>
      </Modal>
    </Fragment>
  );
}
