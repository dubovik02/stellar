import { CheckMarkIcon } from '@krgaa/react-developer-burger-ui-components';
import ReactDOM from 'react-dom';

import { ModalOverlay } from '../modal-overlay/modal-overlay';

import type { TModalProps } from '@/utils/types';

import styles from './order-details.module.css';

export const OrderDetails = (props: TModalProps): React.JSX.Element => {
  const rootElem = document.getElementById('root');
  return ReactDOM.createPortal(
    <>
      <ModalOverlay {...props}>
        {
          <>
            <span className={`text text_type_digits-large ${styles.order__number}`}>
              10-34-56
            </span>
            <span className={`text text_type_main-medium`}>идентификатор заказ</span>
            <div className={styles.order__check_container as string}>
              <CheckMarkIcon
                type="primary"
                className={styles.order__check_ico as string}
              />
            </div>
            <span className={`text text_type_main-small ${styles.order__progress}`}>
              Ваш заказ начали готовить
            </span>
            <span className="text text_type_main-default text_color_inactive">
              Дождитесь готовности на орбитальной станции
            </span>
          </>
        }
      </ModalOverlay>
    </>,
    rootElem!
  );
};
