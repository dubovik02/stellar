import {
  checkUserAuth,
  initialUserState,
  login,
  logout,
  newUserRegister,
  setErrorText,
  setIsAuthChecked,
  setIsLoading,
  setUser,
  updateUserProfile,
  userSlice,
} from './user-slice';

import type { TUser, TUserRegisterResponse } from '@/utils/types';

const testUser: TUser = {
  email: 'name@mail.au',
  name: 'name',
  password: 'qwerty',
};

const testUserRegisterResponse: TUserRegisterResponse = {
  success: true,
  user: testUser,
  accessToken: 'asdfgh',
  refreshToken: 'qwerty',
};

const errText = 'error';

describe('User reducers', (): void => {
  it('should return the initial state', () => {
    const state = userSlice.reducer(undefined, { type: '' });
    expect(state).toEqual(initialUserState);
  });

  it('should set user', () => {
    const action = { type: setUser.type, payload: testUser };
    const state = userSlice.reducer(initialUserState, action);
    expect(state).toEqual({ ...initialUserState, user: testUser });
  });

  it('should set isAuth checked', () => {
    const action = { type: setIsAuthChecked.type, payload: true };
    const state = userSlice.reducer(initialUserState, action);
    expect(state).toEqual({ ...initialUserState, isAuthChecked: true });
  });

  it('should set isLoading', () => {
    const action = { type: setIsLoading.type, payload: true };
    const state = userSlice.reducer(initialUserState, action);
    expect(state).toEqual({ ...initialUserState, isLoading: true });
  });

  it('should set error text', () => {
    const action = { type: setErrorText.type, payload: errText };
    const state = userSlice.reducer(initialUserState, action);
    expect(state).toEqual({ ...initialUserState, error: errText });
  });
  ///////////
  //checkAuth
  it('should set isAuthChecked', () => {
    const action = { type: checkUserAuth.rejected.type };
    const state = userSlice.reducer(initialUserState, action);
    expect(state).toEqual({ ...initialUserState, isAuthChecked: true });
  });
  //register
  it('newUserRegister Pending', () => {
    const action = { type: newUserRegister.pending.type };
    const state = userSlice.reducer(initialUserState, action);
    expect(state).toEqual({
      ...initialUserState,
      isLoading: true,
      error: '',
    });
  });

  it('newUserRegister fullfield', () => {
    const action = {
      type: newUserRegister.fulfilled.type,
      payload: testUserRegisterResponse,
    };
    const state = userSlice.reducer(initialUserState, action);
    expect(state).toEqual({
      ...initialUserState,
      user: testUser,
      isAuthChecked: true,
      isLoading: false,
    });
  });

  it('newUserRegister rejected', () => {
    const action = {
      type: newUserRegister.rejected.type,
      error: { message: errText },
    };
    const state = userSlice.reducer(initialUserState, action);
    expect(state).toEqual({
      ...initialUserState,
      isLoading: false,
      error: errText,
    });
  });
  //login
  it('login Pending', () => {
    const action = { type: login.pending.type };
    const state = userSlice.reducer(initialUserState, action);
    expect(state).toEqual({
      ...initialUserState,
      isLoading: true,
      error: '',
    });
  });

  it('login fullfield', () => {
    const action = {
      type: login.fulfilled.type,
      payload: testUserRegisterResponse,
    };
    const state = userSlice.reducer(initialUserState, action);
    expect(state).toEqual({
      ...initialUserState,
      user: testUser,
      isAuthChecked: true,
      isLoading: false,
    });
  });

  it('login rejected', () => {
    const action = {
      type: login.rejected.type,
      error: { message: errText },
    };
    const state = userSlice.reducer(initialUserState, action);
    expect(state).toEqual({
      ...initialUserState,
      isLoading: false,
      error: errText,
    });
  });
  //logout
  it('logout Pending', () => {
    const action = { type: logout.pending.type };
    const state = userSlice.reducer(initialUserState, action);
    expect(state).toEqual({
      ...initialUserState,
      isLoading: true,
      error: '',
    });
  });

  it('logout fullfield', () => {
    const action = {
      type: logout.fulfilled.type,
      payload: testUserRegisterResponse,
    };
    const state = userSlice.reducer(initialUserState, action);
    expect(state).toEqual({
      ...initialUserState,
      user: null,
      isLoading: false,
      error: '',
    });
  });

  it('logout rejected', () => {
    const action = {
      type: logout.rejected.type,
      error: { message: errText },
    };
    const state = userSlice.reducer(initialUserState, action);
    expect(state).toEqual({
      ...initialUserState,
      isLoading: false,
      error: errText,
    });
  });
  //update user
  it('updateUserProfile Pending', () => {
    const action = { type: updateUserProfile.pending.type };
    const state = userSlice.reducer(initialUserState, action);
    expect(state).toEqual({
      ...initialUserState,
      isLoading: true,
      error: '',
    });
  });

  it('updateUserProfile fullfield', () => {
    const action = {
      type: updateUserProfile.fulfilled.type,
      payload: testUserRegisterResponse,
    };
    const state = userSlice.reducer(initialUserState, action);
    expect(state).toEqual({
      ...initialUserState,
      user: testUser,
      isAuthChecked: true,
      isLoading: false,
    });
  });

  it('updateUserProfile rejected', () => {
    const action = {
      type: updateUserProfile.rejected.type,
      error: { message: errText },
    };
    const state = userSlice.reducer(initialUserState, action);
    expect(state).toEqual({
      ...initialUserState,
      isLoading: false,
      error: errText,
    });
  });
});
