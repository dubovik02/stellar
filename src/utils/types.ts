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
//order
export type TOrder = {
  name: string;
  order: {
    number: number;
  };
  success: boolean;
};

export type TOrderCard = {
  number: number;
  name: string;
  ingredients: TIngredient[];
  status: string;
};

export type TOrderData = {
  ingredients: string[];
};
//user
export type TUser = {
  name?: string;
  email: string;
  password?: string;
};
//api
export type TUserInfoResponse = {
  success: boolean;
  user: TUser;
};

export type TUserRegisterResponse = TUserInfoResponse & {
  accessToken: string;
  refreshToken: string;
};

export type TInfoResponse = {
  success: boolean;
  message: string;
};

export type TRefreshTokenResponse = {
  success: boolean;
  accessToken: string;
  refreshToken: string;
};

//slices
export type TConstructorState = {
  bun: TIngredient | null;
  mainAndSauce: TIngredient[];
  isLoading: boolean;
};

export type TInintialIngredientsState = {
  data: TIngredient[];
  isLoading: boolean;
};

export type TOrderState = {
  data: TOrder | null;
  isLoading: boolean;
  isModalShow: boolean;
  error?: string;
};

export type TUserInitialState = {
  user: TUser | null;
  isAuthChecked: boolean;
  isLoading: boolean;
  error: string;
};
//store
// export type TStore = {
//   user: TUserInitialState;
//   constructorBuilder: TConstructorState;
//   ingredients: TInintialIngredientsState;
//   order: TOrderState;
// };
