import React from "react";

interface GridSkeletonProps {
  columns: any[];
  rows?: number;
}

// Custom skeleton component using Tailwind CSS
const SkeletonBox: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className={`bg-gray-200 animate-pulse rounded ${className}`}></div>
);

export function GridSkeleton({ columns, rows = 5 }: GridSkeletonProps) {
  return (
    <div className="w-full p-0">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead className="bg-gray-50">
              <tr className="border-b border-gray-200">
                {columns.map((col, idx) => (
                  <th key={idx} className="px-6 py-4 text-right">
                    <SkeletonBox className="h-4 w-20" />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {Array.from({ length: rows }).map((_, rowIdx) => (
                <tr key={rowIdx} className="hover:bg-gray-50">
                  {columns.map((_, colIdx) => (
                    <td key={colIdx} className="px-6 py-4">
                      <SkeletonBox className="h-4 w-full" />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
