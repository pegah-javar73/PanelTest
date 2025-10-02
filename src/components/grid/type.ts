import type { Dispatch, JSX, SetStateAction } from "react";
import type { Sort_Enum, Type_Enum } from "./enum";

export interface IProps {
  children: JSX.Element | JSX.Element[];
  columns: IColumn[];
  data: any;
  selectable?: boolean;
  singleSelect?: boolean;
  onSelectionChange?: (selectedRows: string[]) => void;
  pagination: IPagination;
}
export interface IGridContext<T> {
  columns: IColumn[];
  data: T[];
  setSortValue: React.Dispatch<React.SetStateAction<Sort_Enum | undefined>>;
  sortValue?: Sort_Enum;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  totalPages: number;
  rowsPerPage: number;
  selectedRows: string[];
  setSelectedRows: (rows: string[]) => void;
  toggleRow: (id: string) => void;
  isSelected: (id: string) => boolean;
  toggleAll: () => void;
  singleSelectRow: (id: string) => void;
  selectable: boolean;
  singleSelect: boolean;
  pagination: IPagination;
}

export interface IColumn {
  key: string;
  title: string;
  hasSort?: boolean;
  hasFilte?: boolean;
  type: Type_Enum;
  render?: (value: any, row: any) => React.ReactNode;
}
export interface IData {
  [key: string]: any;
}
//------------------
export interface IPagination {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}
