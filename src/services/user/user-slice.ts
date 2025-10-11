import {
  getUserInfo,
  isTokenExists,
  updateUserInfo,
  userLogin,
  userLogout,
  userRegister,
} from '@/utils/api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import type { TUser } from '@/utils/types';

type TUserInitialState = {
  user: TUser | null;
  isAuthChecked: boolean;
  isLoading: boolean;
  error: string;
};

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
  localStorage.setItem(
    'accessToken',
    (res as Record<string, unknown>).accessToken as string
  );
  localStorage.setItem(
    'refreshToken',
    (res as Record<string, unknown>).refreshToken as string
  );
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
    setIsLoading: (state, action) => {
      state.isLoading = action.payload as boolean;
    },
    setErrorText: (state, action) => {
      state.error = action.payload as string;
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
        state.user = (action.payload as Record<string, unknown>).user as TUser;
        state.isLoading = false;
        state.isAuthChecked = true;
        localStorage.setItem(
          'accessToken',
          (action.payload as Record<string, unknown>).accessToken as string
        );
        localStorage.setItem(
          'refreshToken',
          (action.payload as Record<string, unknown>).refreshToken as string
        );
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
        state.user = (action.payload as Record<string, unknown>).user as TUser;
        state.isLoading = false;
        state.isAuthChecked = true;
        // localStorage.setItem(
        //   'accessToken',
        //   (action.payload as Record<string, unknown>).accessToken as string
        // );
        // localStorage.setItem(
        //   'refreshToken',
        //   (action.payload as Record<string, unknown>).refreshToken as string
        // );
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
        // localStorage.removeItem('accessToken');
        // localStorage.removeItem('refreshToken');
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
        state.user = (action.payload as Record<string, unknown>).user as TUser;
        state.isLoading = false;
        state.isAuthChecked = true;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Неизвестная ошибка:(';
      });
  },
});

export const { setIsAuthChecked, setUser } = userSlice.actions;
export const { selectUser, selectIsAuthChecked } = userSlice.selectors;
