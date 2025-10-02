import React from 'react';
import { LogOut, User } from 'lucide-react';
import { useAuthContext } from '../../pages/auth/namespace';
import Button from './Button';

const Header: React.FC = () => {
  const { user, logout } = useAuthContext();

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
              <span className="text-white font-bold text-sm">S</span>
            </div>
            <h1 className="text-xl font-bold text-gray-900">سپرنا</h1>
          </div>

          {/* User Info & Actions */}
          <div className="flex items-center gap-4">
            {user && (
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">
                    {user.first_name} {user.last_name}
                  </p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                
                {user.avatar && (
                  <img
                    src={user.avatar}
                    alt={`${user.first_name} ${user.last_name}`}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                )}
                
                {!user.avatar && (
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-gray-500" />
                  </div>
                )}
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
