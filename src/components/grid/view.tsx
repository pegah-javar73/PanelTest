
import { GridBody, GridHeader, GridNamespace } from "./namespace";
import type { IColumn, IData, IPagination } from "./type";
import GridHeaderTitle from "./components/gridHeader/gridHeaderTitle";
import GridPagination from "./components/pagination/view";
import { GridSkeleton } from "./components/loading/gridLoading";

interface GridProps<T> {
  columns: IColumn[];
  data: T[];
  className?: string;
  tableClassName?: string;
  emptyText?: string;
  selectable?: boolean;
  singleSelect?: boolean;
  onSelectionChange?: (selectedIds: string[]) => void;
  title?: string;
  pagination: IPagination;
  loading: boolean;
}

export const Grid = <T extends IData>({
  columns,
  data,
  className = "",
  tableClassName = "",
  emptyText = "هیچ داده‌ای یافت نشد",
  selectable,
  singleSelect,
  onSelectionChange,
  title,
  pagination,
  loading,
}: GridProps<T>) => {
  return (
    <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200">
      <GridHeaderTitle title={title} />
      <GridNamespace
        columns={columns}
        data={data}
        pagination={pagination}
        selectable={selectable}
        singleSelect={singleSelect}
        onSelectionChange={onSelectionChange}>
        <div className={`overflow-hidden ${className}`}>
          {loading ? (
            <GridSkeleton columns={columns} rows={5} />
          ) : (
            <div className="overflow-x-auto">
              <table className={`w-full border-collapse ${tableClassName}`}>
                <GridHeader />

                {data?.length > 0 ? (
                  <GridBody />
                ) : (
                  <tbody>
                    <tr>
                      <td
                        colSpan={columns.length + (selectable ? 1 : 0)}
                        className="text-center py-12 text-sm text-gray-500 bg-gray-50">
                        <div className="flex flex-col items-center gap-2">
                          <div className="text-gray-400">
                            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                          </div>
                          <span>{emptyText}</span>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                )}
              </table>
            </div>
          )}
        </div>
        <GridPagination />
      </GridNamespace>
    </div>
  );
};
