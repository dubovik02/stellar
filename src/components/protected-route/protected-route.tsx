import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

import { selectIsAuthChecked, selectUser } from '../../services/user/user-slice';
import { Waiter } from '../waiter/waiter';

type TProtectedProps = {
  onlyUnAuth: boolean;
  element: React.JSX.Element;
};

export const Protected = ({
  onlyUnAuth = false,
  element: component,
}: TProtectedProps): React.JSX.Element => {
  const user = useSelector(selectUser);
  const isAuthChecked = useSelector(selectIsAuthChecked);
  const location = useLocation();

  // url == /profile, onlyUnAuth == false, user == null
  // url == /login, from == /profile, onlyUnAuth == true, user == null
  // url == /login, from == /profile, onlyUnAuth == true, user != null
  // url == /profile, onlyUnAuth == false, user != null
  // url == /profile, onlyUnAuth == false, user == null

  if (!isAuthChecked) {
    return <Waiter />;
  }

  if (onlyUnAuth && !user) {
    // for authorized, but unauthorized
    return <Navigate to="/login" state={{ from: location }} />;
  }

  if (onlyUnAuth && user) {
    // for unauthorized, but authorized
    const { from } = (location.state ?? { from: { pathname: '/' } }) as Record<
      string,
      string
    >;
    return <Navigate to={from} />;
  }

  // for authorized, and authorized
  // for unauthorized, and unauthorized

  return component;
};
