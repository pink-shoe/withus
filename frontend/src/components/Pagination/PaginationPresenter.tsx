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
    <div className='flex justify-center pt-1'>
      {/* Pagination */}
      <button
        className='w-12 h-8 px-1 border rounded bg-white hover:bg-red-300 hover:text-white font-kdisplay'
        onClick={() => onClickPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        이전
      </button>
      {pageNumbers.map((pageNum, index) =>
        typeof pageNum === 'number' ? (
          <button
            key={index}
            className={`w-8 h-8 px-1 mx-1  border rounded font-kdisplay hover:text-white hover:bg-red-300 ${
              pageNum === currentPage ? 'bg-red-300' : 'bg-white '
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
        className='w-12 h-8 px-1 border rounded font-kdisplay bg-white hover:bg-red-300 hover:text-white'
        onClick={() => onClickPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        다음
      </button>
    </div>
  );
}
