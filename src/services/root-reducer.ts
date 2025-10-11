import { combineSlices } from '@reduxjs/toolkit';

import { constructorSlice } from './constructor/burger-constructor-slice';
import { ingredientsSlice } from './ingredients/burger-ingredients-slice';
import { orderSlice } from './order-details/order-details-slice';
import { userSlice } from './user/user-slice';

const rootReducer = combineSlices(
  ingredientsSlice,
  constructorSlice,
  orderSlice,
  userSlice
);

export default rootReducer;
