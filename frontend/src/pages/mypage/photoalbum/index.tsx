import { useState, useEffect } from 'react';
import PhotoAlbum from '@components/photoAlbum/PhotoAlbum';
import Board from '@components/common/Board';
import AlbumBG from '@components/common/AlbumBG';
import { useNavigate } from '../../../router';
import { getMemberApi } from 'apis/memberApi';
import { userAtom } from 'stores/user';
import { useAtom } from 'jotai';

export default function MypageAlbum() {
  const [photoFrameNumber, setPhotoFrameNumber] = useState(1);
  const [backgroundNumber, setBackgroundNumber] = useState(1);
  const [user, setUser] = useAtom(userAtom);
  const navigate = useNavigate();
  const [fourCut, setFourCut] = useState(false);

  // 비정상적인 접근 차단 & 새로고침마다 유저 정보 재확인
  useEffect(() => {
    const accessToken = sessionStorage.getItem('accessToken');
    if (!accessToken) {
      navigate('/login');
    } else {
      getMemberApi(setUser).catch((error) => {
        console.log('Error fetching data:', error);
      });
    }
  }, []);

  useEffect(() => {
    if (fourCut === undefined) {
      setFourCut(false);
    }
  }, [fourCut]);

  return (
    <div>
      <AlbumBG
        onChangePhotoFrame={setPhotoFrameNumber}
        onChangeBackground={setBackgroundNumber}
        setFourCut={setFourCut}
        fourCut={fourCut}
      >
        <Board boardType='ALBUM'>
          <PhotoAlbum
            photoFrameNumber={photoFrameNumber}
            backgroundNumber={backgroundNumber}
            fourCut={fourCut}
            setFourCut={setFourCut}
          />
        </Board>
      </AlbumBG>
    </div>
  );
}
