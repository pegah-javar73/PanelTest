import type { Dispatch, SetStateAction } from "react";
import type { IPagination } from "../../components/grid/type";

// User data interface
export interface IUser {
  id: string;
  name: string;
  phone: string;
  accessLevel: string;
  lastUpdate: string;
  status: UserStatus;
}

// User form data interface
export interface IUserFormData {
  name: string;
  phone: string;
  accessLevel: string;
  status: UserStatus;
}

// User status enum
export enum UserStatus {
  ACTIVE = "active",
  INACTIVE = "inactive",
  PENDING = "pending",
}

// CRUD operation modes
export enum CrudMode {
  CREATE = "create",
  EDIT = "edit",
  VIEW = "view",
}

// User context interface
export interface IUserContext {
  users: IUser[];
  loading: boolean;
  
  // CRUD operations
  createUser: (userData: IUserFormData) => Promise<void>;
  updateUser: (id: string, userData: IUserFormData) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  getUserById: (id: string) => IUser | undefined;
  
  // Modal and form state
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  currentUser: IUser | null;
  setCurrentUser: Dispatch<SetStateAction<IUser | null>>;
  crudMode: CrudMode;
  setCrudMode: Dispatch<SetStateAction<CrudMode>>;
  
  // Search and filter
  searchTerm: string;
  setSearchTerm: Dispatch<SetStateAction<string>>;
  statusFilter: UserStatus | "all";
  setStatusFilter: Dispatch<SetStateAction<UserStatus | "all">>;
  
  // Selection
  selectedUsers: string[];
  setSelectedUsers: Dispatch<SetStateAction<string[]>>;
  toggleUserSelection: (id: string) => void;
  selectAllUsers: () => void;
  clearSelection: () => void;
  
  // Pagination
  paginationProps: IPagination;
}

// Props for user namespace
export interface IUserNamespaceProps {
  children: React.ReactNode;
  apiUrl?: string;
  perPage?: number;
}

// Props for user form
export interface IUserFormProps {
  onSubmit: (data: IUserFormData) => void;
  initialData?: IUserFormData;
  mode: CrudMode;
  loading?: boolean;
}

// Props for user grid
export interface IUserGridProps {
  className?: string;
}

// API response interfaces
export interface IUserApiResponse {
  data: IUser[];
  total: number;
  page: number;
  limit: number;
}

export interface IApiError {
  message: string;
  code?: string;
  details?: any;
}
