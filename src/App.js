import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Outlet } from 'react-router-dom';
import SearchHeader from './components/SearchHeader';
import { YoutubeApiProvider } from './context/YoutubeApiContext';

const client = new QueryClient();

const App = () => {
  return (
    <>
      <SearchHeader />
      <YoutubeApiProvider>
        <QueryClientProvider client={client}>
          <Outlet />
        </QueryClientProvider>
      </YoutubeApiProvider>
    </>
  );
};

export default App;
