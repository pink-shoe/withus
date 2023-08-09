// import React from 'react';
import ReactDOM from 'react-dom/client';
// import App from './App.tsx';
import './index.css';
import { Routes } from '@generouted/react-router';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// import { createRoot } from 'react-dom/client';
// import { Routes } from '@generouted/react-router';

// const app = document.getElementById('app')!;
// createRoot(app).render(<Routes />);
const queryClient = new QueryClient();
const app = document.getElementById('root')!;
ReactDOM.createRoot(app).render(
  <QueryClientProvider client={queryClient}>
    <Routes />
  </QueryClientProvider>
);
