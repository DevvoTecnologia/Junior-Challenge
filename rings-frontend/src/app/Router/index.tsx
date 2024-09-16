import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Loading from '@/views/components/Loading';

import { ProtectedRoutes } from '@/views/components/ProtectedRoutes';
import { AuthProvider } from '../contexts/AuthProvider';
import { ThemeProvider } from '../contexts/ThemeProvider';
import { routes } from './routes';

const LoggedUser = lazy(() => import('./LoggedUser'));
const Login = lazy(() => import('@/views/pages/Login'));
const NotFound = lazy(() => import('@/views/components/NotFound'));

const Router = () => {
  return (
    <Suspense fallback={<Loading />}>
      <ThemeProvider defaultTheme='system'>
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route
                path={routes.home}
                element={
                  <ProtectedRoutes>
                    <LoggedUser />
                  </ProtectedRoutes>
                }
              />
              <Route path={routes.login} element={<Login />} />
              <Route path={routes.notFound} element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </Suspense>
  );
};

export default Router;
