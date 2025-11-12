export default {
  api: {
    baseUrl: 'https://norma.education-services.ru/api',
    ingredientsUrl: '/ingredients',
    orderUrl: '/orders',
    passwordResetUrl: '/password-reset',
    passwordReseResettUrl: '/password-reset/reset',
    registerUrl: '/auth/register',
    loginUrl: '/auth/login',
    logoutUrl: '/auth/logout',
    tokenUrl: '/auth/token',
    userUrl: '/auth/user',
  },
  websocket: {
    baseUrl: 'wss://norma.education-services.ru',
    ordersAll: '/orders/all',
    usersOrders: '/orders',
  },
};
