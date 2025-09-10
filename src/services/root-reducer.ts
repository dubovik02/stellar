import { combineSlices } from '@reduxjs/toolkit';

import { ingredientsSlice } from './ingredients/burger-ingredients-slice';

const rootReducer = combineSlices(ingredientsSlice);

export default rootReducer;
