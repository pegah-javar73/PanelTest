import React from "react";
import { useGridContext } from "../../namespace";

const GridBody = () => {
  const {
    data,
    columns,
    selectable,
    singleSelect,
    toggleRow,
    isSelected,
    singleSelectRow,
  } = useGridContext<any>();

  return (
    <tbody className="bg-white divide-y divide-gray-200">
      {data.map((row: any, rowIndex) => {
        const selected = isSelected(row.id);

        // فقط اگر singleSelect فعال باشه و selectable (checkbox) غیرفعال باشه، کلیک باعث انتخاب بشه
        const handleRowClick = () => {
          if (singleSelect && !selectable) {
            singleSelectRow(row.id);
          }
        };

        return (
          <tr
            key={row.id ?? rowIndex}
            onClick={handleRowClick}
            className={`hover:bg-gray-50 transition-colors duration-150 ${
              selected ? "bg-blue-50" : ""
            } ${
              singleSelect && !selectable ? "cursor-pointer" : ""
            }`}>
            {selectable && (
              <td className="px-6 py-4 text-center align-middle w-12" onClick={(e) => e.stopPropagation()}>
                <input
                  type="checkbox"
                  checked={selected}
                  onChange={() => {
                    if (singleSelect) {
                      singleSelectRow(row.id); // فقط یکی رو انتخاب کن
                    } else {
                      toggleRow(row.id); // multi-select
                    }
                  }}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                />
              </td>
            )}

            {columns.map((col, index) => (
              <td 
                key={String(col.key)}
                className={`px-6 py-4 text-right align-middle text-sm text-gray-900 ${
                  index === columns.length - 1 ? '' : 'border-l border-gray-200'
                }`}>
                {col.render
                  ? col.render(row[col.key], row)
                  : ((row[col.key] ?? "") as React.ReactNode)}
              </td>
            ))}
          </tr>
        );
      })}
    </tbody>
  );
};

export default GridBody;
