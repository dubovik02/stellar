import { getUserInfo, isTokenExists } from '@/utils/api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import type { TUser } from '@/utils/types';

type TUserInitialState = {
  user: TUser | null;
  isAuthChecked: boolean;
};

const initialState: TUserInitialState = {
  user: null,
  isAuthChecked: false,
};

// export const login = createAsyncThunk('user/login', async () => {
//   const res = await userLogin();
//   return res.user;
// });

// export const logout = createAsyncThunk('user/logout', async () => {
//   await api.logout();
// });

export const checkUserAuth = createAsyncThunk(
  'user/checkUserAuth',
  async (_, { dispatch }) => {
    if (isTokenExists()) {
      const res = await getUserInfo();
      dispatch(setUser((res as Record<string, unknown>).user as TUser));
      dispatch(setIsAuthChecked(true));
    } else {
      dispatch(setIsAuthChecked(true));
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsAuthChecked: (state, action) => {
      state.isAuthChecked = action.payload as boolean;
    },
    setUser: (state, action) => {
      state.user = action.payload as TUser;
    },
  },
  selectors: {
    selectUser: (state) => state.user,
    selectIsAuthChecked: (state) => state.isAuthChecked,
  },
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(login.fulfilled, (state, action) => {
  //       state.user = action.payload;
  //       state.isAuthChecked = true;
  //     })
  //     .addCase(logout.fulfilled, (state) => {
  //       state.user = null;
  //     });
  // },
});

export const { setIsAuthChecked, setUser } = userSlice.actions;
export const { selectUser, selectIsAuthChecked } = userSlice.selectors;
