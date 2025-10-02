"use client";
import { createContext, useContext, useState, useEffect } from "react";
import GridBody from "./components/body/view";
import GridHeader from "./components/header/view";
import { type IGridContext, type IProps } from "./type";
import { Sort_Enum } from "./enum";

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
  infiniteScroll,
  apiUrl,
  perPage,
}: IProps) => {
  const [sortValue, setSortValue] = useState<Sort_Enum | undefined>(
    Sort_Enum.DESC
  );
  
  // Handle both pagination and infinite scroll modes
  const currentPage = pagination?.currentPage;
  const setCurrentPage = pagination?.setCurrentPage as React.Dispatch<React.SetStateAction<number>> | undefined;
  const totalPages = pagination?.totalPages;

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
      setSelectedRows(data.map((item: any) => item.id));
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
        rowsPerPage: perPage || 10,
        selectedRows,
        setSelectedRows,
        toggleRow,
        isSelected,
        toggleAll,
        singleSelectRow,
        selectable: selectable || false,
        singleSelect: singleSelect || false,
        pagination,
        infiniteScroll,
        apiUrl,
        perPage,
      }}>
      {children}
    </GridContext.Provider>
  );
};
export { GridHeader, GridBody };
