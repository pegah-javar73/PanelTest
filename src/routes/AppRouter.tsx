import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ROUTES } from './config';
import { PageLoading } from '../components/common/LoadingSpinner';
import { LazyUsersPage, LazyUserFormPage } from './LazyComponents';

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
    <BrowserRouter>
      <RouteErrorBoundary>
        <Layout>
          <Suspense fallback={<PageLoading />}>
            <Routes>
              {/* Main Route - Users Page */}
              <Route path={ROUTES.HOME} element={<LazyUsersPage />} />
              
              {/* User Form Routes */}
              <Route path="/users/:mode" element={<LazyUserFormPage />} />
              <Route path="/users/:mode/:id" element={<LazyUserFormPage />} />
              
              {/* Catch all route - redirect to users */}
              <Route path="*" element={<LazyUsersPage />} />
            </Routes>
          </Suspense>
        </Layout>
      </RouteErrorBoundary>
    </BrowserRouter>
  );
};

export default AppRouter;
