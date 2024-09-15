import { Route, Routes } from 'react-router-dom';

import { Rings } from '../app/rings/page';

export function Router() {
  return (
    <Routes>
      <Route path='/' element={ <Rings /> } />
    </Routes>
  );
}
