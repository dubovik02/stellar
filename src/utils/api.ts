import properties from './properties';

import type {
  TInfoResponse,
  TOrder,
  TOrderData,
  TRefreshTokenResponse,
  TUser,
  TUserInfoResponse,
  TUserRegisterResponse,
} from './types';

export function checkResponse<T>(res: Response): Promise<T> {
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

export function passwordReset(email: string): Promise<TInfoResponse> {
  return fetch(properties.api.baseUrl + properties.api.passwordResetUrl, {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify({
      email: email,
    }),
  }).then(checkResponse<TInfoResponse>);
}

export function passwordResetReset(
  password: string,
  code: string
): Promise<TInfoResponse> {
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
  ).then(checkResponse<TInfoResponse>);
}

export function userRegister(newUser: TUser): Promise<TUserRegisterResponse> {
  return fetch(properties.api.baseUrl + properties.api.registerUrl, {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify(newUser),
  }).then(checkResponse<TUserRegisterResponse>);
}

export function userLogin(user: TUser): Promise<TUserRegisterResponse> {
  return fetch(properties.api.baseUrl + properties.api.loginUrl, {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify({
      password: user.password,
      email: user.email,
    }),
  }).then(checkResponse<TUserRegisterResponse>);
}

export function userLogout(): Promise<TInfoResponse> {
  return fetch(properties.api.baseUrl + properties.api.logoutUrl, {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify({
      token: localStorage.getItem('refreshToken')!,
    }),
  }).then(checkResponse<TInfoResponse>);
}

export function getNewToken(): Promise<TRefreshTokenResponse> {
  return fetch(properties.api.baseUrl + properties.api.tokenUrl, {
    method: 'POST',

    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify({
      token: localStorage.getItem('refreshToken')!,
    }),
  }).then(checkResponse<TRefreshTokenResponse>);
}

export function getUserInfo(): Promise<TUserInfoResponse> {
  return fetchWithRefresh(properties.api.baseUrl + properties.api.userUrl, {
    method: 'GET',

    headers: {
      'Content-Type': 'application/json',
      authorization: localStorage.getItem('accessToken')!,
    },
  }).then(checkResponse<TUserInfoResponse>);
}

export function updateUserInfo(newUser: TUser): Promise<TUserInfoResponse> {
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
  }).then(checkResponse<TUserInfoResponse>);
}

export function createOrder(componentIdObj: TOrderData): Promise<TOrder> {
  return fetchWithRefresh(properties.api.baseUrl + properties.api.orderUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: localStorage.getItem('accessToken')!,
    },
    body: JSON.stringify(componentIdObj),
  }).then(checkResponse<TOrder>);
}

export const fetchWithRefresh = async (
  url: string,
  options: RequestInit
): Promise<Response> => {
  try {
    const res = await fetch(url, options);
    return res;
  } catch (err) {
    const msg = (err as Record<string, unknown>).message as string;
    if (msg === 'jwt expired') {
      const refreshData = await getNewToken(); //обновляем токен
      if (options.headers) {
        (options.headers as Record<string, string>).authorization =
          refreshData.accessToken;
        const res = await fetch(url, options); //повторяем запрос
        return res;
      } else {
        return Promise.reject(new Error(msg));
      }
    } else {
      return Promise.reject(new Error(msg));
    }
  }
};

export const isTokenExists = (): boolean => !!localStorage.getItem('accessToken');
