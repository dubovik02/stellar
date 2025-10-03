export type TIngredient = {
  itemId?: string;
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_large: string;
  image_mobile: string;
  __v: number;
};

export type TModalProps = {
  caption?: string;
  onCloseEvent?: () => void;
  children?: React.ReactNode;
  data?: object;
};

export type TOrder = {
  name: string;
  order: {
    number: number;
  };
  success: boolean;
};
