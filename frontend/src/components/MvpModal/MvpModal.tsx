import { useAtom, useAtomValue } from 'jotai';
import { IPlayerInfo, IRoomAtom, roomAtom } from 'stores/room';
import { IUserAtom, playerAtom } from 'stores/user';
import { electMvpApi } from 'apis/gameApi';
import { Heart } from 'react-feather';
import { userAtom } from 'stores/user';

import Modal from '@components/common/Modal';
import { Fragment, useEffect, useState } from 'react';
import ResultModal from '@components/common/ResultModal';
import { resolve } from 'path';
import { rejects } from 'assert';

interface IMvpModalProps {
  playerList: IPlayerInfo[];
}

export default function MvpModal({playerList}: IMvpModalProps) {
  const roomInfo = useAtomValue<IRoomAtom>(roomAtom);
  const [mvpModal, setMvpModal] = useState(false);
  const [gameResultModal, setGameResultModal] = useState(false);
  const [votedId, setVotedId] = useState(0);
  const [user, setUser] = useAtom<IUserAtom>(userAtom);
  const player = playerList.find((player: IPlayerInfo) => {
    return player.playerId === user.memberId;
  })

  let [contentType, setContentType] = useState('ELECT');

  // 시간을 지연시키는 함수
  function delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // MVP를 뽑기 위해 모달창을 엶
  async function openMvpModal(a: boolean): Promise<void> {
    setMvpModal(a);
    console.log('MVP 투표 시작');
  }

  // const onClickNominee = async () => {
  //   const result: any = await electMvpApi(roomId, playerId, votedId)
  //   // playerId와 voteId 보내야 함
  //   console.log('전달 완료', roomInfo.room.roomId, );
  // };

  async function electToLoad(a: string): Promise<void> {
    setContentType(a);
    console.log('로딩중');
  }

  async function loadToMvpResult(a: string): Promise<void> {
    setContentType(a);
    if (player) {
      const result: any = await electMvpApi(roomInfo.room.roomId, player.playerId, votedId)
      console.log('전달 완료', result);
    }
    console.log('MVP 결과 확인');
  }

  async function openAndCloseModal(): Promise<void> {
    try {
      await delay(57000); // 마지막 라운드가 되면 실행되도록
      await openMvpModal(true);
      await delay(7000); // 투표창 7초 동안 대기
      await electToLoad('LOAD');
      await delay(3000); // 로딩창 3초 동안 대기
      await loadToMvpResult('RESULT');
    } catch (error) {
      console.error('오류 발생:', error);
    }
  }

  useEffect(() => {
    openAndCloseModal()
      .then(() => {
        console.log('순차적 과정 진행 완료');
      })
      .catch((error) => {
        console.error('오류 발생:', error);
      });
  }, []);

  // MVP 결과창의 '게임 결과 확인' 버튼을 누르면 게임 결과가 뜸
  const openGameResultModal = () => {
    setGameResultModal(true);
    useEffect(() => {
      setMvpModal(false);
    });
  };

  function repeatChoice(roomInfo: any) {
    let arr = []

    for (let i = 0; i < 2; i++) {
      const onClickChoice = async () => {
        setVotedId(i)
      };

      arr.push(
        <div key={i}>
          <div className='mb-3'>
            <div className='inline-block'>
            <Heart onClick={onClickChoice} size='35' className='text-[#FA8DA3] hover:animate-bounce cursor-pointer' />
            </div>
            <span onClick={onClickChoice} className='text-[#514148] hover:text-[#FA8DA3] text-3xl font-kdisplay ms-3 cursor-pointer'>{roomInfo.playerInfos[i].nickname}</span>
          </div>
        </div>
      )
    }
    return arr;
  }

  function showMvp(roomInfo:any) {
    let arr = [0]
    for (let i = 0; i < 2; i++) {
      if (roomInfo.playerInfos[i].vote >= arr[-1]) {
        arr.push(roomInfo.playerInfos[i].vote)
      }
    }
    const mvpArr = []
    for (let i = 0; i < 2; i++) {
      if (arr[-1] === roomInfo.playerInfos[i].vote) {
        mvpArr.push(
          <div key={i}>
            {roomInfo.playerInfos[i].nickname}
          </div>
        )
      }
    }
    return mvpArr
  }
  return (
    <div className='font-kdisplay'>
      <Modal openModal={mvpModal} closeModal={mvpModal} isSettingModal={false}>
        {contentType === 'ELECT' ? (
          <Fragment>
            <div className='flex justify-center text-5xl mt-9 text-[#514148]'>당신의 MVP에게</div>
            <div className='flex justify-center text-5xl mb-12 text-[#FA8D8D]'><span className='text-[#FA8D8D]'>투표</span>하세요</div>
            {repeatChoice(roomInfo)}
            <div className='flex justify-center text-[#514148] text-2xl mt-12 animate-pulse'>
              🚨7초 후 투료가 마감됩니다🚨
            </div>
          </Fragment>
        ) : contentType === 'LOAD' ? (
          <div className='text-[#514148] text-5xl animate-pulse flex justify-center mt-10'>
            결과 집계 중...
          </div>
        ) : (
          <Fragment>
            <div className='text-5xl flex justify-center my-10 text-[#FA8D8D]'>오늘의 MVP</div>
                <div className='text-4xl flex justify-center pt-5 animate-bounce'>🎊{showMvp(roomInfo)}🎊</div>
            <div className='flex justify-end mt-14 text-xl'>
              <Fragment>
                <button onClick={openGameResultModal}>게임 결과 확인 ➤</button>
                <ResultModal openModal={gameResultModal}></ResultModal>
              </Fragment>
            </div>
          </Fragment>
        )}
      </Modal>
    </div>
  );
}
