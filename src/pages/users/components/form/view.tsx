import React, { useState, useEffect } from "react";
import { Save, User, Phone, Activity } from "lucide-react";
import { InputField, SelectField, Button } from "../../../../components/common";
import type { IUserFormProps, IUserFormData } from "../../type";
import { UserStatus, CrudMode } from "../../enum";

const UserForm: React.FC<IUserFormProps> = ({ 
  onSubmit, 
  initialData, 
  mode, 
  loading = false 
}) => {
  const [formData, setFormData] = useState<IUserFormData>({
    name: "",
    phone: "",
    accessLevel: "user",
    status: UserStatus.ACTIVE,
  });

  const [errors, setErrors] = useState<Partial<IUserFormData>>({});

  // Initialize form data
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        name: "",
        phone: "",
        accessLevel: "user",
        status: UserStatus.ACTIVE,
      });
    }
  }, [initialData]);

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
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
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

  const isReadOnly = mode === CrudMode.VIEW;
  const title = mode === CrudMode.CREATE ? "افزودن کاربر جدید" : 
                mode === CrudMode.EDIT ? "ویرایش کاربر" : "مشاهده کاربر";

  return (
    <div className="bg-white rounded-lg shadow-lg max-w-md w-full mx-4">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <User className="w-5 h-5" />
          {title}
        </h2>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-6 space-y-4">
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
        {!isReadOnly && (
          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              variant="primary"
              loading={loading}
              icon={Save}
              iconPosition="right"
              fullWidth
            >
              {mode === CrudMode.CREATE ? "ایجاد کاربر" : "ذخیره تغییرات"}
            </Button>
          </div>
        )}
      </form>
    </div>
  );
};

export default UserForm;
