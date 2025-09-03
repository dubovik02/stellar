import { Tab } from '@krgaa/react-developer-burger-ui-components';

import { BurgerComponent } from '../burger-component/burger-component';

import type { TIngredient } from '@utils/types';

import styles from './burger-ingredients.module.css';

type TBurgerIngredientsProps = {
  ingredients: TIngredient[];
};

export const BurgerIngredients = ({
  ingredients,
}: TBurgerIngredientsProps): React.JSX.Element => {
  return (
    <section className={styles.burger_ingredients}>
      <nav>
        <ul className={styles.menu}>
          <Tab
            value="bun"
            active={true}
            onClick={() => {
              /* TODO */
            }}
          >
            Булки
          </Tab>
          <Tab
            value="main"
            active={false}
            onClick={() => {
              /* TODO */
            }}
          >
            Начинки
          </Tab>
          <Tab
            value="sauce"
            active={false}
            onClick={() => {
              /* TODO */
            }}
          >
            Соусы
          </Tab>
        </ul>
      </nav>
      <section className={styles.container}>
        <h3>Булки</h3>
        <div className={styles.cardsContainer}>
          {ingredients.map((item) => {
            return <BurgerComponent {...item} key={item._id} />;
          })}
        </div>
      </section>
    </section>
  );
};
