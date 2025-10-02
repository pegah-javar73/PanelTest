// Route paths configuration
export const ROUTES = {
  // Main route - Users only
  HOME: '/',
  USERS: '/',
  USER_CREATE: '/users/create',
  USER_EDIT: '/users/edit/:id',
  USER_VIEW: '/users/view/:id',
} as const;

// Route metadata for navigation and breadcrumbs
export const ROUTE_META = {
  [ROUTES.HOME]: {
    title: 'مدیریت کاربران',
    breadcrumb: 'کاربران',
    icon: 'Users',
    requiresAuth: false,
  },
  [ROUTES.USER_CREATE]: {
    title: 'افزودن کاربر جدید',
    breadcrumb: 'افزودن کاربر',
    icon: 'UserPlus',
    requiresAuth: false,
  },
  [ROUTES.USER_EDIT]: {
    title: 'ویرایش کاربر',
    breadcrumb: 'ویرایش',
    icon: 'UserEdit',
    requiresAuth: false,
  },
  [ROUTES.USER_VIEW]: {
    title: 'مشاهده کاربر',
    breadcrumb: 'مشاهده',
    icon: 'UserView',
    requiresAuth: false,
  },
} as const;

// Helper functions for route manipulation
export const routeHelpers = {
  // Check if route requires authentication
  requiresAuth: (path: string): boolean => {
    const meta = Object.entries(ROUTE_META).find(([route]) => route === path);
    return meta?.[1]?.requiresAuth ?? false;
  },
  
  // Get route title
  getTitle: (path: string): string => {
    const meta = Object.entries(ROUTE_META).find(([route]) => route === path);
    return meta?.[1]?.title ?? 'مدیریت کاربران';
  },
  
  // Get route breadcrumb
  getBreadcrumb: (path: string): string => {
    const meta = Object.entries(ROUTE_META).find(([route]) => route === path);
    return meta?.[1]?.breadcrumb ?? 'کاربران';
  },
};
