import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App.tsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import './index.css'
import { Register } from '@/components/Register.tsx'
import { Login } from '@/components/Login.tsx'
import { ProtectedRoute } from '@/components/ProtectedRouter.tsx'

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login /> 
  },
  {
    path: '/register',
    element: <Register /> 
  },
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <App /> 
      </ProtectedRoute>
    )
  }
])
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
