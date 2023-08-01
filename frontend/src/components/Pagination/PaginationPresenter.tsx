interface IPaginationPresenterProps {
  currentPage: number;
  totalPages: number;
  onPageClick: (page: number) => void;
}

export default function PaginationPresenter({
  currentPage,
  totalPages,
  onPageClick,
}: IPaginationPresenterProps) {
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

  const onClickPage = (page: number) => {
    onPageClick(page);
  };

  const pageNumbers = generatePageNumbers();

  return (
    <div className='flex justify-center mt-8 py-4'>
      {/* Pagination */}
      <button
        className='px-4 py-2 m-2 border rounded bg-white hover:bg-blue-500'
        onClick={() => onClickPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        이전
      </button>
      {pageNumbers.map((pageNum, index) =>
        typeof pageNum === 'number' ? (
          <button
            key={index}
            className={`px-4 py-2 m-1 border rounded ${
              pageNum === currentPage ? 'bg-blue-500' : 'bg-white'
            }`}
            onClick={() => onClickPage(pageNum)}
          >
            {pageNum}
          </button>
        ) : (
          <span key={index}>{pageNum}</span>
        )
      )}
      <button
        className='px-4 py-2 m-2 border rounded bg-white hover:bg-blue-500'
        onClick={() => onClickPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        다음
      </button>
    </div>
  );
}
