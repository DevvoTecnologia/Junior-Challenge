import { createBrowserRouter } from 'react-router-dom'

import { AppLayout } from '@/pages/app/_layouts/app'
import { Home } from '@/pages/app/home'
import { AuthLayout } from '@/pages/auth/_layouts/auth'
import { SignIn } from '@/pages/auth/sign-in'
import { SignUp } from '@/pages/auth/sign-up'
import { Error } from '@/pages/error'
import { NotFound } from '@/pages/not-found'

import { ProtectedRoute } from './utils/protected-route'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <ProtectedRoute element={<Home />} />,
      },
    ],
  },
  {
    path: '/',
    element: <AuthLayout />,
    errorElement: <Error />,
    children: [
      {
        path: '/sign-up',
        element: <SignUp />,
      },
      {
        path: '/sign-in',
        element: <SignIn />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
])
