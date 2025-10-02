"use client";
import { createContext, useContext, useState, useMemo, useEffect } from "react";
import type { 
  IUser, 
  IUserFormData, 
  IUserContext, 
  IUserNamespaceProps
} from "./type";
import { UserStatus, CrudMode } from "./enum";
import { usePaginatedData } from "../../components/grid/hooks/usePaginatedData";
import { useDeleteUser, useBulkDeleteUsers } from "./hooks/useDeleteUser";
import { ConfirmationDialog } from "../../components/common";

const UserContext = createContext<IUserContext | null>(null);

export const useUserContext = (): IUserContext => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within UserNamespace");
  }
  return context;
};

export const UserNamespace = ({ 
  children, 
  apiUrl = "/api/users", 
  perPage = 6 
}: IUserNamespaceProps) => {
  // Hooks for delete operations
  const deleteUserMutation = useDeleteUser();
  const bulkDeleteUsersMutation = useBulkDeleteUsers();

  // State management
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [crudMode, setCrudMode] = useState<CrudMode>(CrudMode.CREATE);
  
  // Confirmation dialog state
  const [confirmationDialog, setConfirmationDialog] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    loading: boolean;
  }>({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: () => {},
    loading: false,
  });
  
  // Search and filter state
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<UserStatus | "all">("all");
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  
  // Debug pagination changes
  useEffect(() => {
    console.log('Current page changed to:', currentPage);
  }, [currentPage]);
  
  // Selection state
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  // Use paginated query for users data
  const {
    data: paginatedData,
    isLoading,
    error,
  } = usePaginatedData<any>({
    url: apiUrl,
    queryKey: ["users", searchTerm, statusFilter, apiUrl],
    per_page: perPage, 
    page: currentPage,
  });

  // Debug API data changes
  useEffect(() => {
    console.log('API data changed:', paginatedData);
  }, [paginatedData]);

  // Map paginated data to our user format
  const users = useMemo(() => {
    if (!paginatedData?.data) return [];
    
    const mappedUsers = paginatedData.data.map((user: any) => ({
      id: user.id.toString(),
      name: `${user.first_name || ''} ${user.last_name || ''}`.trim() || '---',
      phone: user.email || '', // Using email as phone since reqres.in doesn't have phone
      accessLevel: "user", // Default access level
      lastUpdate: new Date().toLocaleDateString('fa-IR') + '-' + new Date().toLocaleTimeString('fa-IR'),
      status: UserStatus.ACTIVE,
      avatar: user.avatar,
      email: user.email || '',
    }));
    
    console.log('Mapped users for page', currentPage, ':', mappedUsers);
    return mappedUsers;
  }, [paginatedData, currentPage]);

  // Handle authentication errors
  useEffect(() => {
    if (error) {
      console.error('Users API error:', error);
      // If it's an authentication error, the AuthErrorHandler will handle it
      if (error.message?.includes('Authentication failed')) {
        // Don't show additional error messages, let the AuthErrorHandler handle it
        return;
      }
    }
  }, [error]);

  // Create pagination props for traditional pagination mode
  const paginationProps = {
    currentPage,
    totalPages: paginatedData?.total_pages || 1,
    setCurrentPage: (page: number) => {
      console.log('setCurrentPage called with:', page);
      setCurrentPage(page);
    },
  };

  // Reset to first page when search or filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter]);

  // CRUD operations
  const createUser = async (_userData: IUserFormData): Promise<void> => {
    try {
      // TODO: Replace with actual API call
      // await httpService.post('/api/users', userData);
      
      setIsModalOpen(false);
      setCurrentUser(null);
      
      // Invalidate and refetch the query
      // queryClient.invalidateQueries(['users']);
      
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  };

  const updateUser = async (_id: string, _userData: IUserFormData): Promise<void> => {
    try {
      // TODO: Replace with actual API call
      // await httpService.put(`/api/users/${id}`, userData);
      
      setIsModalOpen(false);
      setCurrentUser(null);
      
      // Invalidate and refetch the query
      // queryClient.invalidateQueries(['users']);
      
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    }
  };

  const deleteUser = async (id: string): Promise<void> => {
    try {
      await deleteUserMutation.mutateAsync(id);
      // Remove from selected users if it was selected
      setSelectedUsers(prev => prev.filter(userId => userId !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    }
  };

  const bulkDeleteUsers = async (ids: string[]): Promise<void> => {
    try {
      await bulkDeleteUsersMutation.mutateAsync(ids);
      // Clear selection after successful bulk delete
      setSelectedUsers([]);
    } catch (error) {
      console.error("Error bulk deleting users:", error);
      throw error;
    }
  };

  const getUserById = (id: string): IUser | undefined => {
    return users.find(user => user.id === id);
  };

  // Selection functions
  const toggleUserSelection = (id: string) => {
    setSelectedUsers(prev => 
      prev.includes(id) 
        ? prev.filter(userId => userId !== id)
        : [...prev, id]
    );
  };

  const selectAllUsers = () => {
    setSelectedUsers(users.map(user => user.id));
  };

  const clearSelection = () => {
    setSelectedUsers([]);
  };

  // Confirmation dialog helpers
  const showConfirmation = (title: string, message: string, onConfirm: () => void) => {
    setConfirmationDialog({
      isOpen: true,
      title,
      message,
      onConfirm,
      loading: false,
    });
  };

  const closeConfirmation = () => {
    setConfirmationDialog(prev => ({ ...prev, isOpen: false }));
  };

  const setConfirmationLoading = (loading: boolean) => {
    setConfirmationDialog(prev => ({ ...prev, loading }));
  };

  const contextValue: IUserContext = {
    users,
    loading: isLoading,
    createUser,
    updateUser,
    deleteUser,
    bulkDeleteUsers,
    getUserById,
    isModalOpen,
    setIsModalOpen,
    currentUser,
    setCurrentUser,
    crudMode,
    setCrudMode,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    selectedUsers,
    setSelectedUsers,
    toggleUserSelection,
    selectAllUsers,
    clearSelection,
    paginationProps,
    // Confirmation dialog
    showConfirmation,
    closeConfirmation,
    setConfirmationLoading,
    confirmationDialog,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
      
      {/* Confirmation Dialog */}
      <ConfirmationDialog
        isOpen={confirmationDialog.isOpen}
        onClose={closeConfirmation}
        onConfirm={confirmationDialog.onConfirm}
        title={confirmationDialog.title}
        message={confirmationDialog.message}
        loading={confirmationDialog.loading}
        type="danger"
        confirmText="حذف"
        cancelText="انصراف"
      />
    </UserContext.Provider>
  );
};
