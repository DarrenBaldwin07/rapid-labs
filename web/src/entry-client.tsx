import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from './router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter } from "react-router-dom";
import './styles/index.scss';

const props = (() => {
  const stateHolder = window as { __INITIAL_PROPS__?: string }
  const ssrState = stateHolder.__INITIAL_PROPS__

  if (ssrState) {
     delete stateHolder.__INITIAL_PROPS__
     return JSON.parse(ssrState)
  }
  return {test: "hello"}
})()

// This inits our query client for react-query (required via: https://react-query-v3.tanstack.com/overview)
const queryClient: QueryClient = new QueryClient();

ReactDOM.hydrateRoot(document.getElementById('__rapid') as HTMLElement,
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Router {...props} />
        </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
)

