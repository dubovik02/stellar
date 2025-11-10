import { RoutePath } from '@/utils/route-config';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from '@krgaa/react-developer-burger-ui-components';
import { useLocation } from 'react-router-dom';

import styles from './app-header.module.css';

export const AppHeader = (): React.JSX.Element => {
  const location = useLocation();

  const setActiveItemClass = (path: string): string => {
    if (location.pathname.includes(path)) {
      return `${styles.link_active}`;
    }
    return '';
  };

  const isIconActive = (path: string): boolean => {
    if (location.pathname.includes(path)) {
      return true;
    }
    return false;
  };

  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menu_part_left}>
          {/* Тут должны быть ссылки, а не например кнопки или абзацы */}
          <a href="/" className={`${styles.link} ${setActiveItemClass(RoutePath.main)}`}>
            <BurgerIcon
              type={`${isIconActive(RoutePath.main) ? 'primary' : 'secondary'}`}
            />
            <p className="text text_type_main-default ml-2">Конструктор</p>
          </a>
          <a
            href="/feed"
            className={`${styles.link} ml-10 ${setActiveItemClass(RoutePath.feed)}`}
          >
            <ListIcon
              type={`${isIconActive(RoutePath.feed) ? 'primary' : 'secondary'}`}
            />
            <p className="text text_type_main-default ml-2">Лента заказов</p>
          </a>
        </div>
        <div className={styles.logo}>
          <Logo />
        </div>
        <a
          href="/profile"
          className={`${styles.link} ${styles.link_position_last} ${setActiveItemClass(RoutePath.profile)}`}
        >
          <ProfileIcon
            type={`${isIconActive(RoutePath.profile) ? 'primary' : 'secondary'}`}
          />
          <p className="text text_type_main-default ml-2">Личный кабинет</p>
        </a>
      </nav>
    </header>
  );
};
