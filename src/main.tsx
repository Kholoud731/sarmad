import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ResultsRecordDetails from './pages/ResultRecordDetails/ResultRecordDetails';
import './index.scss';
import Search from './pages/Search/Search';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <Search />,
  },
  {
    path: 'users/:userId',
    element: <ResultsRecordDetails />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
