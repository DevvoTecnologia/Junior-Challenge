import { Navigate } from 'react-router-dom';
import { history } from '../../helpers/history';
import { ROUTES } from '../../routes';

interface PrivateProps {
  children: any
};

const PrivateRoute = ({ children }: PrivateProps): JSX.Element => {
  if (!localStorage.getItem("userChallenge")) {
    // not logged in so redirect to login page with the return url
    return <Navigate to={ROUTES.LOGIN} state={{ from: history.location }} />
  };

  // authorized so return child components
  return children;
};

export default PrivateRoute;