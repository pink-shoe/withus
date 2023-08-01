import PaginationPresenter from './PaginationPresenter';

interface IPaginationContainerProps {
  currentPage: number;
  onPageClick: (page: number) => void;
}

export default function PaginationContainer({
  currentPage,
  onPageClick,
}: IPaginationContainerProps) {
  return (
    <div>
      <PaginationPresenter
        currentPage={currentPage}
        // totalPages={Math.ceil(images.length / imagesPerPage)}
        onPageClick={onPageClick}
      />
    </div>
  );
}
