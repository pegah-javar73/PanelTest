import React from "react";
import type { IColumn } from "../../../../../components/grid/type";
import type { IUser } from "../../../type";
import UserAvatar from "./UserAvatar";
import UserRowActions from "./UserRowActions";

interface CreateColumnsParams {
  users: IUser[];
  currentPage: number;
  perPage: number;
  onView: (user: IUser) => void;
  onEdit: (user: IUser) => void;
  onDelete: (user: IUser) => void;
}

export const createUserGridColumns = ({
  users,
  currentPage,
  perPage,
  onView,
  onEdit,
  onDelete,
}: CreateColumnsParams): IColumn[] => [
  {
    key: "rowNumber",
    title: "ردیف",
    hasSort: false,
    type: "text" as any,
    render: (_, row) => {
      const index = users.findIndex(user => user.id === row.id);
      return (
        <span className="text-gray-500 font-medium">
          {((currentPage - 1) * perPage) + index + 1}
        </span>
      );
    },
  },
  {
    key: "name",
    title: "نام و نام خانوادگی",
    hasSort: true,
    type: "text" as any,
    render: (_, row) => (
      <span className="font-medium text-gray-900">
        {row.name || "---"}
      </span>
    ),
  },
  {
    key: "email",
    title: "ایمیل",
    hasSort: true,
    type: "text" as any,
    render: (_, row) => (
      <span className="text-gray-700">
        {row.email || "---"}
      </span>
    ),
  },
  {
    key: "avatar",
    title: "تصویر",
    hasSort: false,
    type: "text" as any,
    render: (value, row) => (
      <UserAvatar 
        avatar={value} 
        name={row.name} 
        size="sm" 
      />
    ),
  },
  {
    key: "actions",
    title: "عملیات",
    hasSort: false,
    type: "text" as any,
    render: (_, row) => (
      <UserRowActions
        user={row}
        onView={onView}
        onEdit={onEdit}
        onDelete={onDelete}
      />
    ),
  },
];
