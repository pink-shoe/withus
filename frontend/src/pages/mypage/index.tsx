import { useAtom } from 'jotai'; // Import useAtom hook
import { userAtom } from '../../stores/user';
import Container from '@components/common/Container';
import ButtonComponent from '@components/common/ButtonComponent';
import { Link, useNavigate } from '../../router';
import InputComponent from '@components/common/InputComponent';
import { updateMemberApi } from 'apis/memberApi';
import Board from '@components/common/Board';
import Background from '@components/common/Background';

export default function Mypage() {
  const [user, setUser] = useAtom(userAtom); // Access userAtom using useAtom
  const navigate = useNavigate();
  console.log(`닉네임 확인: ${user.nickname}`);

  const onChangeNickname = (data: any) => {
    setUser((prevUser) => ({
      ...prevUser,
      nickname: data.target.value,
    }));
  };

  const onChangeNickName = () => {
    updateMemberApi(user.nickname)
      .then(() => {
        console.log('userInfoUpdateApi 보내는 중!');
        // 닉네임 변경되었다는 모달 띄우기
      })
      .catch((error) => {
        console.error('Error updating nickname:', error);
      });
  };

  const onClickGoLobby = () => {
    navigate('/lobby');
  };

  return (
    <div>
      <Background isLobbyPage={true} isLobbyDropdown={false}>
        <Board boardType='LOBBY'>
          <Container type='isBig'>
            <div className='flex justify-center text-3xl pt-10 font-kdisplay'>회원 정보 관리</div>
            <div className='flex justify-center'>
              <InputComponent
                type='nickname'
                label='변경할 닉네임'
                value={user.nickname} // Access the nickname from the userAtom
                placeholder={user.nickname}
                onChange={onChangeNickname}
              />
            </div>
            <ButtonComponent type='isBig' onClick={onChangeNickName}>
              닉네임 변경하기
            </ButtonComponent>
            <ButtonComponent type='isBig' onClick={onClickGoLobby}>
              로비로 돌아가기
            </ButtonComponent>
            <div className='flex justify-end'>
              <Link
                className='font-kdisplay text-lg text-gray-500 pr-4 pt-8 hover:text-black'
                to='/login'
              >
                회원탈퇴
              </Link>
            </div>
          </Container>
        </Board>
      </Background>
    </div>
  );
}
