import { lazy } from 'react';

export const LazyUsersPage = lazy(() => 
  import('../pages/users/view').then(module => ({ 
    default: module.default 
  }))
);

export const LazyUserFormPage = lazy(() => 
  import('../pages/users/form/view').then(module => ({ 
    default: module.default 
  }))
);

export const LazyAuthPage = lazy(() => 
  import('../pages/auth/view').then(module => ({ 
    default: module.default 
  }))
);