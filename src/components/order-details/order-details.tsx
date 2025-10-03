import { CheckMarkIcon } from '@krgaa/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';

import type { TOrder } from '@/utils/types';

import styles from './order-details.module.css';

export const OrderDetails = (): React.JSX.Element => {
  const { order } = useSelector((store: Record<string, unknown>) => ({
    order: (store.order as Record<string, unknown>).data,
  }));

  return (
    <>
      <span className={`text text_type_digits-large ${styles.order__number}`}>
        {(order as TOrder).order.number}
      </span>
      <span className={`text text_type_main-medium`}>идентификатор заказа</span>
      <div className={styles.order__check_container as string}>
        <CheckMarkIcon type="primary" className={styles.order__check_ico as string} />
      </div>
      <span className={`text text_type_main-small ${styles.order__progress}`}>
        Ваш заказ начали готовить
      </span>
      <span className="text text_type_main-default text_color_inactive">
        Дождитесь готовности на орбитальной станции
      </span>
    </>
  );
};
