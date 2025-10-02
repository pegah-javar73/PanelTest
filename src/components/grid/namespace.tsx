"use client";
import { createContext, useContext, useState, useEffect } from "react";
import GridBody from "./components/body/view";
import GridHeader from "./components/header/view";
import { type IGridContext, type IProps } from "./type";
import { Sort_Enum, Type_Enum } from "./enum";

const GridContext = createContext<IGridContext<any> | null>(null);

export const useGridContext = <T,>(): IGridContext<T> => {
  const context = useContext(GridContext) as IGridContext<T>;
  if (!context) {
    throw new Error("useGridContext must be used within its Provider");
  }
  return context;
};

export const GridNamespace = ({
  children,
  data,
  columns,
  selectable,
  singleSelect,
  onSelectionChange,
  pagination,
}: IProps) => {
  const [sortValue, setSortValue] = useState<Sort_Enum | undefined>(
    Sort_Enum.DESC
  );
  const { currentPage, setCurrentPage, totalPages } = pagination;

  // داده‌ها مستقیماً از API می‌آیند، نیازی به برش نیست
  const paginatedData = data;

  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const toggleRow = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const isSelected = (id: string) => selectedRows.includes(id);
  const toggleAll = () => {
    if (selectedRows.length === data.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(data.map((item) => item.id));
    }
  };
  const singleSelectRow = (id: string) => {
    setSelectedRows([id]);
  };
  useEffect(() => {
    onSelectionChange?.(selectedRows);
  }, [selectedRows]);

  return (
    <GridContext.Provider
      value={{
        columns,
        data: paginatedData,
        sortValue,
        setSortValue,
        currentPage,
        setCurrentPage,
        totalPages,
        rowsPerPage: 10, // یا از props دریافت کنید
        selectedRows,
        setSelectedRows,
        toggleRow,
        isSelected,
        toggleAll,
        singleSelectRow,
        selectable,
        singleSelect,
        pagination,
      }}>
      {children}
    </GridContext.Provider>
  );
};
export { GridHeader, GridBody };
