import { RoutePath } from '@/utils/route-config';
import { Link } from 'react-router-dom';

import styles from './error-page.module.css';

type TCodeErrorProps = {
  toPath: string;
  codeError: string;
  pageSubtitle: string;
  pageText: string;
  linkText: string;
};

export const ErrorPage = (props: TCodeErrorProps): React.JSX.Element => {
  return (
    <>
      <div className={styles.codeErrorPage}>
        <span className={`${styles.title} text_type_main-large`}>{props.codeError}</span>
        <span className={`${styles.subtitle} text_type_main-medium`}>
          {props.pageSubtitle}
        </span>
        <span className={`${styles.subtitle} text_type_main-small`}>
          {props.pageText}
        </span>
        <div className={styles.buttonContainer}>
          <Link to={props.toPath} className={`${styles.applink} text_type_main-small`}>
            {props.linkText}
          </Link>
        </div>
      </div>
    </>
  );
};

export const NotFoundErorPage = (): React.JSX.Element => {
  const props = {
    toPath: RoutePath.main,
    codeError: '404',
    pageSubtitle: 'Бургера с таким адресом на нашем сайте нет :(',
    pageText: 'Попробуйте что-то другое и соберите свой бургер!',
    linkText: 'Вернуться на главную',
  };

  return <ErrorPage {...props}></ErrorPage>;
};
