import { Tab } from '@krgaa/react-developer-burger-ui-components';
import { useState } from 'react';
import { useSelector } from 'react-redux';

import { BurgerComponent } from '../burger-component/burger-component';
import { Waiter } from '../waiter/waiter';

import type { TIngredient } from '@utils/types';

import styles from './burger-ingredients.module.css';

const TAB_HEADER = 'tabHeader';
const BUN_HEADER = 'bunHeader';
const MAIN_HEADER = 'mainHeader';
const SAUCE_HEADER = 'sauceHeader';

const BurgerIngredients = (): React.JSX.Element => {
  function createGroup(ingredients: TIngredient[], type: string): TIngredient[] {
    const resArr = ingredients.filter((item) => {
      return item.type === type;
    });
    return resArr;
  }

  function createGroupElement(
    ingredients: TIngredient[],
    label: string,
    sectionId: string
  ): React.JSX.Element {
    return (
      <>
        <h3 id={sectionId}>{label}</h3>
        <div className={styles.cardsContainer}>
          {ingredients.map((item) => {
            return <BurgerComponent {...item} key={item._id} />;
          })}
        </div>
      </>
    );
  }

  function calcDist(basePositiom: number, currentPosition: number): number {
    if (currentPosition < 0) {
      return basePositiom + Math.abs(currentPosition);
    }
    return currentPosition;
  }

  function checkIngredients(): void {
    const tabPosition = Math.abs(
      document.getElementById(TAB_HEADER)?.getBoundingClientRect().bottom ?? 0
    );
    const bunPosition = calcDist(
      tabPosition,
      document.getElementById(BUN_HEADER)?.getBoundingClientRect().top ?? 0
    );
    const mainPosition = calcDist(
      tabPosition,
      document.getElementById(MAIN_HEADER)?.getBoundingClientRect().top ?? 0
    );
    const saucePosition = calcDist(
      tabPosition,
      document.getElementById(SAUCE_HEADER)?.getBoundingClientRect().top ?? 0
    );

    const arr = [
      Math.abs(tabPosition - bunPosition),
      Math.abs(tabPosition - mainPosition),
      Math.abs(tabPosition - saucePosition),
    ];
    const tabNumber = arr.reduce((min, curr, idx) => (curr < arr[min] ? idx : min), 0);
    setActiveTabIndex(tabNumber);
  }

  const { ingredients, isLoading } = useSelector((store: Record<string, unknown>) => ({
    ingredients: (store.ingredients as Record<string, unknown>).data as TIngredient[],
    isLoading: (store.ingredients as Record<string, unknown>).isLoading as boolean,
  }));

  const waiter = <Waiter />;

  const bunArr = createGroup(ingredients, 'bun');
  const mainArr = createGroup(ingredients, 'main');
  const sauceArr = createGroup(ingredients, 'sauce');

  const [activeTabIndex, setActiveTabIndex] = useState(0);

  return (
    <section className={styles.burger_ingredients}>
      <nav>
        <ul className={styles.menu} id={'tabHeader'}>
          <Tab
            value="bun"
            active={activeTabIndex === 0}
            onClick={() => {
              //
            }}
          >
            Булки
          </Tab>
          <Tab
            value="main"
            active={activeTabIndex === 1}
            onClick={() => {
              //
            }}
          >
            Начинки
          </Tab>
          <Tab
            value="sauce"
            active={activeTabIndex === 2}
            onClick={() => {
              //
            }}
          >
            Соусы
          </Tab>
        </ul>
      </nav>
      <section
        className={styles.container}
        onScroll={() => {
          checkIngredients();
        }}
      >
        {createGroupElement(bunArr, 'Булки', BUN_HEADER)}
        {createGroupElement(mainArr, 'Начинки', MAIN_HEADER)}
        {createGroupElement(sauceArr, 'Соусы', SAUCE_HEADER)}
        {isLoading && waiter}
      </section>
    </section>
  );
};

export default BurgerIngredients;
