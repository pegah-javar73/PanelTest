import React from "react";

interface UserAvatarProps {
  avatar?: string;
  name?: string;
  size?: "sm" | "md" | "lg";
}

const UserAvatar: React.FC<UserAvatarProps> = ({ 
  avatar, 
  name, 
  size = "sm" 
}) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12", 
    lg: "w-16 h-16"
  };

  const textSizeClasses = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base"
  };

  return (
    <div className="flex items-center">
      {avatar ? (
        <img
          src={avatar}
          alt={name || 'User'}
          className={`${sizeClasses[size]} rounded-full object-cover`}
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      ) : (
        <div className={`${sizeClasses[size]} rounded-full bg-gray-300 flex items-center justify-center`}>
          <span className={`text-gray-600 ${textSizeClasses[size]} font-medium`}>
            {name ? name.charAt(0).toUpperCase() : 'U'}
          </span>
        </div>
      )}
    </div>
  );
};

export default UserAvatar;
