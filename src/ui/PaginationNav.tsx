type SliderProps = {
  pageNumber: number;
  isNext: boolean;
  isPrevious: boolean;
  onNextPage: () => void;
  onPreviousPage: () => void;
};

const PaginationNav: React.FC<SliderProps> = ({
  pageNumber,
  isPrevious,
  isNext,
  onNextPage,
  onPreviousPage,
}) => (
  <div className="slider">
    <button
      className={`button${isPrevious ? '--disabled' : ''} previous`}
      disabled={isPrevious}
      onClick={onPreviousPage}
    >
      Previous
    </button>
    <div className="current-page">{pageNumber}</div>
    <button
      className={`button${isNext ? '--disabled' : ''} next`}
      disabled={isNext}
      onClick={onNextPage}
    >
      Next
    </button>
  </div>
);

export default PaginationNav;
