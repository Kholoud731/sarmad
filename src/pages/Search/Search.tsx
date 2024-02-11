import { useMutation, useQueryClient } from 'react-query';
import { useState, useEffect } from 'react';
import SearchForm from '../../components/SearchForm/Form.tsx';
import DATA from '../../data.ts';
import ResultsList from '../../components/ResultsList/ResultsList.tsx';
import { searchNames } from '../../helpers.ts';
import Loading from '../../ui/Loading.tsx';
import Error from '../../ui/Error.tsx';
import PaginationNav from '../../ui/PaginationNav.tsx';
import { ResultRecordDetails } from '../../types.ts';

const rowsPerPage = 10;

const Search = () => {
  const [searchResults, setSearchResults] = useState<ResultRecordDetails[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const queryClient = useQueryClient();

  const { mutate, isLoading, isError, isSuccess } = useMutation(searchNames, {
    onSuccess: (data) => {
      setSearchResults([]);
      setCurrentPage(1);
      window.localStorage.setItem('searchId', data.query_uuid as string);
      queryClient.setQueryData([data.query_uuid], data.screen_result);
      (data.screen_result as Partial<typeof DATA.screen_result>).forEach(
        (element) => {
          if (element) {
            setSearchResults((prevState: ResultRecordDetails[]) => [
              ...prevState,
              {
                id: element.entity_uuid,
                name: element.name,
                des: Object.values(element.descriptions[0]).join(' '),
                score: element.score,
                birth: element.places_of_birth[0],
                nat: element.nat,
              },
            ]);
          }
        }
      );
    },
  });

  const hasItems = searchResults.length > 0;

  useEffect(() => {
    const pageNumber = window.localStorage.getItem('pageNumber');
    if (pageNumber) {
      setCurrentPage(parseInt(pageNumber, 10));
    }
  }, []);

  useEffect(() => {
    if (currentPage) {
      window.localStorage.setItem('pageNumber', currentPage.toString());
    }
  }, [currentPage]);

  useEffect(() => {
    setSearchResults([]);
    const searchId = window.localStorage.getItem('searchId');
    if (searchId) {
      const storedData = queryClient.getQueryData(searchId) as Partial<
        typeof DATA.screen_result
      >;
      if (storedData) {
        (storedData as Partial<typeof DATA.screen_result>).forEach(
          (element) => {
            if (element) {
              setSearchResults((prevState: ResultRecordDetails[]) => [
                ...prevState,
                {
                  id: element.entity_uuid,
                  name: element.name,
                  des: Object.values(element.descriptions[0]).join(' '),
                  score: element.score,
                  birth: element.places_of_birth[0],
                  nat: element.nat,
                },
              ]);
            }
          }
        );
      }
    }
  }, [queryClient]);

  const onSubmitHandler = (n1: string, n2: string, n3: string, nat: string) => {
    setSearchResults([]);
    window.localStorage.removeItem('pageNumber');
    const postData = {
      fname: n1,
      mname: n2,
      lname: n3,
      nat,
    };
    mutate(postData);
  };

  return (
    <>
      <SearchForm submit={onSubmitHandler} />
      {isLoading && <Loading />}
      {isError && <Error />}
      {isSuccess && !hasItems && !isLoading && !isError && (
        <h2 style={{ textAlign: 'center', margin: '50px' }}>
          No Results Found
        </h2>
      )}
      {hasItems && (
        <ResultsList
          results={searchResults.slice(
            (currentPage - 1) * rowsPerPage,
            currentPage * rowsPerPage
          )}
        />
      )}
      {hasItems && (
        <PaginationNav
          pageNumber={currentPage}
          isPrevious={currentPage === 1}
          isNext={
            Math.floor(searchResults?.length / rowsPerPage) <=
              currentPage - 1 &&
            searchResults?.slice(
              (currentPage - 1) * rowsPerPage,
              currentPage * rowsPerPage
            ).length < rowsPerPage
          }
          onNextPage={() => setCurrentPage(currentPage + 1)}
          onPreviousPage={() => setCurrentPage(currentPage - 1)}
        />
      )}
    </>
  );
};

export default Search;
