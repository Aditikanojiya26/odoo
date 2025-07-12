// main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';


import router from './Routes/Router.jsx';
import { MyProvider } from './components/context/Context.jsx';
import './index.css';
import queryClient from './services/queryClient.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <MyProvider>
        <RouterProvider router={router} />
      </MyProvider>
    </QueryClientProvider>
  </StrictMode>
);
