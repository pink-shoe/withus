import PaginationPresenter from './PaginationPresenter';
import { useState, useEffect } from 'react';
import { album } from 'apis/album';

interface IPaginationContainerProps {
  currentPage: number;
  onClickPage: (page: number) => void;
}

export default function PaginationContainer({
  currentPage,
  onClickPage,
}: IPaginationContainerProps) {
  const [images, setImages] = useState<{ imgId: number; imgUrl: string; savedAt: string }[]>([]);
  const imagesPerPage = 4; // 한 페이지에 보여줄 이미지 개수
  const totalPages = Math.ceil(images.length / imagesPerPage);

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

  const generatePageNumbers = () => {
    const pageNumbers = [];
    if (totalPages <= 5) {
      // 전체 페이지가 5개 이하일 경우 모든 페이지 숫자 추가
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      // 전체 페이지가 5개를 넘을 경우 1, ... 중앙, ..., 마지막 페이지 숫자 추가
      pageNumbers.push(1);
      if (currentPage <= 3) {
        // 현재 페이지가 3 이하일 경우 첫 번째 그룹에 속하는 페이지 추가
        for (let i = 2; i <= 4; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        // 현재 페이지가 뒤에서 3개 이하일 경우 마지막 그룹에 속하는 페이지 추가
        pageNumbers.push('...');
        for (let i = totalPages - 3; i <= totalPages - 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push(totalPages);
      } else {
        // 그 외의 경우 중앙 그룹에 속하는 페이지 추가
        pageNumbers.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
    }
    return pageNumbers;
  };

  const pageNumbers = generatePageNumbers();

  return (
    <div>
      <PaginationPresenter
        currentPage={currentPage}
        pageNumbers={pageNumbers}
        totalPages={totalPages}
        onClickPage={onClickPage}
      />
    </div>
  );
}
