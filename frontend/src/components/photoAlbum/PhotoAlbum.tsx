import { useState, useEffect } from 'react';
import AlbumFrame from './AlbumFrame';
import PaginationContainer from '@components/Pagination/PaginationContainer';
import { getAlbumListApi, deleteAlbumApi } from 'apis/albumApi';

interface IPhotoAlbumProps {
  photoFrameNumber: number;
  backgroundNumber: number;
  fourCut: boolean;
  setFourCut: React.Dispatch<React.SetStateAction<boolean>>;
}

interface Image {
  imgId: number;
  imgUrl: string;
  savedAt: string;
}

export default function PhotoAlbum({
  photoFrameNumber,
  backgroundNumber,
  fourCut,
  setFourCut,
}: IPhotoAlbumProps) {
  const BackGroundURLs = ['/BG1.jpg', '/BG2.jpg', '/BG3.jpeg', '/BG4.jpg', '/BG5.jpg', ''];
  const [BackGroundURL, setBackGroundURL] = useState(BackGroundURLs[backgroundNumber]);
  const size = 4; // 한 페이지에 보여줄 이미지 개수
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedImages, setDisplayedImages] = useState<Array<Image>>([]);
  const [totalPages, setTotalPages] = useState(0); // 총 페이지 수

  async function AlbumList(page: number, size: number) {
    try {
      const response = await getAlbumListApi(page - 1, size);
      setDisplayedImages(response.content);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error('앨범 목록 조회 실패:');
    }
  }

  const onclickX = async (img_id: string) => {
    console.log(`이미지 아이디: ${img_id}`);
    await deleteAlbumApi(img_id);
    AlbumList(currentPage, size);
  };

  useEffect(() => {
    AlbumList(currentPage, size);
  }, [currentPage]);

  useEffect(() => {
    setBackGroundURL(BackGroundURLs[backgroundNumber]);
  }, [backgroundNumber]);

  const onClickPage = (page: number) => {
    setCurrentPage(page);
  };

  // 한 줄에 4개씩 이미지 배치하기 위해 grid 레이아웃 사용
  return (
    <div className='w-full h-full'>
      <AlbumFrame
        BackgroundURL={BackGroundURL}
        photoFrameNumber={photoFrameNumber}
        DisplayedImages={displayedImages}
        onClickX={onclickX}
        fourCut={fourCut}
        setFourCut={setFourCut}
      />
      <div className='relative z-10'>
        <PaginationContainer
          currentPage={currentPage}
          onClickPage={onClickPage}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
}
