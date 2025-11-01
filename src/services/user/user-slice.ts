import {
  getUserInfo,
  isTokenExists,
  updateUserInfo,
  userLogin,
  userLogout,
  userRegister,
} from '@/utils/api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import type { TUser, TUserInitialState } from '@/utils/types';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: TUserInitialState = {
  user: null,
  isAuthChecked: false,
  isLoading: false,
  error: '',
};

export const newUserRegister = createAsyncThunk(
  'user/register',
  async (newUser: TUser) => {
    const res = await userRegister(newUser);
    return res;
  }
);

export const updateUserProfile = createAsyncThunk(
  'user/updateUser',
  async (updateUser: TUser) => {
    const res = await updateUserInfo(updateUser);
    return res;
  }
);

export const login = createAsyncThunk('user/login', async (user: TUser) => {
  const res = await userLogin(user);
  localStorage.setItem('accessToken', res.accessToken);
  localStorage.setItem('refreshToken', res.refreshToken);
  return res;
});

export const logout = createAsyncThunk('user/logout', async () => {
  await userLogout();
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
});

export const checkUserAuth = createAsyncThunk(
  'user/checkUserAuth',
  async (_, { dispatch }) => {
    if (isTokenExists()) {
      const res = await getUserInfo();
      dispatch(setUser(res.user));
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
    setIsAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    },
    setUser: (state, action: PayloadAction<TUser>) => {
      state.user = action.payload;
    },
    setIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setErrorText: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
  selectors: {
    selectUser: (state) => state.user,
    selectIsAuthChecked: (state) => state.isAuthChecked,
  },
  extraReducers: (builder) => {
    builder
      //checkAuth
      .addCase(checkUserAuth.rejected, (state) => {
        state.isAuthChecked = true;
      })
      //register
      .addCase(newUserRegister.pending, (state) => {
        state.error = '';
        state.isLoading = true;
      })
      .addCase(newUserRegister.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoading = false;
        state.isAuthChecked = true;
        localStorage.setItem('accessToken', action.payload.accessToken);
        localStorage.setItem('refreshToken', action.payload.refreshToken);
      })
      .addCase(newUserRegister.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Неизвестная ошибка:(';
      })
      //login
      .addCase(login.pending, (state) => {
        state.error = '';
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoading = false;
        state.isAuthChecked = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Неизвестная ошибка:(';
      })
      //logout
      .addCase(logout.pending, (state) => {
        state.error = '';
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.error = '';
        state.isLoading = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Неизвестная ошибка:(';
      })
      //update user
      .addCase(updateUserProfile.pending, (state) => {
        state.error = '';
        state.isLoading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.isLoading = false;
        state.isAuthChecked = true;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Неизвестная ошибка:(';
      });
  },
});

export const { setIsAuthChecked, setUser, setIsLoading, setErrorText } =
  userSlice.actions;
export const { selectUser, selectIsAuthChecked } = userSlice.selectors;
