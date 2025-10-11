import { RoutePath } from '@/utils/route-config';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

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

  if (!isAuthChecked) {
    return <Waiter />;
  }

  if (onlyAuth && !user) {
    return <Navigate to={RoutePath.login} state={{ from: location }} />;
  }

  if (!onlyAuth && user) {
    const { from } = (location.state ?? {
      from: { pathname: '/' },
    }) as Record<string, string>;
    return <Navigate to={from} />;
  }

  return component;
};
