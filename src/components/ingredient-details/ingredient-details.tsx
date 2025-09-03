import ReactDOM from 'react-dom';

import { ModalOverlay } from '../modal-overlay/modal-overlay';

import type { TIngredient, TModalProps } from '@/utils/types';

import styles from './ingredient-details.module.css';

export const IngredientDetails = (props: TModalProps): React.JSX.Element => {
  const rootElem = document.getElementById('root');
  const ingredient = props.data! as TIngredient;

  const createPropElem = (name: string, val: number): React.JSX.Element => {
    return (
      <div className={styles.detail__prop}>
        <span className="text text_type_main-medium text_color_inactive">{name}</span>
        <span className="text text_type_digits-medium text_color_inactive">{val}</span>
      </div>
    );
  };

  return ReactDOM.createPortal(
    <>
      <ModalOverlay {...props} caption="Детали ингридиента">
        {
          <>
            <img
              className={styles.detail__image}
              src={ingredient.image}
              alt="picture"
            ></img>
            <p
              className={`${styles.detail__name} "text text_type_main-large pt-4 pb-8"`}
            >
              {ingredient.name}
            </p>
            <div className={styles.detail__props_container as string}>
              {createPropElem('Калории,ккал', ingredient.calories)}
              {createPropElem('Белки,г', ingredient.proteins)}
              {createPropElem('Жиры,г', ingredient.fat)}
              {createPropElem('Углеводы,г', ingredient.carbohydrates)}
            </div>
          </>
        }
      </ModalOverlay>
    </>,
    rootElem!
  );
};
