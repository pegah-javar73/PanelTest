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
    bulkDeleteUsers,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    selectedUsers,
    paginationProps,
    showConfirmation,
    setConfirmationLoading,
    closeConfirmation,
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

  const handleDelete = (user: IUser) => {
    const title = "حذف کاربر";
    const message = `آیا از حذف کاربر اطمینان دارید؟`;
    
    showConfirmation(title, message, async () => {
      try {
        setConfirmationLoading(true);
        await deleteUser(user.id);
        closeConfirmation(); // Close modal after successful deletion
      } catch (error) {
        console.error("خطا در حذف کاربر:", error);
        closeConfirmation(); // Close modal even on error
        alert("خطا در حذف کاربر");
      } finally {
        setConfirmationLoading(false);
      }
    });
  };

  const handleBulkDelete = () => {
    if (selectedUsers.length === 0) return;
    
    const title = "حذف کاربران";
    const message = `آیا از حذف ${selectedUsers.length} کاربر انتخاب شده اطمینان دارید؟ این عمل قابل بازگشت نیست.`;
    
    showConfirmation(title, message, async () => {
      try {
        setConfirmationLoading(true);
        await bulkDeleteUsers(selectedUsers);
        closeConfirmation(); // Close modal after successful bulk deletion
      } catch (error) {
        console.error("خطا در حذف کاربران:", error);
        closeConfirmation(); // Close modal even on error
        alert("خطا در حذف کاربران");
      } finally {
        setConfirmationLoading(false);
      }
    });
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
