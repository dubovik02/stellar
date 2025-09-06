import { Tab } from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';

import { BurgerComponent } from '../burger-component/burger-component';

import type { TIngredient } from '@utils/types';

import styles from './burger-ingredients.module.css';

type TBurgerIngredientsProps = {
  ingredients: TIngredient[];
};

export const BurgerIngredients = ({
  ingredients,
}: TBurgerIngredientsProps): React.JSX.Element => {
  function createGroup(ingredients: TIngredient[], type: string): TIngredient[] {
    const resArr = ingredients.filter((item) => {
      return item.type === type;
    });
    return resArr;
  }

  function createGroupElement(
    ingredients: TIngredient[],
    label: string
  ): React.JSX.Element {
    return (
      <>
        <h3>{label}</h3>
        <div className={styles.cardsContainer}>
          {ingredients.map((item) => {
            return <BurgerComponent {...item} key={item._id} />;
          })}
        </div>
      </>
    );
  }

  const bunArr = createGroup(ingredients, 'bun');
  const mainArr = createGroup(ingredients, 'main');
  const sauceArr = createGroup(ingredients, 'sauce');

  const [activeTabIndex, setActiveTabIndex] = useState(0);

  return (
    <section className={styles.burger_ingredients}>
      <nav>
        <ul className={styles.menu}>
          <Tab
            value="bun"
            active={activeTabIndex === 0 || activeTabIndex === 1}
            onClick={() => {
              setActiveTabIndex(1);
            }}
          >
            Булки
          </Tab>
          <Tab
            value="main"
            active={activeTabIndex === 2}
            onClick={() => {
              setActiveTabIndex(2);
            }}
          >
            Начинки
          </Tab>
          <Tab
            value="sauce"
            active={activeTabIndex === 3}
            onClick={() => {
              setActiveTabIndex(3);
            }}
          >
            Соусы
          </Tab>
        </ul>
      </nav>
      <section className={styles.container}>
        {(activeTabIndex === 0 || activeTabIndex === 1) &&
          createGroupElement(bunArr, 'Булки')}
        {(activeTabIndex === 0 || activeTabIndex === 2) &&
          createGroupElement(mainArr, 'Начинки')}
        {(activeTabIndex === 0 || activeTabIndex === 3) &&
          createGroupElement(sauceArr, 'Соусы')}
      </section>
    </section>
  );
};
