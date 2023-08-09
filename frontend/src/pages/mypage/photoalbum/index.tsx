import { useState } from 'react';
import PhotoAlbum from '@components/photoAlbum/PhotoAlbum';
import Board from '@components/common/Board';
import AlbumBG from '@components/common/AlbumBG';

export default function MypageAlbum() {
  const [photoFrameNumber, setPhotoFrameNumber] = useState(1);
  const [backgroundNumber, setBackgroundNumber] = useState(1);

  return (
    <div>
      <AlbumBG onChangePhotoFrame={setPhotoFrameNumber} onChangeBackground={setBackgroundNumber}>
        <Board boardType='ALBUM'>
          <PhotoAlbum photoFrameNumber={photoFrameNumber} backgroundNumber={backgroundNumber} />
        </Board>
      </AlbumBG>
    </div>
  );
}
