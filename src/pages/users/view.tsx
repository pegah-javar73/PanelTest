import React from "react";
import { UserNamespace } from "./namespace";
import UserGrid from "./components/grid/view";
import UserModal from "./components/modal/view";
import { Header } from "../../components/common";

const UsersPage: React.FC = () => {
  return (
    <UserNamespace 
      apiUrl="/api/users" 
      perPage={6}>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <Header />
        
        <div className="p-4">
          <div className="max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 text-right">
                مدیریت کاربران
              </h1>
              <p className="text-gray-600 text-right mt-1">
                مدیریت کاربران سیستم، افزودن، ویرایش و حذف کاربران
              </p>
            </div>

            {/* User Grid */}
            <UserGrid />

            {/* User Modal */}
            <UserModal />
          </div>
        </div>
      </div>
    </UserNamespace>
  );
};

export default UsersPage;
