import React from "react";
import { Edit, Trash2, Eye } from "lucide-react";
import type { IUser } from "../../../type";

interface UserRowActionsProps {
  user: IUser;
  onView: (user: IUser) => void;
  onEdit: (user: IUser) => void;
  onDelete: (user: IUser) => void;
}

const UserRowActions: React.FC<UserRowActionsProps> = ({
  user,
  onView,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => onView(user)}
        className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
        title="مشاهده"
      >
        <Eye className="w-4 h-4" />
      </button>
      
      <button
        onClick={() => onEdit(user)}
        className="p-1 text-green-600 hover:bg-green-50 rounded transition-colors"
        title="ویرایش"
      >
        <Edit className="w-4 h-4" />
      </button>
      
      <button
        onClick={() => onDelete(user)}
        className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
        title="حذف"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
};

export default UserRowActions;
