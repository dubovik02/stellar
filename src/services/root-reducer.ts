import { combineSlices } from '@reduxjs/toolkit';

import { constructorSlice } from './constructor/burger-constructor-slice';
import { detailOrderSlice } from './detail-order/detail-order-slice';
import { feedSlice } from './feed/feed-slice';
import { ingredientsSlice } from './ingredients/burger-ingredients-slice';
import { orderSlice } from './order-details/order-details-slice';
import { userFeedSlice } from './user-feed/user-feed-slice';
import { userSlice } from './user/user-slice';

const rootReducer = combineSlices(
  ingredientsSlice,
  constructorSlice,
  orderSlice,
  userSlice,
  feedSlice,
  userFeedSlice,
  detailOrderSlice
);

export default rootReducer;
