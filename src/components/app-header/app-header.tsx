import { RoutePath } from '@/utils/route-config';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { NavLink, useLocation } from 'react-router-dom';

import styles from './app-header.module.css';

export const AppHeader = (): React.JSX.Element => {
  const location = useLocation();

  const isIconActive = (path: string): boolean => {
    if (path === RoutePath.main) {
      if (location.pathname === path) {
        return true;
      } else {
        return false;
      }
    }
    if (location.pathname.includes(path)) {
      return true;
    }
    return false;
  };

  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menu_part_left}>
          <NavLink
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.link_active}` : `${styles.link}`
            }
            to={'/'}
          >
            <BurgerIcon
              type={`${isIconActive(RoutePath.main) ? 'primary' : 'secondary'}`}
            />
            <p className="text text_type_main-default ml-2">Конструктор</p>
          </NavLink>
          <NavLink
            to={'/feed'}
            className={({ isActive }) =>
              isActive ? `${styles.link} ${styles.link_active}` : `${styles.link}`
            }
          >
            <ListIcon
              type={`${isIconActive(RoutePath.feed) ? 'primary' : 'secondary'}`}
            />
            <p className="text text_type_main-default ml-2">Лента заказов</p>
          </NavLink>
        </div>
        <div className={styles.logo}>
          <NavLink to={'/'}>
            <Logo />
          </NavLink>
        </div>
        <NavLink
          to={'/profile'}
          className={({ isActive }) =>
            isActive ? `${styles.link} ${styles.link_active}` : `${styles.link}`
          }
        >
          <ProfileIcon
            type={`${isIconActive(RoutePath.profile) ? 'primary' : 'secondary'}`}
          />
          <p className="text text_type_main-default ml-2">Личный кабинет</p>
        </NavLink>
      </nav>
    </header>
  );
};
