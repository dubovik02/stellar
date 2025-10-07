enum AppRoutes {
  MAIN = 'main',
  HOME = 'home',
  REGISTER = 'register',
  LOGIN = 'login',
  FORGOT_PASSWORD = 'forgot_password',
  RESET_PASSWORD = 'reset_password',
  PROFILE = 'profile',
  PROFILE_PROFILE = 'profile_profile',
  NOT_FOUND = 'not_found',
  INGREDIENTS = 'ingredients',
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: '/',
  [AppRoutes.HOME]: '/home',
  [AppRoutes.INGREDIENTS]: '/ingredients/:ingredientId',
  [AppRoutes.REGISTER]: '/register',
  [AppRoutes.LOGIN]: '/login',
  [AppRoutes.FORGOT_PASSWORD]: '/forgot-password',
  [AppRoutes.RESET_PASSWORD]: '/reset-password',
  [AppRoutes.PROFILE]: '/profile',
  [AppRoutes.PROFILE_PROFILE]: '/profile/profile',
  [AppRoutes.NOT_FOUND]: '*',
};
