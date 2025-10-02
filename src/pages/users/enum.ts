// User status options
export enum UserStatus {
  ACTIVE = "active",
  INACTIVE = "inactive", 
  PENDING = "pending",
}

// Access level options
export enum AccessLevel {
  ADMIN = "admin",
  USER = "user",
  MODERATOR = "moderator",
  VIEWER = "viewer",
}

// CRUD operation modes
export enum CrudMode {
  CREATE = "create",
  EDIT = "edit",
  VIEW = "view",
}

// Sort options
export enum SortField {
  NAME = "name",
  PHONE = "phone",
  ACCESS_LEVEL = "accessLevel",
  LAST_UPDATE = "lastUpdate",
  STATUS = "status",
}

export enum SortDirection {
  ASC = "asc",
  DESC = "desc",
}

// User status labels in Persian
export const USER_STATUS_LABELS = {
  [UserStatus.ACTIVE]: "فعال",
  [UserStatus.INACTIVE]: "غیرفعال",
  [UserStatus.PENDING]: "در انتظار",
} as const;

// Access level labels in Persian
export const ACCESS_LEVEL_LABELS = {
  [AccessLevel.ADMIN]: "مدیر سیستم",
  [AccessLevel.USER]: "کاربر",
  [AccessLevel.MODERATOR]: "ناظر",
  [AccessLevel.VIEWER]: "بازدیدکننده",
} as const;

// Form validation messages
export const VALIDATION_MESSAGES = {
  REQUIRED: "این فیلد الزامی است",
  INVALID_PHONE: "شماره تلفن معتبر نیست",
  MIN_LENGTH: "حداقل {min} کاراکتر وارد کنید",
  MAX_LENGTH: "حداکثر {max} کاراکتر مجاز است",
} as const;
