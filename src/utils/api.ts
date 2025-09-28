import properties from './properties';

export function checkResponse(
  res: Response
): Promise<unknown> | Record<string, unknown> {
  if (typeof res === 'object' && res !== null && 'ok' in res) {
    if (!res.ok) {
      return Promise.reject(new Error('Failed to fetch data.'));
    } else {
      return res.json();
    }
  } else {
    return Promise.reject(new Error('Failed to fetch data.'));
  }
}

export function passwordReset(
  email: string
): Promise<unknown> | Record<string, unknown> {
  return fetch(properties.api.baseUrl + properties.api.passwordResetUrl, {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify({
      email: email,
    }),
  }).then(checkResponse);
}

export function passwordResetReset(
  password: string
): Promise<unknown> | Record<string, unknown> {
  return fetch(properties.api.baseUrl + properties.api.passwordReseResettUrl, {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify({
      password: password,
      token: localStorage.getItem('accessToken')!,
    }),
  }).then(checkResponse);
}

export function userRegister(
  email: string,
  password: string,
  name: string
): Promise<unknown> | Record<string, unknown> {
  return fetch(properties.api.baseUrl + properties.api.registerUrl, {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify({
      password: password,
      email: email,
      name: name,
    }),
  }).then(checkResponse);
}

export function userLogin(
  email: string,
  password: string
): Promise<unknown> | Record<string, unknown> {
  return fetch(properties.api.baseUrl + properties.api.loginUrl, {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify({
      password: password,
      email: email,
    }),
  }).then(checkResponse);
}

export function userLogout(): Promise<unknown> | Record<string, unknown> {
  return fetch(properties.api.baseUrl + properties.api.logoutUrl, {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify({
      token: localStorage.getItem('refreshToken')!,
    }),
  }).then(checkResponse);
}

export function getNewToken(): Promise<unknown> | Record<string, unknown> {
  return fetch(properties.api.baseUrl + properties.api.tokenUrl, {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify({
      token: localStorage.getItem('refreshToken')!,
    }),
  }).then(checkResponse);
}

export function getUserInfo(): Promise<unknown> | Record<string, unknown> {
  return fetch(properties.api.baseUrl + properties.api.userUrl, {
    method: 'GET',

    headers: {
      'Content-Type': 'application/json',
      authorization: localStorage.getItem('accessToken')!,
    },
  }).then(checkResponse);
}

export function updateUserInfo(
  email: string,
  password: string,
  name: string
): Promise<unknown> | Record<string, unknown> {
  return fetch(properties.api.baseUrl + properties.api.userUrl, {
    method: 'PATCH',

    headers: {
      'Content-Type': 'application/json',
      authorization: localStorage.getItem('accessToken')!,
    },

    body: JSON.stringify({
      name: name,
      password: password,
      email: email,
    }),
  }).then(checkResponse);
}

export const isTokenExists = (): boolean => !!localStorage.getItem('accessToken');
