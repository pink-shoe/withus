import { useState } from 'react';
import img1 from '../../assets/background1.jpg';
import img2 from '../../assets/background2.jpg';
import img3 from '../../assets/background3.jpg';
import img4 from '../../assets/1.gif';
import img5 from '../../assets/2.gif';
import img6 from '../../assets/3.gif';
import img7 from '../../assets/4.gif';
import img8 from '../../assets/5.gif';
import img9 from '../../assets/6.gif';
import img10 from '../../assets/7.gif';
import img11 from '../../assets/8.gif';
import img12 from '../../assets/9.gif';

export default function PhotoAlbum() {
  const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12];

  const imagesPerPage = 4; // 한 페이지에 보여줄 이미지 개수
  const totalPages = Math.ceil(images.length / imagesPerPage); // 전체 페이지 수
  const [currentPage, setCurrentPage] = useState(1);

  // 현재 페이지에 보여줄 이미지들을 계산하는 함수
  const getDisplayedImages = () => {
    const startIndex = (currentPage - 1) * imagesPerPage;
    const endIndex = startIndex + imagesPerPage;
    return images.slice(startIndex, endIndex);
  };

  // 페이지 숫자를 생성하는 함수
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

  // 한 줄에 4개씩 이미지 배치하기 위해 grid 레이아웃 사용
  return (
    <div>
      {/* <div className='grid grid-rows-2 grid-cols-2 lg:grid-rows-4 lg:grid-cols-1 gap-4'></div> */}
      <div className='grid grid-rows-4 grid-cols-1 lg:grid-rows-2 lg:grid-cols-2 bg-white m-4 border-2'>
        {getDisplayedImages().map((image, index) => (
          <img key={index} src={image} alt={`Image-${index + 1}`} className='w-96 h-96 m-4' />
        ))}
      </div>
      <div className='flex justify-center mt-4'>
        {/* Pagination */}
        <button
          className='px-4 py-2 mr-2 border rounded bg-white hover:bg-blue-500'
          onClick={() => setCurrentPage((prevPage) => prevPage - 1)}
          disabled={currentPage === 1}
        >
          이전
        </button>
        {generatePageNumbers().map((pageNum, index) =>
          typeof pageNum === 'number' ? (
            <button
              key={index}
              className={`px-4 py-2 border rounded ${
                pageNum === currentPage ? 'bg-blue-500' : 'bg-white'
              }`}
              onClick={() => setCurrentPage(pageNum)}
            >
              {pageNum}
            </button>
          ) : (
            <span key={index}>{pageNum}</span>
          )
        )}
        <button
          className='px-4 py-2 border rounded bg-white hover:bg-blue-500'
          onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
          disabled={currentPage === totalPages}
        >
          다음
        </button>
      </div>
    </div>
  );
}
