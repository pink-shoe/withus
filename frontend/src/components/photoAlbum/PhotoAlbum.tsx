import { useState, useEffect } from 'react';
import ButtonComponent from '@components/common/ButtonComponent';
import AlbumFrame from './AlbumFrame';
import { album } from '../../apis/album';
import PaginationContainer from '@components/Pagination/PaginationContainer';

export default function PhotoAlbum() {
  const [images, setImages] = useState<{ imgId: number; imgUrl: string; savedAt: string }[]>([]);
  const [contentNumber, setContentNumber] = useState(1);
  const BackGroundURLs = [
    '/src/assets/albumbackground1.jpg',
    '/src/assets/albumbackground2.jpg',
    '/src/assets/albumbackground3.jpg',
    '/src/assets/albumbackground4.jpg',
    '/src/assets/albumbackground5.jpg',
  ];
  const [BackGroundURL, setBackGroundURL] = useState(BackGroundURLs[0]);
  const imagesPerPage = 4; // 한 페이지에 보여줄 이미지 개수
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await album();
        setImages(response); // 가져온 이미지 객체(아이디, 주소, 저장날짜)를 images 배열에 저장
      } catch (error) {
        console.error('이미지 저장 실패');
      }
    };
    fetchImages();
  }, []);

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
    <div>
      <div className='grid grid-cols-5 gap-1'>
        <ButtonComponent onClick={() => setContentNumber(1)}>사진첩양식 1</ButtonComponent>
        <ButtonComponent onClick={() => setContentNumber(2)}>사진첩양식 2</ButtonComponent>
        <ButtonComponent onClick={() => setContentNumber(3)}>사진첩양식 3</ButtonComponent>
        <ButtonComponent onClick={() => setContentNumber(4)}>사진첩양식 4</ButtonComponent>
        <ButtonComponent onClick={() => setContentNumber(5)}>사진첩양식 5</ButtonComponent>
      </div>
      <div className='grid grid-cols-5 gap-1'>
        <ButtonComponent onClick={() => setBackGroundURL(BackGroundURLs[0])}>
          배경 1
        </ButtonComponent>
        <ButtonComponent onClick={() => setBackGroundURL(BackGroundURLs[1])}>
          배경 2
        </ButtonComponent>
        <ButtonComponent onClick={() => setBackGroundURL(BackGroundURLs[2])}>
          배경 3
        </ButtonComponent>
        <ButtonComponent onClick={() => setBackGroundURL(BackGroundURLs[3])}>
          배경 4
        </ButtonComponent>
        <ButtonComponent onClick={() => setBackGroundURL(BackGroundURLs[4])}>
          배경 5
        </ButtonComponent>
      </div>
      <AlbumFrame
        DisplayedImages={getDisplayedImages()}
        BackgroundURL={BackGroundURL}
        contentNumber={contentNumber}
      />
      <PaginationContainer currentPage={currentPage} onClickPage={onClickPage} />
    </div>
  );
}
