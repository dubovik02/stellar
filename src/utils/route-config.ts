enum AppRoutes {
  MAIN = 'main',
  HOME = 'home',
  REGISTER = 'register',
  LOGIN = 'login',
  PROFILE = 'profile',
  NOT_FOUND = 'not_found',
  INGREDIENTS = 'ingredients',
}

export const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: '/',
  [AppRoutes.HOME]: '/home',
  [AppRoutes.INGREDIENTS]: '/ingredients/:ingredientId',
  [AppRoutes.REGISTER]: '/register',
  [AppRoutes.LOGIN]: '/login',
  [AppRoutes.PROFILE]: '/profile',
  [AppRoutes.NOT_FOUND]: '*',
};
