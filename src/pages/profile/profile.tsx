import { useAppDispatch } from '@/services/store';
import { logout } from '@/services/user/user-slice';
import { RoutePath } from '@/utils/route-config';
import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import customStyles from './profile.module.css';

export const Profile = (): React.JSX.Element => {
  const PROFILE_DESCRIPTION =
    'В этом разделе вы можете изменить свои персональные данные';
  const ORDERS_HISTORY = 'В этом разделе вы можете посмотреть историю заказов';
  const EXIT = 'Выход из профиля';

  const [activeIndex, setActiveIndex] = useState(0);
  const [indexDescription, setIndexDescription] = useState(PROFILE_DESCRIPTION);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <div className={customStyles.rootContainer}>
      <div className={customStyles.menuContainer}>
        <li
          className={`${customStyles.menuItem} text text_type_main-medium ${activeIndex === 0 ? '' : 'text_color_inactive'}`}
          onClick={() => {
            setActiveIndex(0);
            setIndexDescription(PROFILE_DESCRIPTION);
            void navigate(RoutePath.profile_profile);
          }}
        >
          Профиль
        </li>
        <li
          className={`${customStyles.menuItem} text text_type_main-medium ${activeIndex === 1 ? '' : 'text_color_inactive'}`}
          onClick={() => {
            setActiveIndex(1);
            setIndexDescription(ORDERS_HISTORY);
            void navigate(RoutePath.profile_orders);
          }}
        >
          История заказов
        </li>
        <li
          className={`${customStyles.menuItem} text text_type_main-medium ${activeIndex === 2 ? '' : 'text_color_inactive'}`}
          onClick={() => {
            setActiveIndex(2);
            setIndexDescription(EXIT);
            void dispatch(logout());
          }}
        >
          Выход
        </li>
        <p className="text text_type_main-default text_color_inactive">
          {indexDescription}
        </p>
      </div>
      <Outlet />
    </div>
  );
};
