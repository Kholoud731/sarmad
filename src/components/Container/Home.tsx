import { useMutation, useQueryClient } from 'react-query';
import { useState, useEffect } from 'react';
import FormComponent from '../FormComponent/FormComponent';
import DATA from '../../../data.ts';
import ListComponent from '../ListComponent/ListComponent';
import PageHeaderComponent from './PageHeaderComponent';
import { searchNames } from './hrlpers.ts';
import TableLoadingComponent from '../ListComponent/TableLoadingComponent.tsx';
import TableErrorComponent from '../ListComponent/TableErrorComponent.tsx';
import { RecordDetails } from '../ListComponent/types.ts';
import SliderComponent from './SliderComponent.tsx';

const Home = () => {
  const [searchResults, setSearchResults] = useState<RecordDetails[]>([]);
  const [currentPage, setCurrentPage] = useState<number | undefined>(undefined);
  const queryClient = useQueryClient();
  
  useEffect(() => {
    const pageNumber = window.localStorage.getItem('pageNumber');
    if (pageNumber) {
      setCurrentPage(parseInt(pageNumber, 10)); 
    }
  }, []);

  useEffect(() => {
    if(currentPage){
      window.localStorage.setItem('pageNumber', currentPage.toString());
    }
  }, [currentPage]);

  useEffect(() => {
    setSearchResults([]);
    const searchId = window.localStorage.getItem('searchId');
    if (searchId) {
      const storedData = (queryClient.getQueryData(searchId) as Partial<typeof DATA.screen_result>);
      if (storedData) {
        (storedData as Partial<typeof DATA.screen_result>).forEach((element) => {
          if (element) {
            setSearchResults((prevState: RecordDetails[]) => [
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
        });
      }
    }
  }, [queryClient]);

  const { mutate, isLoading, isError } = useMutation(searchNames, {
    onSuccess: (data) => {
      setSearchResults([]);
      setCurrentPage(1);
      window.localStorage.setItem('searchId', data.query_uuid as string);
      queryClient.setQueryData([data.query_uuid], data.screen_result);
      (data.screen_result as Partial<typeof DATA.screen_result>).forEach((element) => {
        if (element) {
          setSearchResults((prevState: RecordDetails[]) => [
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
      });
    },
  });

  const onSubmitHandler = (n1: string, nat: string, n2: string, n3: string) => {
    setCurrentPage(undefined);
    setSearchResults([]);
    window.localStorage.removeItem('pageNumber');
    const nationality = nat === 'Select' ? '' : nat;
    const postData = {
      fname: n1,
      mname: n2,
      lname: n3,
      nat: nationality,
    };
    mutate(postData);
  };

  return (
    <>
      <PageHeaderComponent />
      <FormComponent submit={onSubmitHandler} isDisabled={Boolean(searchResults)} />
      {isLoading && <TableLoadingComponent />}
      {isError && <TableErrorComponent />}
      {searchResults?.length > 0 && currentPage && <ListComponent results={searchResults.slice((currentPage-1)*15, currentPage*15)} />}
      {searchResults?.length > 0 && currentPage && <SliderComponent 
      pageNumber={currentPage} 
      isPrevious={currentPage === 1} 
      isNext={Math.floor(searchResults?.length/15) <= currentPage-1 &&
      searchResults?.slice((currentPage-1)*15, currentPage*15).length < 15
    } 
      onNextPage={()=>setCurrentPage(currentPage+1)}
      onPreviousPage={()=>setCurrentPage(currentPage-1)}
      /> }
    </>
  );
};

export default Home;
