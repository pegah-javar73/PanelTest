import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowRight, Save, User, Mail, Lock } from "lucide-react";
import { useCreateUser, useGetUser, useUpdateUser, type CreateUserData, type UpdateUserData } from "../../hooks";
import { Button, InputField } from "../../../../components/common";


const UserFormPageContent: React.FC = () => {
  const navigate = useNavigate();
  const { mode, id } = useParams<{ mode: string; id?: string }>();
  
  // React Query hooks
  const createUserMutation = useCreateUser();
  const updateUserMutation = useUpdateUser();
  const { data: userData, isLoading: isLoadingUser } = useGetUser(id || '');

  const [formData, setFormData] = useState<CreateUserData>({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<Partial<CreateUserData>>({});

  // Determine the current mode
  const isEditMode = mode === 'edit';
  const isViewMode = mode === 'view';
  const isCreateMode = mode === 'create';
  const isReadOnly = isViewMode;

  // Initialize form data for edit/view modes
  useEffect(() => {
    if ((isEditMode || isViewMode) && userData) {
      setFormData({
        username: userData.username || `${userData.first_name || ''} ${userData.last_name || ''}`.trim(),
        email: userData.email || '',
        password: '', // Don't populate password for security
      });
    } else if (isCreateMode) {
      setFormData({
        username: "",
        email: "",
        password: "",
      });
    }
  }, [isEditMode, isViewMode, isCreateMode, userData]);

  // Validation function
  const validateForm = (): boolean => {
    const newErrors: Partial<CreateUserData> = {};

    // Username validation
    if (!formData.username.trim()) {
      newErrors.username = "نام کاربری الزامی است";
    } else if (formData.username.trim().length < 3) {
      newErrors.username = "نام کاربری باید حداقل ۳ کاراکتر باشد";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "ایمیل الزامی است";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "فرمت ایمیل معتبر نیست";
    }

    // Password validation (only for create mode or if password is provided in edit mode)
    if (isCreateMode) {
      if (!formData.password.trim()) {
        newErrors.password = "رمز عبور الزامی است";
      } else if (formData.password.length < 6) {
        newErrors.password = "رمز عبور باید حداقل ۶ کاراکتر باشد";
      }
    } else if (isEditMode && formData.password && formData.password.length < 6) {
      newErrors.password = "رمز عبور باید حداقل ۶ کاراکتر باشد";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      if (isCreateMode) {
        await createUserMutation.mutateAsync(formData);
        navigate('/', { 
          state: { message: 'کاربر با موفقیت ایجاد شد' } 
        });
      } else if (isEditMode && id) {
        const updateData: UpdateUserData = {
          username: formData.username,
          email: formData.email,
        };
        
        // Only include password if it's provided
        if (formData.password.trim()) {
          updateData.password = formData.password;
        }

        await updateUserMutation.mutateAsync({ 
          id, 
          userData: updateData 
        });
        navigate('/', { 
          state: { message: 'کاربر با موفقیت به‌روزرسانی شد' } 
        });
      }
    } catch (error: any) {
      console.error('Error saving user:', error);
      // Handle specific error messages
      if (error.message.includes('Authentication failed')) {
        navigate('/auth/login');
      }
    }
  };

  // Handle input changes
  const handleInputChange = (field: keyof CreateUserData, value: string) => {
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
    if (isCreateMode) return "افزودن کاربر جدید";
    if (isEditMode) return "ویرایش کاربر";
    if (isViewMode) return "مشاهده کاربر";
    return "فرم کاربر";
  };

  // Loading state
  const isLoading = createUserMutation.isPending || updateUserMutation.isPending || isLoadingUser;

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
            {/* Username Field */}
            <InputField
              label="نام کاربری"
              value={formData.username}
              onChange={(value) => handleInputChange("username", value)}
              icon={User}
              error={errors.username}
              disabled={isLoading}
              readOnly={isReadOnly}
              required
              placeholder="نام کاربری را وارد کنید"
            />

            {/* Email Field */}
            <InputField
              label="ایمیل"
              value={formData.email}
              onChange={(value) => handleInputChange("email", value)}
              type="email"
              icon={Mail}
              error={errors.email}
              disabled={isLoading}
              readOnly={isReadOnly}
              required
              placeholder="example@domain.com"
            />

            {/* Password Field */}
            <InputField
              label={isEditMode ? "رمز عبور جدید (اختیاری)" : "رمز عبور"}
              value={formData.password}
              onChange={(value) => handleInputChange("password", value)}
              type="password"
              icon={Lock}
              error={errors.password}
              disabled={isLoading}
              readOnly={isReadOnly}
              required={isCreateMode}
              placeholder={isEditMode ? "برای تغییر رمز عبور وارد کنید" : "رمز عبور را وارد کنید"}
            />

            {/* Action Buttons */}
            <div className="flex gap-3 pt-6 border-t border-gray-200">
              <Button
                type="button"
                variant="secondary"
                onClick={handleBack}
                className="flex-1"
                disabled={isLoading}
              >
                انصراف
              </Button>
              
              {!isReadOnly && (
                <Button
                  type="submit"
                  variant="primary"
                  loading={isLoading}
                  icon={Save}
                  iconPosition="right"
                  className="flex-1"
                >
                  {isCreateMode ? "ایجاد کاربر" : "ذخیره تغییرات"}
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
  return <UserFormPageContent />;
};

export default UserFormPage;