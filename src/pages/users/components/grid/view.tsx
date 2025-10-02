import React from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Edit, Trash2, Eye, Search, Filter } from "lucide-react";
import { Grid } from "../../../../components/grid/view";
import type { IColumn } from "../../../../components/grid/type";
import type { IUser, IUserGridProps } from "../../type";
import { useUserContext } from "../../namespace";
import { USER_STATUS_LABELS, ACCESS_LEVEL_LABELS } from "../../enum";

const UserGrid: React.FC<IUserGridProps> = ({ className }) => {
  const navigate = useNavigate();
  const {
    users,
    loading,
    deleteUser,
    currentPage,
    setCurrentPage,
    totalPages,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    selectedUsers,
    toggleUserSelection,
    selectAllUsers,
    clearSelection,
  } = useUserContext();

  // Handle CRUD operations
  const handleCreate = () => {
    navigate('/users/create');
  };

  const handleEdit = (user: IUser) => {
    navigate(`/users/edit/${user.id}`);
  };

  const handleView = (user: IUser) => {
    navigate(`/users/view/${user.id}`);
  };

  const handleDelete = async (user: IUser) => {
    if (window.confirm(`آیا از حذف کاربر "${user.name}" اطمینان دارید؟`)) {
      try {
        await deleteUser(user.id);
      } catch (error) {
        alert("خطا در حذف کاربر");
      }
    }
  };

  const handleBulkDelete = async () => {
    if (selectedUsers.length === 0) return;
    
    if (window.confirm(`آیا از حذف ${selectedUsers.length} کاربر انتخاب شده اطمینان دارید؟`)) {
      try {
        await Promise.all(selectedUsers.map(id => deleteUser(id)));
        clearSelection();
      } catch (error) {
        alert("خطا در حذف کاربران");
      }
    }
  };

  // Status badge component
  const StatusBadge = ({ status }: { status: string }) => {
    const statusColors = {
      active: "bg-green-100 text-green-800",
      inactive: "bg-red-100 text-red-800", 
      pending: "bg-yellow-100 text-yellow-800",
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[status as keyof typeof statusColors] || "bg-gray-100 text-gray-800"}`}>
        {USER_STATUS_LABELS[status as keyof typeof USER_STATUS_LABELS] || status}
      </span>
    );
  };

  // Access level badge component
  const AccessLevelBadge = ({ level }: { level: string }) => {
    const levelColors = {
      admin: "bg-purple-100 text-purple-800",
      moderator: "bg-blue-100 text-blue-800",
      user: "bg-gray-100 text-gray-800",
      viewer: "bg-green-100 text-green-800",
    };

    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${levelColors[level as keyof typeof levelColors] || "bg-gray-100 text-gray-800"}`}>
        {ACCESS_LEVEL_LABELS[level as keyof typeof ACCESS_LEVEL_LABELS] || level}
      </span>
    );
  };

  // Action buttons component
  const ActionButtons = ({ user }: { user: IUser }) => (
    <div className="flex items-center gap-2">
      <button
        onClick={() => handleView(user)}
        className="p-1 text-blue-600 hover:bg-blue-50 rounded"
        title="مشاهده">
        <Eye className="w-4 h-4" />
      </button>
      <button
        onClick={() => handleEdit(user)}
        className="p-1 text-green-600 hover:bg-green-50 rounded"
        title="ویرایش">
        <Edit className="w-4 h-4" />
      </button>
      <button
        onClick={() => handleDelete(user)}
        className="p-1 text-red-600 hover:bg-red-50 rounded"
        title="حذف">
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );

  // Define grid columns
  const columns: IColumn[] = [
    {
      key: "rowNumber",
      title: "ردیف",
      hasSort: false,
      type: "text" as any,
      render: (_, row) => {
        const index = users.findIndex(user => user.id === row.id);
        return (
          <span className="text-gray-500">
            {(currentPage - 1) * 10 + index + 1}
          </span>
        );
      },
    },
    {
      key: "name",
      title: "نام و نام خانوادگی",
      hasSort: true,
      type: "text" as any,
      render: (value) => (
        <span className="font-medium text-gray-900">{value}</span>
      ),
    },
    {
      key: "phone",
      title: "شماره تماس",
      hasSort: false,
      type: "text" as any,
      render: (value) => (
        <span className="text-gray-700 font-mono">{value}</span>
      ),
    },
    {
      key: "accessLevel",
      title: "سطح دسترسی",
      hasSort: true,
      type: "text" as any,
      render: (value) => <AccessLevelBadge level={value} />,
    },
    {
      key: "lastUpdate",
      title: "آخرین بروزرسانی اطلاعات",
      hasSort: true,
      type: "text" as any,
      render: (value) => (
        <span className="text-gray-600 text-sm font-mono">{value}</span>
      ),
    },
    {
      key: "status",
      title: "وضعیت",
      hasSort: true,
      type: "text" as any,
      render: (value) => <StatusBadge status={value} />,
    },
    {
      key: "actions",
      title: "عملیات",
      hasSort: false,
      type: "text" as any,
      render: (_, row) => <ActionButtons user={row} />,
    },
  ];

  // Pagination object
  const pagination = {
    currentPage,
    totalPages,
    setCurrentPage,
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Header with search and actions */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-3 flex-1">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="جستجو در نام یا شماره تلفن..."
                className="w-full pr-10 pl-3 py-2 border border-gray-300 rounded-md text-right focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Status Filter */}
            <div className="relative">
              <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="pr-10 pl-3 py-2 border border-gray-300 rounded-md text-right focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                <option value="all">همه وضعیت‌ها</option>
                <option value="active">فعال</option>
                <option value="inactive">غیرفعال</option>
                <option value="pending">در انتظار</option>
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            {selectedUsers.length > 0 && (
              <button
                onClick={handleBulkDelete}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2">
                <Trash2 className="w-4 h-4" />
                حذف انتخاب شده ({selectedUsers.length})
              </button>
            )}
            
            <button
              onClick={handleCreate}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              <Plus className="w-4 h-4" />
              افزودن کاربر
            </button>
          </div>
        </div>
      </div>

      {/* Grid */}
      <Grid
        columns={columns}
        data={users}
        loading={loading}
        pagination={pagination}
        selectable={true}
        onSelectionChange={(selectedIds) => {
          // Handle selection change if needed
        }}
        title="مدیریت کاربران"
        emptyText="هیچ کاربری یافت نشد"
      />
    </div>
  );
};

export default UserGrid;
