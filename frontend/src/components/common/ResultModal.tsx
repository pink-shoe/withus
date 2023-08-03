// 결과를 나타내는 모달창
// 현재 진행 중
import { Fragment, useState } from 'react';
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
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-regular-svg-icons';
export default function ResultModal() {
  let pictures = [picture1, picture2, picture3, picture4, picture5];
  let answers = [answer1, answer2, answer3, answer4, answer5];
  let results = [100, 0, 100, 0, 100];

  const [modalStatus, setModalStatus] = useState(false);

  // 모달창 여는 기능
  const openModal = () => {
    setModalStatus(true);
  };
  // 모달창 닫는 기능
  const closeModal = () => {
    setModalStatus(false);
  };

  function repeatResult(pictures: any, answers: any, results: any) {
    let arr = [];
    for (let i = 0; i < 5; i++) {
      // 유사도가 50% 미만이면 X 표시
      // 유사도가 50% 이상이면 O 표시
      if (results[i] >= 50) {
        arr.push(
          <div className='flex justify-center mb-8' key={i}>
            <span className='me-5'>
              <span className='font-medium font-kdisplay text-2xl'>ROUND {i + 1}</span>
              <div className='text-center text-[#112364] text-3xl mt-2'>
                <FontAwesomeIcon icon={faCircle} size='2xl' />
              </div>
            </span>
            <img
              className='w-36 h-28 rounded-lg display: inline me-2'
              src={pictures[i]}
            />
            <img
              className='w-36 h-28 rounded-lg display: inline'
              src={answers[i]}
            />
          </div>
        );
      } else {
        arr.push(
          <div className='flex justify-center mb-8' key={i}>
            <span className='me-5'>
              <span className='font-medium font-kdisplay text-2xl'>ROUND {i + 1}</span>
              <div className='text-center text-[#F84C4C] text-3xl mt-2'>
                <FontAwesomeIcon icon={faX} size='2xl' />
              </div>
            </span>
            <img
              className='w-36 h-28 rounded-lg display: inline me-3'
              src={pictures[i]}
            />
            <img
              className='w-36 h-28 rounded-lg display: inline'
              src={answers[i]}
            />
          </div>
        );
      }
    }
    return arr;
  }

  return (
    <Fragment>
      <button
        onClick={openModal}
        className='bg-[#FF8DA3] hover:bg-red-500 w-[22rem] h-24 rounded-lg border-4 border-white font-medium font-kdisplay text-3xl text-white'
      >
        게임 결과 확인
      </button>
      <Modal openModal={modalStatus} closeModal={closeModal}>
        <div className='text-center text-[#514148] font-medium font-kdisplay text-4xl mb-10'>🏆게임결과🏆</div>
        <div className='overflow-y-auto h-96'>{repeatResult(pictures, answers, results)}</div>
        <div className='flex justify-center mt-8'>
          <button className='bg-[#8D98FF] hover:bg-violet-700 rounded-lg w-1/3 h-11 me-2 p-1 font-kdisplay text-2xl text-white'>
            대기실 이동
          </button>
          {/* 로비로 이동 */}
          <button className='bg-[#FF8D8D] hover:bg-red-500 rounded-lg w-1/4 h-11 ms-2 p-1 font-kdisplay text-2xl text-white'>
            <Link to='/lobby'>종료</Link>
          </button>
        </div>
      </Modal>
    </Fragment>
  );
}
