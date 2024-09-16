import Home from '@/views/pages/Home';
import Ring from '@/views/pages/Ring';

import Header from '@/views/components/Header';
import { Route, Routes } from 'react-router-dom';
import { routes } from './routes';

const LoggedUser = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path={routes.home} element={<Home />} />
        <Route path={routes.createRing} element={<Ring />} />
        <Route path={`${routes.editRing}/:ringId`} element={<Ring />} />
      </Routes>
    </>
  );
};

export default LoggedUser;
