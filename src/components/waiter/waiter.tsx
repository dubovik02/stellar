import styles from './waiter.module.css';

type TLoaderProps = {
  title?: string;
};

export const Waiter = ({ title }: TLoaderProps): React.JSX.Element => {
  return (
    <div className={styles.container}>
      <i className={styles.preloader}></i>
      <span className={styles.title}>{title}</span>
    </div>
  );
};
