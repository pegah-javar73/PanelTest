import React from "react";
import { X } from "lucide-react";
import UserForm from "../form/view";
import { useUserContext } from "../../namespace";
import { CrudMode } from "../../enum";
import type { IUserFormData } from "../../type";

const UserModal: React.FC = () => {
  const {
    isModalOpen,
    setIsModalOpen,
    currentUser,
    setCurrentUser,
    crudMode,
    setCrudMode,
    createUser,
    updateUser,
    loading,
  } = useUserContext();

  if (!isModalOpen) return null;

  const handleClose = () => {
    setIsModalOpen(false);
    setCurrentUser(null);
    setCrudMode(CrudMode.CREATE);
  };

  const handleSubmit = async (formData: IUserFormData) => {
    try {
      if (crudMode === CrudMode.CREATE) {
        await createUser(formData);
      } else if (crudMode === CrudMode.EDIT && currentUser) {
        await updateUser(currentUser.id, formData);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("خطا در ذخیره اطلاعات");
    }
  };

  const initialData = currentUser ? {
    name: currentUser.name,
    phone: currentUser.phone,
    accessLevel: currentUser.accessLevel,
    status: currentUser.status,
  } : undefined;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative">
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute -top-2 -left-2 z-10 bg-white rounded-full p-1 shadow-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <X className="w-5 h-5 text-gray-600" />
          </button>
          
          {/* Form */}
          <UserForm
            onSubmit={handleSubmit}
            initialData={initialData}
            mode={crudMode}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default UserModal;
