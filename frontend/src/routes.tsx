import { createBrowserRouter } from 'react-router-dom'

import { AppLayout } from './pages/_layouts/app'
import { HomePage, NotFoundPage, UpdateRingPage, CreateRingPage } from './pages' 

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />, 
    errorElement: <NotFoundPage />,
    children: [
      {
        path: '/',
        element: <HomePage />
      },
      {
        path: '/create',
        element: <CreateRingPage />
      },
      {
        path: '/update/:ringId',
        element: <UpdateRingPage />
      }
    ],
  },
])
