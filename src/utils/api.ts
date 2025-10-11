import properties from './properties';

import type { TUser } from './types';

export function checkResponse(
  res: Response
): Promise<unknown> | Record<string, unknown> {
  if (typeof res === 'object' && res !== null && 'ok' in res) {
    if (!res.ok) {
      return res
        .json()
        .then((res: Record<string, string>) => Promise.reject(new Error(res.message)));
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
  password: string,
  code: string
): Promise<unknown> | Record<string, unknown> {
  return fetchWithRefresh(
    properties.api.baseUrl + properties.api.passwordReseResettUrl,
    {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify({
        password: password,
        token: code,
      }),
    }
  ).then(checkResponse);
}

export function userRegister(
  newUser: TUser
): Promise<unknown> | Record<string, unknown> {
  return fetch(properties.api.baseUrl + properties.api.registerUrl, {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify(newUser),
  }).then(checkResponse);
}

export function userLogin(user: TUser): Promise<unknown> | Record<string, unknown> {
  return fetch(properties.api.baseUrl + properties.api.loginUrl, {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify({
      password: user.password,
      email: user.email,
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
  return fetchWithRefresh(properties.api.baseUrl + properties.api.userUrl, {
    method: 'GET',

    headers: {
      'Content-Type': 'application/json',
      authorization: localStorage.getItem('accessToken')!,
    },
  }).then(checkResponse);
}

export function updateUserInfo(
  newUser: TUser
): Promise<unknown> | Record<string, unknown> {
  return fetchWithRefresh(properties.api.baseUrl + properties.api.userUrl, {
    method: 'PATCH',

    headers: {
      'Content-Type': 'application/json',
      authorization: localStorage.getItem('accessToken')!,
    },

    body: JSON.stringify({
      name: newUser.name,
      password: newUser.password,
      email: newUser.email,
    }),
  }).then(checkResponse);
}

export function createOrder(
  componentIdObj: Record<string, unknown>
): Promise<unknown> | Record<string, unknown> {
  return fetchWithRefresh(properties.api.baseUrl + properties.api.orderUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: localStorage.getItem('accessToken')!,
    },
    body: JSON.stringify(componentIdObj),
  }).then(checkResponse);
}

export const fetchWithRefresh = async (
  url: string,
  options: Record<string, unknown>
): Promise<Response> => {
  try {
    const res = await fetch(url, options);
    return res;
  } catch (err) {
    const msg = (err as Record<string, unknown>).message as string;
    if (msg === 'jwt expired') {
      const refreshData = await getNewToken(); //обновляем токен
      (options.headers as Record<string, unknown>).authorization = (
        refreshData as Record<string, unknown>
      ).accessToken;
      const res = await fetch(url, options); //повторяем запрос
      return res;
    } else {
      return Promise.reject(new Error(msg));
    }
  }
};

export const isTokenExists = (): boolean => !!localStorage.getItem('accessToken');
