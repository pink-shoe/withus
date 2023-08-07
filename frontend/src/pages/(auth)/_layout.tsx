import React, { useState } from 'react';
import { useAtom } from 'jotai';
import Tutorial from '@components/login/Tutorial';
import GuestLogin from '@components/login/GuestLogin';
import Login from '@components/login/Login';
import { userAtom } from '../../stores/user';
import { useNavigate } from 'react-router-dom';
import Background from '@components/common/Background';
import Board from '@components/common/Board';
import Container from '@components/common/Container';

export default function Layout() {
  // Atom 값과 상태 업데이트 함수 가져오기
  const [{ email, nickname }, setUser] = useAtom(userAtom);
  const [enterCode, setEnterCode] = useState('');
  const [emailPassword, setEmailPassword] = useState('');
  const [showLoginForm, setShowLoginForm] = useState(false);
  const navigate = useNavigate();

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(`토큰 있음: ${token}`);
    if (token) {
      // 토큰이 있으면, "/lobby" 페이지로 이동
      navigate('/lobby');
    }
  }, []);

  function onChangeEnterCode(event: React.ChangeEvent<HTMLInputElement>) {
    setEnterCode(event.target.value);
  }

  function onClickGuestLogin() {
    setUser((prev) => ({ ...prev, nickname: nickname }));
    console.log('Nickname:', nickname);
    console.log('Enter Code:', enterCode);
    // 게스트는 로비로 보내지 않고 바로 방으로 갈 수 있도록 변경할거임. --------- 게스트 로그인 api 로 가서 서버로 부터 받아오고 정리 아직 미정 --------
  }

  return (
    <Background isLobbyPage={false}>
      <Board boardType={'LOBBY'}>
        <div className='flex flex-col justify-center'>
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-center'>
            {showLoginForm ? (
              <Container>
                <div className='flex justify-around'>
                  <button
                    className='bg-[#FF8D8D] rounded-tl-md w-48 h-8'
                    onClick={() => setShowLoginForm(false)}
                  >
                    <div className='font-kdisplay text-black hover:text-white'> 게스트 </div>
                  </button>
                  <button
                    className='bg-white w-48 h-8 rounded-md'
                    onClick={() => setShowLoginForm(true)}
                  >
                    <div className='font-kdisplay text-black'> 로그인 </div>
                  </button>
                </div>
                <Login />
              </Container>
            ) : (
              <Container>
                <div className='flex justify-around'>
                  <button
                    className='bg-white w-48 h-8 rounded-md'
                    onClick={() => setShowLoginForm(false)}
                  >
                    <div className='font-kdisplay text-black'> 게스트 </div>
                  </button>
                  <button
                    className='bg-[#FF8D8D] rounded-tr-md w-48 h-8'
                    onClick={() => setShowLoginForm(true)}
                  >
                    <div className='font-kdisplay text-black hover:text-white'> 로그인 </div>
                  </button>
                </div>
                <GuestLogin
                  enterCode={enterCode}
                  onChangeEnterCode={onChangeEnterCode}
                  onClickGuestLogin={onClickGuestLogin}
                />
              </Container>
            )}

            <Tutorial />
          </div>
        </div>
      </Board>
    </Background>
  );
}
