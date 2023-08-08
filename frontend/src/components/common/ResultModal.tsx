// 게임 결과를 나타내는 모달창
import React, { Fragment, useState } from 'react';
import Modal from './Modal';

import picture1 from '@src/assets/loopy1.jpg';
import picture2 from '@src/assets/loopy2.jpg';
import picture3 from '@src/assets/loopy3.jpg';
import picture4 from '@src/assets/loopy4.jpg';
import picture5 from '@src/assets/loopy5.jpg';
import answer1 from '@src/assets/answer1.jpg';
import answer2 from '@src/assets/answer2.jpg';
import answer3 from '@src/assets/answer3.jpg';
import answer4 from '@src/assets/answer4.jpg';
import answer5 from '@src/assets/answer5.jpg';

import { useNavigate } from 'react-router-dom';
import { X, Circle } from 'react-feather';

export default function ResultModal() {
  let pictures = [picture1, picture2, picture3, picture4, picture5];
  let answers = [answer1, answer2, answer3, answer4, answer5];
  let results = [100, 0, 100, 0, 100];

  const [modalStatus, setModalStatus] = useState(false);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  // 모달창 여는 기능
  const openModal = () => {
    setModalStatus(true);
  };
  // 모달창 닫는 기능
  const closeModal = () => {
    setModalStatus(false);
  };

  const backToWaiting = () => {
    navigate('/waitingrooms/:id');
  };

  // 종료 버튼 클릭 시
  const onClickFinish = () => {
    if (token != null) {
      // 로그인된 유저면, '/lobby' 페이지로 이동
      navigate('/lobby');
    } else {
      // 게스트면, '/login' 페이지로 이동
      navigate('/login');
    }
  };

  function repeatResult(pictures: any, answers: any, results: any) {
    let arr = [];
    for (let i = 0; i < 5; i++) {
      // 유사도가 50% 미만이면 X 표시
      // 유사도가 50% 이상이면 O 표시
      // 해당 퍼센트는 나중에 수정 가능
      if (results[i] >= 50) {
        arr.push(
          <div className='flex justify-center mb-8' key={i}>
            <span className='me-5'>
              <span className='font-medium font-kdisplay text-2xl'>ROUND {i + 1}</span>
              <div className='text-[#112364] mt-2 flex justify-center'>
                <Circle size='60' />
              </div>
            </span>
            <img className='w-36 h-28 rounded-lg display: inline me-2' src={pictures[i]} />
            <img className='w-36 h-28 rounded-lg display: inline' src={answers[i]} />
          </div>
        );
      } else {
        arr.push(
          <div className='flex justify-center mb-8' key={i}>
            <span className='me-5'>
              <span className='font-medium font-kdisplay text-2xl'>ROUND {i + 1}</span>
              <div className='text-[#F84C4C] flex justify-center'>
                <X size='80' />
              </div>
            </span>
            <img className='w-36 h-28 rounded-lg display: inline me-3' src={pictures[i]} />
            <img className='w-36 h-28 rounded-lg display: inline' src={answers[i]} />
          </div>
        );
      }
    }
    return arr;
  }

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
      <button
        onClick={openModal}
        className='bg-[#FF8DA3] hover:bg-red-500 w-[22rem] h-24 rounded-lg border-4 border-white font-medium font-kdisplay text-3xl text-white'
      >
        게임 결과 확인
      </button>
      <Modal openModal={modalStatus} closeModal={closeModal} isSettingModal={false}>
        <div className='text-center text-[#514148] font-medium font-kdisplay text-4xl mt-5 mb-10'>
          🏆게임결과🏆
        </div>
        <div className='overflow-y-auto h-96'>{repeatResult(pictures, answers, results)}</div>
        {/* <div className='flex justify-center mt-8'>
          <button onClick={backToWaiting} className='bg-[#8D98FF] hover:bg-violet-700 rounded-lg w-1/3 h-11 me-2 p-1 font-kdisplay text-2xl text-white'>
            대기실 이동
          </button>
          <button onClick={onClickFinish} className='bg-[#FF8D8D] hover:bg-red-500 rounded-lg w-1/4 h-11 ms-2 p-1 font-kdisplay text-2xl text-white'>
            종료
          </button>
        </div> */}
        <div>{resultButton()}</div>
      </Modal>
    </Fragment>
  );
}
