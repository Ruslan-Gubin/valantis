import  { createRoot } from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Suspense } from 'react';
import { HomePage } from './pages';

import './app/styles/globals.scss';

const root = document.getElementById('root');
if (!root) {
  throw new Error('root not found');
}

const container = createRoot(root);

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    children: [],

  },
])

container.render(<Suspense><RouterProvider router={router} /></Suspense>)
