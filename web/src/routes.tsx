import { createBrowserRouter } from 'react-router-dom'

import { AppLayout } from '@/pages/app/_layouts/app'
import { Home } from '@/pages/app/home'
import { Error } from '@/pages/error'
import { NotFound } from '@/pages/not-found'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
])
