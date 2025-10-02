import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';

import { ROUTES } from './config';
import { PageLoading } from '../components/common/LoadingSpinner';
import { LazyUsersPage, LazyUserFormPage, LazyAuthPage } from './LazyComponents';
import ProtectedRoute from './ProtectedRoute';
import { AuthNamespace } from '../pages/auth/namespace';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 1,
    },
  },
});

// Layout wrapper component
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="w-full">
        {children}
      </main>
    </div>
  );
};


// Error boundary for route errors
class RouteErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Route error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">خطا در بارگذاری صفحه</h2>
            <p className="text-gray-600 mb-4">مشکلی در بارگذاری این صفحه رخ داده است</p>
            <button 
              onClick={() => window.location.reload()}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              تلاش مجدد
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const AppRouter: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthNamespace>
          <RouteErrorBoundary>
            <Layout>
              <Suspense fallback={<PageLoading />}>
                <Routes>
                  {/* Authentication Route */}
                  <Route path={ROUTES.LOGIN} element={<LazyAuthPage />} />
                  
                  {/* Protected Routes */}
                  <Route 
                    path={ROUTES.HOME} 
                    element={
                      <ProtectedRoute>
                        <LazyUsersPage />
                      </ProtectedRoute>
                    } 
                  />
                  
                  {/* User Form Routes */}
                  <Route 
                    path="/users/:mode" 
                    element={
                      <ProtectedRoute>
                        <LazyUserFormPage />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/users/:mode/:id" 
                    element={
                      <ProtectedRoute>
                        <LazyUserFormPage />
                      </ProtectedRoute>
                    } 
                  />
                  
                  {/* Catch all route - redirect to home */}
                  <Route 
                    path="*" 
                    element={
                      <ProtectedRoute>
                        <LazyUsersPage />
                      </ProtectedRoute>
                    } 
                  />
                </Routes>
              </Suspense>
            </Layout>
          </RouteErrorBoundary>
        </AuthNamespace>
        <Toaster
          position="top-center"
          reverseOrder={false}
          gutter={8}
          toastOptions={{
            duration: 4000,
            style: {
              background: '#363636',
              color: '#fff',
              direction: 'rtl',
            },
            success: {
              duration: 3000,
              style: {
                background: '#10B981',
                color: '#fff',
              },
            },
            error: {
              duration: 4000,
              style: {
                background: '#EF4444',
                color: '#fff',
              },
            },
          }}
        />
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default AppRouter;
