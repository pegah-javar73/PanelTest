import { useGridContext } from "../../namespace";
import type { IColumn } from "../../type";

const GridHeader = () => {
  const { columns, selectable, selectedRows, data, toggleAll } =
    useGridContext();

  return (
    <thead className="bg-gray-50">
      <tr className="border-b border-gray-200">
        {selectable && (
          <th className="px-6 py-4 text-center align-middle w-12">
            <input
              type="checkbox"
              checked={selectedRows.length === data?.length && data?.length > 0}
              onChange={toggleAll}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
            />
          </th>
        )}
        {columns.map((col: IColumn, index) => (
          <th
            className={`px-6 py-4 text-right align-middle font-semibold text-gray-700 text-sm ${
              index === columns.length - 1 ? '' : 'border-l border-gray-200'
            }`}
            key={String(col.key)}>
            {col.title}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default GridHeader;
