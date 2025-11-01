//import type { TOrderCard } from '@/utils/types';

import { CurrencyIcon } from '@krgaa/react-developer-burger-ui-components';

import styles from './order-card.module.css';

//export const OrderCard = (props: TOrderCard): React.JSX.Element => {
export const OrderCard = (): React.JSX.Element => {
  return (
    <>
      <div className={styles.mainContainer}>
        <span>{`props.number`}</span>
        <span>{`props.name`}</span>
        <span>{`props.status`}</span>
        <div>
          <div></div>
          <div>
            <span>{`props.price`}</span>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </>
  );
};
