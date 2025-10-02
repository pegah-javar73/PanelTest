import React from "react";
import { Plus, Trash2 } from "lucide-react";

interface ActionButtonsProps {
  selectedUsersCount: number;
  onBulkDelete: () => void;
  onCreate: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  selectedUsersCount,
  onBulkDelete,
  onCreate,
}) => {
  return (
    <div className="flex gap-2">
      {selectedUsersCount > 0 && (
        <button
          onClick={onBulkDelete}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
        >
          <Trash2 className="w-4 h-4" />
          حذف انتخاب شده ({selectedUsersCount})
        </button>
      )}

      <button
        onClick={onCreate}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
      >
        <Plus className="w-4 h-4" />
        افزودن کاربر
      </button>
    </div>
  );
};

export default ActionButtons;
