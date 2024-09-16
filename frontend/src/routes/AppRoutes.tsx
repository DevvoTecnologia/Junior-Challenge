import { Outlet, Route, Routes } from 'react-router-dom';

import EditRings from '../pages/Private/Rings/Edit';
import Home from '../pages/Private/Rings/List';
import CreateNewRing from '../pages/Private/Rings/New';
import { PublicRoute } from './PublicRoute';

export const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route
          element={
            <PublicRoute>
              <Outlet />
            </PublicRoute>
          }
        >
          {/* <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/create-account" element={<CreateAccount />} /> */}

          <Route path="/rings/list" element={<Home />} />
          <Route path="/" element={<Home />} />
          <Route path="/rings/new" element={<CreateNewRing />} />
          <Route path="/rings/edit/:id" element={<EditRings />} />
        </Route>
      </Routes>
    </>
  );
};
