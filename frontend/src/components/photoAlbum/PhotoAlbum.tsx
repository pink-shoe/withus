import { useState, useEffect } from 'react';
import AlbumFrame from './AlbumFrame';
import PaginationContainer from '@components/Pagination/PaginationContainer';
// import { getAlbumListApi } from 'apis/albumApi';

interface IPhotoAlbumProps {
  photoFrameNumber: number;
  backgroundNumber: number;
}

export default function PhotoAlbum({ photoFrameNumber, backgroundNumber }: IPhotoAlbumProps) {
  const images = [
    { imgId: 1, imgUrl: '/src/assets/albumbackground1.jpg', savedAt: 'test1' },
    { imgId: 2, imgUrl: '/src/assets/albumbackground2.jpg', savedAt: 'test2' },
    { imgId: 3, imgUrl: '/src/assets/albumbackground3.jpg', savedAt: 'test3' },
    { imgId: 3, imgUrl: '/src/assets/albumbackground4.jpg', savedAt: 'test4' },
  ];
  const BackGroundURLs = [
    '/src/assets/albumbackground1.jpg',
    '/src/assets/albumbackground1.jpg',
    '/src/assets/albumbackground2.jpg',
    '/src/assets/albumbackground3.jpg',
    '/src/assets/albumbackground4.jpg',
    '/src/assets/albumbackground4.jpg',
  ];
  const [BackGroundURL, setBackGroundURL] = useState(BackGroundURLs[backgroundNumber]);
  const imagesPerPage = 4; // 한 페이지에 보여줄 이미지 개수
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setBackGroundURL(BackGroundURLs[backgroundNumber]);
  }, [backgroundNumber]);

  // useEffect(() => {
  //   const fetchImages = async () => {
  //     try {
  //       const response = await getAlbumListApi();
  //       setImages(response); // 가져온 이미지 객체(아이디, 주소, 저장날짜)를 images 배열에 저장
  //     } catch (error) {
  //       console.error('이미지 저장 실패');
  //     }
  //   };
  //   fetchImages();
  // }, []);

  // 현재 페이지에 보여줄 이미지들을 계산하는 함수
  const getDisplayedImages = () => {
    const startIndex = (currentPage - 1) * imagesPerPage;
    const endIndex = startIndex + imagesPerPage;
    const displayedImages = images.slice(startIndex, endIndex).map((image) => image.imgUrl);
    return displayedImages;
  };

  const onClickPage = (page: number) => {
    setCurrentPage(page);
  };

  // 한 줄에 4개씩 이미지 배치하기 위해 grid 레이아웃 사용
  return (
    <div className='w-full h-full'>
      <AlbumFrame
        DisplayedImages={getDisplayedImages()}
        BackgroundURL={BackGroundURL}
        photoFrameNumber={photoFrameNumber}
      />
      <PaginationContainer currentPage={currentPage} onClickPage={onClickPage} images={images} />
    </div>
  );
}
