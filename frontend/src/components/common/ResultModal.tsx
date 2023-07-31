// 결과를 나타내는 모달창
// 현재 진행 중
import { Fragment, useState } from 'react';
import Modal from './Modal';
import picture1 from '@src/assets/loopy1.jpg'
import picture2 from '@src/assets/loopy2.jpg'
import picture3 from '@src/assets/loopy3.jpg'
import picture4 from '@src/assets/loopy4.jpg'
import picture5 from '@src/assets/loopy5.jpg'
import answer1 from '@src/assets/answer1.jpg'
import answer2 from '@src/assets/answer2.jpg'
import answer3 from '@src/assets/answer3.jpg'
import answer4 from '@src/assets/answer4.jpg'
import answer5 from '@src/assets/answer5.jpg'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-regular-svg-icons';
export default function ResultModal() {
  let pictures = [picture1, picture2, picture3, picture4, picture5];
  let answers = [answer1, answer2, answer3, answer4, answer5];
  let results = [100, 0, 100, 0, 100]

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
          <div className='flex justify-center mb-5'>
            <span className='me-5'>
              <span className='font-semibold text-xl'>ROUND {i + 1}</span>
              <div className='text-center text-indigo-900 text-2xl mt-2'><FontAwesomeIcon icon={faCircle} size="2xl" /></div>
            </span>
            <img key={i + 5} className='w-36 h-28 rounded-lg display: inline me-2 border-solid border-4 border-indigo-900' src={pictures[i]} />
            <img key={i + 10} className='w-36 h-28 rounded-lg display: inline border-solid border-4 border-indigo-900' src={answers[i]} />
          </div>
        )
      } else {
        arr.push(
          <div className='flex justify-center mb-5'>
            <span className='me-5'>
              <span className='font-semibold text-xl'>ROUND {i + 1}</span>
              <div className='text-center text-red-600 text-2xl mt-2'><FontAwesomeIcon icon={faX} size="2xl" /></div>
            </span>
            <img key={i + 5} className='w-36 h-28 rounded-lg display: inline me-3 border-solid border-4 border-red-600' src={pictures[i]} />
            <img key={i + 10} className='w-36 h-28 rounded-lg display: inline border-solid border-4 border-red-600' src={answers[i]} />
          </div>
        )
      }
    }
    return arr;
  };

  return (
    <Fragment>
      <button onClick={openModal} className='bg-violet-800 hover:bg-indigo-950 w-60 h-10 rounded-md font-semibold text-lg text-white'>게임 결과</button>
      <Modal openModal={modalStatus} closeModal={closeModal}>
        <div className='text-center text-indigo-900 font-bold text-3xl mb-10'>🏆게임결과🏆</div>
        <div className='overflow-y-auto h-96'>
          {repeatResult(pictures, answers, results)}
        </div>
        <div className='flex justify-center mt-5'>
          <button className='bg-green-600 hover:bg-green-700 rounded-lg w-1/4 me-2 p-1 font-semibold text-lg text-white'>대기실 이동</button>
          {/* 로비로 이동 */}
          <button className='bg-red-600 hover:bg-red-800 rounded-lg w-1/5 ms-2 p-1 font-semibold text-lg text-white'><Link to='/lobby'>종료</Link></button>
        </div>
      </Modal>
    </Fragment>
  )
}