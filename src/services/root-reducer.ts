import { combineSlices } from '@reduxjs/toolkit';

import { componentSlice } from './component/burger-component-slice';
import { constructorSlice } from './constructor/burger-constructor-slice';
import { ingredientsSlice } from './ingredients/burger-ingredients-slice';
import { orderSlice } from './order-details/order-details-slice';

const rootReducer = combineSlices(
  ingredientsSlice,
  constructorSlice,
  componentSlice,
  orderSlice
);

export default rootReducer;
