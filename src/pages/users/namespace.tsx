"use client";
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { 
  IUser, 
  IUserFormData, 
  IUserContext, 
  IUserNamespaceProps
} from "./type";
import { UserStatus, CrudMode } from "./enum";

const UserContext = createContext<IUserContext | null>(null);

export const useUserContext = (): IUserContext => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within UserNamespace");
  }
  return context;
};

export const UserNamespace = ({ children }: IUserNamespaceProps) => {
  // State management
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  const [crudMode, setCrudMode] = useState<CrudMode>(CrudMode.CREATE);
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const itemsPerPage = 10;
  
  // Search and filter state
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<UserStatus | "all">("all");
  
  // Selection state
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  // Mock API functions (replace with real API calls)
  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock data
      const mockUsers: IUser[] = [
        {
          id: "1",
          name: "محمد رفیعی",
          phone: "09129591900",
          accessLevel: "admin",
          lastUpdate: "1403/06/11-10:46:07",
          status: UserStatus.ACTIVE,
        },
        {
          id: "2", 
          name: "کیان شکوهیان",
          phone: "09366101072",
          accessLevel: "user",
          lastUpdate: "1403/06/11-10:46:07",
          status: UserStatus.ACTIVE,
        },
        {
          id: "3",
          name: "مهسا زارع",
          phone: "09207958656",
          accessLevel: "moderator", 
          lastUpdate: "1403/06/11-10:46:07",
          status: UserStatus.PENDING,
        },
        {
          id: "4",
          name: "سید کمال ساجدی راد",
          phone: "02298594041",
          accessLevel: "admin",
          lastUpdate: "1403/06/11-10:46:07",
          status: UserStatus.ACTIVE,
        },
        {
          id: "5",
          name: "مدیر سیستم",
          phone: "Admin",
          accessLevel: "admin",
          lastUpdate: "1403/06/11-10:46:07",
          status: UserStatus.ACTIVE,
        },
      ];
      
      // Apply filters
      let filteredUsers = mockUsers;
      
      if (searchTerm) {
        filteredUsers = filteredUsers.filter(user => 
          user.name.includes(searchTerm) || 
          user.phone.includes(searchTerm)
        );
      }
      
      if (statusFilter !== "all") {
        filteredUsers = filteredUsers.filter(user => user.status === statusFilter);
      }
      
      // Calculate pagination
      const total = filteredUsers.length;
      const pages = Math.ceil(total / itemsPerPage);
      const startIndex = (currentPage - 1) * itemsPerPage;
      const paginatedUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);
      
      setUsers(paginatedUsers);
      setTotalPages(pages);
      
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchTerm, statusFilter]);

  // CRUD operations
  const createUser = async (userData: IUserFormData): Promise<void> => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser: IUser = {
        id: Date.now().toString(),
        ...userData,
        lastUpdate: new Date().toLocaleDateString('fa-IR') + '-' + new Date().toLocaleTimeString('fa-IR'),
      };
      
      // Add to mock data storage
      const existingUsers = JSON.parse(localStorage.getItem('mockUsers') || '[]');
      const updatedUsers = [newUser, ...existingUsers];
      localStorage.setItem('mockUsers', JSON.stringify(updatedUsers));
      
      setIsModalOpen(false);
      setCurrentUser(null);
      
      // Refresh the users list
      await fetchUsers();
      
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (id: string, userData: IUserFormData): Promise<void> => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update in mock data storage
      const existingUsers = JSON.parse(localStorage.getItem('mockUsers') || '[]');
      const updatedUsers = existingUsers.map((user: IUser) => 
        user.id === id 
          ? { 
              ...user, 
              ...userData,
              lastUpdate: new Date().toLocaleDateString('fa-IR') + '-' + new Date().toLocaleTimeString('fa-IR'),
            }
          : user
      );
      localStorage.setItem('mockUsers', JSON.stringify(updatedUsers));
      
      setIsModalOpen(false);
      setCurrentUser(null);
      
      // Refresh the users list
      await fetchUsers();
      
    } catch (error) {
      console.error("Error updating user:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id: string): Promise<void> => {
    setLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Remove from mock data storage
      const existingUsers = JSON.parse(localStorage.getItem('mockUsers') || '[]');
      const updatedUsers = existingUsers.filter((user: IUser) => user.id !== id);
      localStorage.setItem('mockUsers', JSON.stringify(updatedUsers));
      
      setSelectedUsers(prev => prev.filter(userId => userId !== id));
      
      // Refresh the users list
      await fetchUsers();
      
    } catch (error) {
      console.error("Error deleting user:", error);
      throw error;
    } finally {
      setLoading(false);
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

  // Load users on mount and when dependencies change
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const contextValue: IUserContext = {
    users,
    setUsers,
    loading,
    setLoading,
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
    currentPage,
    setCurrentPage,
    totalPages,
    itemsPerPage,
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    selectedUsers,
    setSelectedUsers,
    toggleUserSelection,
    selectAllUsers,
    clearSelection,
  };

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  );
};
