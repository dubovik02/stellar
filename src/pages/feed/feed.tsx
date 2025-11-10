import { Outlet } from 'react-router-dom';

import styles from './feed.module.css';

export const Feed = (): React.JSX.Element => {
  return (
    <div className={styles.baseContainer}>
      <Outlet />
    </div>
  );
};
