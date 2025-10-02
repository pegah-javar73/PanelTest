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
  // State management
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [crudMode, setCrudMode] = useState<CrudMode>(CrudMode.CREATE);
  
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
      // TODO: Replace with actual API call
      // await httpService.delete(`/api/users/${id}`);
      
      setSelectedUsers(prev => prev.filter(userId => userId !== id));
      
      // Invalidate and refetch the query
      // queryClient.invalidateQueries(['users']);
      
    } catch (error) {
      console.error("Error deleting user:", error);
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

  const contextValue: IUserContext = {
    users,
    loading: isLoading,
    createUser,
    updateUser,
    deleteUser,
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
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};
