import React from 'react';
import { LogOut, User, LayoutDashboard } from 'lucide-react';
import { useAuthContext } from '../../pages/auth/namespace';
import Button from './button';

const Header: React.FC = () => {
  const { token, logout } = useAuthContext();

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo/Brand */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
              <LayoutDashboard className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">پنل مدیریت</h1>
          </div>

          {/* User Info & Actions */}
          <div className="flex items-center gap-4">
            {token && (
              <div className="flex items-center gap-3">
               
                
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-gray-500" />
                </div>
              </div>
            )}
            
            <Button
              onClick={handleLogout}
              variant="secondary"
              size="sm"
              icon={LogOut}
              iconPosition="left"
              className="text-gray-600 hover:text-gray-800"
            >
              خروج
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;