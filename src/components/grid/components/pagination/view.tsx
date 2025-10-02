import React from "react";
import { useGridContext } from "../../namespace";
import { ChevronLeft, ChevronRight } from "lucide-react";

const GridPagination = () => {
  const { pagination } = useGridContext<any>();
  const { currentPage, setCurrentPage, totalPages } = pagination;

  if (!totalPages || totalPages <= 1) return null;

  const createPageRange = () => {
    const pages: (number | "...")[] = [];

    const siblings = 1;
    const maxVisiblePages = 7;

    const left = Math.max(currentPage - siblings, 2);
    const right = Math.min(currentPage + siblings, totalPages - 1);

    pages.push(1);

    if (left > 2) {
      pages.push("...");
    }

    for (let i = left; i <= right; i++) {
      pages.push(i);
    }

    if (right < totalPages - 1) {
      pages.push("...");
    }

    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-lg">
      <div className="flex items-center justify-between">
        {/* اطلاعات صفحه */}
        <div className="text-sm text-gray-700">
          <span>تعداد کل رکوردها: {totalPages * 10}</span>
        </div>
        
        {/* کنترل‌های صفحه‌بندی */}
        <div className="flex items-center gap-2">
          {/* دکمه قبلی */}
          <button
            onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
            disabled={currentPage === 1}
            className="flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="صفحه قبلی">
            <ChevronRight className="w-4 h-4 ml-1" />
            قبلی
          </button>

          {/* شماره صفحات */}
          <div className="flex gap-1">
            {createPageRange().map((page, index) =>
              page === "..." ? (
                <span key={`ellipsis-${index}`} className="px-3 py-2 text-sm text-gray-400">
                  …
                </span>
              ) : (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-2 text-sm font-medium border rounded-md ${
                    currentPage === page
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                  }`}>
                  {page}
                </button>
              )
            )}
          </div>

          {/* دکمه بعدی */}
          <button
            onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="flex items-center px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="صفحه بعدی">
            بعدی
            <ChevronLeft className="w-4 h-4 mr-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GridPagination;
