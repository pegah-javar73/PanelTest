export interface CreateUserData {
    username: string;
    email: string;
    password: string;
  }
  
  export interface UpdateUserData {
    username: string;
    email: string;
    password?: string;
  }
  
  export interface UserResponse {
    id: number;
    username?: string;
    email: string;
    first_name?: string;
    last_name?: string;
    avatar?: string;
    createdAt?: string;
    updatedAt?: string;
  }
  
  export interface UsersListResponse {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    data: UserResponse[];
  }