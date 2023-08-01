import { useState, useEffect } from 'react';
import PaginationPresenter from './PaginationPresenter';
import { albumImageSaveApi } from '../../apis/albumImageSaveApi';

interface IPaginationContainerProps {
  currentPage: number;
  onPageClick: (page: number) => void;
}

export default function PaginationContainer({
  currentPage,
  onPageClick,
}: IPaginationContainerProps) {
  const [images, setImages] = useState<{ imgId: number; imgUrl: string; savedAt: string }[]>([]);
  const imagesPerPage = 4; // 한 페이지에 보여줄 이미지 개수

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await albumImageSaveApi();
        setImages(response); // 가져온 이미지 객체(아이디, 주소, 저장날짜)를 images 배열에 저장
      } catch (error) {
        console.error('이미지 저장 실패');
      }
    };
    fetchImages();
  }, []);

  return (
    <div>
      <PaginationPresenter
        currentPage={currentPage}
        totalPages={Math.ceil(images.length / imagesPerPage)}
        onPageClick={onPageClick}
      />
    </div>
  );
}
