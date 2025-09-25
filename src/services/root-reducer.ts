import { combineSlices } from '@reduxjs/toolkit';

import { constructorSlice } from './constructor/burger-constructor-slice';
import { ingredientsSlice } from './ingredients/burger-ingredients-slice';
import { orderSlice } from './order-details/order-details-slice';

const rootReducer = combineSlices(ingredientsSlice, constructorSlice, orderSlice);

export default rootReducer;
