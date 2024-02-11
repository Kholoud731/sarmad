export type PostData = {
  fname: string;
  mname: string;
  lname: string;
  nat: string;
};

export type SliderProps = {
  pageNumber: number;
  isNext: boolean;
  isPrevious: boolean;
  onNextPage: ()=> void;
  onPreviousPage: ()=> void;
};
