import React from "react";
import { useNavigate } from "react-router-dom";
import { Grid } from "../../../../components/grid/view";
import type { IUser, IUserGridProps } from "../../type";
import { useUserContext } from "../../namespace";
import { createUserGridColumns, PageHeader } from "./components";


const UserGrid: React.FC<IUserGridProps> = ({ className }) => {
  const navigate = useNavigate();
  const {
    users,
    loading,
    deleteUser,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    selectedUsers,
    clearSelection,
    paginationProps,
  } = useUserContext();

  // CRUD Operations Handlers
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
    const confirmMessage = `آیا از حذف کاربر "${user.name}" اطمینان دارید؟`;
    if (window.confirm(confirmMessage)) {
      try {
        await deleteUser(user.id);
      } catch (error) {
        alert("خطا در حذف کاربر");
      }
    }
  };

  const handleBulkDelete = async () => {
    if (selectedUsers.length === 0) return;
    
    const confirmMessage = `آیا از حذف ${selectedUsers.length} کاربر انتخاب شده اطمینان دارید؟`;
    if (window.confirm(confirmMessage)) {
      try {
        await Promise.all(selectedUsers.map(id => deleteUser(id)));
        clearSelection();
      } catch (error) {
        alert("خطا در حذف کاربران");
      }
    }
  };

  // Generate grid columns
  const columns = createUserGridColumns({
    users,
    currentPage: paginationProps.currentPage,
    perPage: 6,
    onView: handleView,
    onEdit: handleEdit,
    onDelete: handleDelete,
  });

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Page Header with Search, Filter and Actions */}
      <PageHeader
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        selectedUsersCount={selectedUsers.length}
        onBulkDelete={handleBulkDelete}
        onCreate={handleCreate}
      />

      {/* Data Grid */}
      <Grid
        columns={columns}
        data={users}
        loading={loading}
        pagination={paginationProps}
        selectable={true}
        onSelectionChange={(_selectedIds) => {
          // Handle selection change if needed
        }}
        title="مدیریت کاربران"
        emptyText="هیچ کاربری یافت نشد"
        fixedHeight={500}
        apiUrl="/api/users"
        perPage={6}
      />
    </div>
  );
};

export default UserGrid;
