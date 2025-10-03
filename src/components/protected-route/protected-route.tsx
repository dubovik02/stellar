import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

//import { selectUser } from '../../services/user/user-slice';
import { selectIsAuthChecked, selectUser } from '../../services/user/user-slice';
import { Waiter } from '../waiter/waiter';

type TProtectedProps = {
  onlyAuth: boolean;
  element: React.JSX.Element;
};

export const Protected = ({
  onlyAuth = false,
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

  if (onlyAuth && !user) {
    // for authorized, but unauthorized
    return <Navigate to="/login" state={{ from: location }} />;
  }

  if (onlyAuth && user) {
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
