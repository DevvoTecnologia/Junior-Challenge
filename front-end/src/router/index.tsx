import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthGuard from './AuthGuard';
import Home from '@/view/pages/Home';
import AuthLayout from '@/view/layouts/AuthLayout';
import Login from '@/view/pages/Login';
import Register from '@/view/pages/Register';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthGuard isPrivate={false} />}>
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        </Route>

        <Route element={<AuthGuard isPrivate={true} />}>
          <Route path="/rings" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
