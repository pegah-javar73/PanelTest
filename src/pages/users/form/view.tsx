import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowRight, Save, User, Phone, Activity } from "lucide-react";
import { InputField, SelectField, Button } from "../../../components/common";
import type { IUserFormData } from "../type";
import { UserStatus, CrudMode } from "../enum";
import { useUserContext, UserNamespace } from "../namespace";

const UserFormPageContent: React.FC = () => {
  const navigate = useNavigate();
  const { mode, id } = useParams<{ mode: string; id?: string }>();
  const { users, createUser, updateUser, loading } = useUserContext();

  const [formData, setFormData] = useState<IUserFormData>({
    name: "",
    phone: "",
    accessLevel: "user",
    status: UserStatus.ACTIVE,
  });

  const [errors, setErrors] = useState<Partial<IUserFormData>>({});

  // Determine the current mode
  const currentMode = mode === 'create' ? CrudMode.CREATE : 
                     mode === 'edit' ? CrudMode.EDIT : 
                     mode === 'view' ? CrudMode.VIEW : CrudMode.CREATE;

  const isReadOnly = currentMode === CrudMode.VIEW;

  // Initialize form data for edit/view modes
  useEffect(() => {
    if ((currentMode === CrudMode.EDIT || currentMode === CrudMode.VIEW) && id) {
      const user = users.find(u => u.id === id);
      if (user) {
        setFormData({
          name: user.name,
          phone: user.phone,
          accessLevel: user.accessLevel,
          status: user.status,
        });
      }
    } else {
      setFormData({
        name: "",
        phone: "",
        accessLevel: "user",
        status: UserStatus.ACTIVE,
      });
    }
  }, [currentMode, id, users]);

  // Validation function
  const validateForm = (): boolean => {
    const newErrors: Partial<IUserFormData> = {};

    if (!formData.name.trim()) {
      newErrors.name = "نام الزامی است";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "نام باید حداقل ۲ کاراکتر باشد";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "شماره تلفن الزامی است";
    } else if (!/^(\+98|0)?9\d{9}$/.test(formData.phone.replace(/\s/g, ""))) {
      if (formData.phone !== "Admin") { // Allow Admin as special case
        newErrors.phone = "شماره تلفن معتبر نیست";
      }
    }

    if (!formData.accessLevel) {
      newErrors.accessLevel = "سطح دسترسی الزامی است";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        if (currentMode === CrudMode.CREATE) {
          await createUser(formData);
        } else if (currentMode === CrudMode.EDIT && id) {
          await updateUser(id, formData);
        }
        navigate('/');
      } catch (error) {
        console.error('Error saving user:', error);
      }
    }
  };

  // Handle input changes
  const handleInputChange = (field: keyof IUserFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  // Handle back navigation
  const handleBack = () => {
    navigate('/');
  };

  const getTitle = () => {
    switch (currentMode) {
      case CrudMode.CREATE:
        return "افزودن کاربر جدید";
      case CrudMode.EDIT:
        return "ویرایش کاربر";
      case CrudMode.VIEW:
        return "مشاهده کاربر";
      default:
        return "فرم کاربر";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4"
          >
            <ArrowRight className="w-4 h-4" />
            بازگشت به لیست کاربران
          </button>
          
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-3">
              <User className="w-6 h-6" />
              {getTitle()}
            </h1>
          </div>
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <InputField
              label="نام کاربر"
              value={formData.name}
              onChange={(value) => handleInputChange("name", value)}
              icon={User}
              error={errors.name}
              disabled={loading}
              readOnly={isReadOnly}
              required
              placeholder="نام کاربر را وارد کنید"
            />

            {/* Phone Field */}
            <InputField
              label="شماره تلفن"
              value={formData.phone}
              onChange={(value) => handleInputChange("phone", value)}
              type="tel"
              icon={Phone}
              error={errors.phone}
              disabled={loading}
              readOnly={isReadOnly}
              required
              placeholder="09xxxxxxxxx"
            />

            {/* Access Level Field */}
            <SelectField
              label="سطح دسترسی"
              value={formData.accessLevel}
              onChange={(value) => handleInputChange("accessLevel", value)}
              options={[
                { value: "admin", label: "مدیر سیستم" },
                { value: "moderator", label: "ناظر" },
                { value: "user", label: "کاربر" },
                { value: "viewer", label: "بازدیدکننده" }
              ]}
              error={errors.accessLevel}
              disabled={loading}
              readOnly={isReadOnly}
              required
            />

            {/* Status Field */}
            <SelectField
              label="وضعیت"
              value={formData.status}
              onChange={(value) => handleInputChange("status", value as UserStatus)}
              options={[
                { value: UserStatus.ACTIVE, label: "فعال" },
                { value: UserStatus.INACTIVE, label: "غیرفعال" },
                { value: UserStatus.PENDING, label: "در انتظار" }
              ]}
              icon={Activity}
              disabled={loading}
              readOnly={isReadOnly}
            />

            {/* Action Buttons */}
            <div className="flex gap-3 pt-6 border-t border-gray-200">
              <Button
                type="button"
                variant="secondary"
                onClick={handleBack}
                className="flex-1"
              >
                انصراف
              </Button>
              
              {!isReadOnly && (
                <Button
                  type="submit"
                  variant="primary"
                  loading={loading}
                  icon={Save}
                  iconPosition="right"
                  className="flex-1"
                >
                  {currentMode === CrudMode.CREATE ? "ایجاد کاربر" : "ذخیره تغییرات"}
                </Button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const UserFormPage: React.FC = () => {
  return (
    <UserNamespace>
      <UserFormPageContent />
    </UserNamespace>
  );
};

export default UserFormPage;