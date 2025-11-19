import type { TIngredient } from './types';

export const createStatus = (status: string): string => {
  switch (status) {
    case 'done':
      return 'Выполнен';
    case 'created':
      return 'Создается';
    case 'pending':
      return 'Выполняется';
    default:
      return status;
  }
};

export const totalPrice = (
  allIngredients: TIngredient[],
  ingredientsID: string[]
): number => {
  const currentIngredients: TIngredient[] = [];
  ingredientsID.forEach((ingId) => {
    allIngredients.forEach((item) => {
      if (item._id === ingId) {
        currentIngredients.push(item);
      }
    });
  });

  let sum = 0;
  currentIngredients.forEach((item) => {
    sum = sum + item.price;
  });
  return sum;
};

export const createDataString = (date: Date): string => {
  if (date.getDate() === new Date(Date.now()).getDate()) {
    const timeStr =
      (date.getHours() > 9 ? date.getHours() : '0' + date.getHours()) +
      ':' +
      (date.getMinutes() > 9 ? date.getMinutes() : '0' + date.getMinutes()) +
      ':' +
      (date.getSeconds() > 9 ? date.getSeconds() : '0' + date.getSeconds());
    return `Сегодня, ${timeStr}`;
  }
  return date.toLocaleString();
};
