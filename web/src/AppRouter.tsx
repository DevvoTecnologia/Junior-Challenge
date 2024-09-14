import { useRoutes } from 'react-router-dom';
import { Home } from './pages/Home';
import { NewRing } from './pages/NewRing';
import { EditRing } from './pages/EditRing';

export function AppRouter() {
  const routes = useRoutes([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/new',
      element: <NewRing />,
    },
    {
      path: '/edit/:id',
      element: <EditRing />,
    },
  ]);

  return routes;
}
