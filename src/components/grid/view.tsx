
import { GridBody, GridHeader, GridNamespace } from "./namespace";
import type { IColumn, IData, IPagination, IInfiniteScrollProps } from "./type";
import GridHeaderTitle from "./components/gridHeader/gridHeaderTitle";
import GridPagination from "./components/pagination/view";
import { GridSkeleton } from "./components/loading/gridLoading";
import { useEffect, useRef } from "react";

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
  pagination?: IPagination;
  infiniteScroll?: IInfiniteScrollProps;
  loading: boolean;
  fixedHeight?: number; // Height in pixels for the grid body
  apiUrl?: string; // API endpoint URL
  perPage?: number; // Items per page
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
  infiniteScroll,
  loading,
  fixedHeight = 400, // Default height 400px
  apiUrl = "/api/users", // Default API URL
  perPage = 6, // Default items per page
}: GridProps<T>) => {
  const observerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Infinite scroll observer
  useEffect(() => {
    if (!infiniteScroll || !observerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && infiniteScroll.hasNextPage && !infiniteScroll.isFetchingNextPage) {
          infiniteScroll.fetchNextPage();
        }
      },
      { threshold: 1.0 }
    );

    observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [infiniteScroll]);

  // No scroll-based pagination - using traditional pagination controls

  const isInfiniteMode = !!infiniteScroll;
  const isPaginationMode = !!pagination && !infiniteScroll;
  return (
    <div className="w-full bg-white rounded-lg shadow-sm border border-gray-200">
      <GridHeaderTitle title={title} />
      <GridNamespace
        columns={columns}
        data={data}
        pagination={pagination}
        infiniteScroll={infiniteScroll}
        selectable={selectable}
        singleSelect={singleSelect}
        onSelectionChange={onSelectionChange}
        apiUrl={apiUrl}
        perPage={perPage}>
        <>
          {/* Fixed height container with scroll */}
          <div 
            ref={scrollContainerRef}
            className={`overflow-auto border-t border-gray-200 ${className}`}
            style={{ height: `${fixedHeight}px` }}
          >
            {loading && data.length === 0 ? (
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
                
                {/* Infinite scroll loading indicator and observer */}
                {isInfiniteMode && (
                  <div>
                    {infiniteScroll?.isFetchingNextPage && (
                      <div className="flex justify-center py-4">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                      </div>
                    )}
                    <div ref={observerRef} className="h-1" />
                  </div>
                )}

                {/* Pagination mode loading indicator */}
                {isPaginationMode && loading && (
                  <div className="flex justify-center py-4 bg-gray-50">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                    <span className="mr-2 text-sm text-gray-600">در حال بارگذاری...</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Traditional pagination controls */}
          {isPaginationMode && (
            <div className="border-t border-gray-200">
              <GridPagination />
            </div>
          )}
        </>
      </GridNamespace>
    </div>
  );
};
