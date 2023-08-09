interface IPaginationPresenterProps {
  currentPage: number;
  onClickPage: (page: number) => void;
  pageNumbers: (number | string)[];
  totalPages: number;
}

export default function PaginationPresenter({
  currentPage,
  onClickPage,
  pageNumbers,
  totalPages,
}: IPaginationPresenterProps) {
  return (
    <div className='flex justify-center'>
      {/* Pagination */}
      <button
        className='px-4 py-2 border rounded bg-white hover:bg-blue-500'
        onClick={() => onClickPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        이전
      </button>
      {pageNumbers.map((pageNum, index) =>
        typeof pageNum === 'number' ? (
          <button
            key={index}
            className={`px-4 py-2  border rounded ${
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
        className='px-4 py-2 border rounded bg-white hover:bg-blue-500'
        onClick={() => onClickPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        다음
      </button>
    </div>
  );
}
