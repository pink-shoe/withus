import React, { useEffect } from 'react';
import { useAtom } from 'jotai'; // Import useAtom hook
import { userAtom } from '../../stores/index';
import Logo from '@components/common/Logo';
import Container from '@components/common/Container';
import ButtonComponent from '@components/common/ButtonComponent';
import { myPageUpdateApi } from 'apis/myPageUpdateApi';
import { Link } from '../../router';
import InputComponent from '@components/common/InputComponent';

export default function Mypage() {
  const [user, setUser] = useAtom(userAtom); // Access userAtom using useAtom

  console.log(`닉네임 확인: ${user.nickname}`);

  const onChangeNickname = (data: any) => {
    setUser((prevUser) => ({
      ...prevUser,
      nickname: data.target.value,
    }));
  };

  const onChangeNickName = () => {
    myPageUpdateApi(user.nickname)
      .then(() => {
        console.log('myPageUpdateApi 성공!');
        // 닉네임 변경되었다는 모달 띄우기
      })
      .catch((error) => {
        console.error('Error updating nickname:', error);
      });
  };

  return (
    <div>
      <Logo />
      <Container>
        <p>마이 페이지</p>
        <InputComponent
          type='text'
          label='변경할 닉네임'
          value={user.nickname} // Access the nickname from the userAtom
          placeholder={user.nickname} // Access the nickname from the userAtom
          onChange={onChangeNickname}
        />
        <ButtonComponent onClick={onChangeNickName}> 닉네임 변경하기</ButtonComponent>
        <Link to='/mypage/photoalbum'> 사진첩으로 이동 </Link>
      </Container>
    </div>
  );
}
