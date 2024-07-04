import React, { useState } from 'react';

interface DataItem {
  State: string;
  Range: string;
  Rate: number;
}

interface SortableTableProps {
  data: DataItem[];
}

const SortableTable: React.FC<SortableTableProps> = ({ data }) => {
  const [sortColumn, setSortColumn] = useState<keyof DataItem>('State');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const sortedData = [...data].sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1;
    if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const handleSort = (column: keyof DataItem) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            {(['State', 'Range', 'Rate'] as const).map((column) => (
              <th
                key={column}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort(column)}
              >
                {column}
                {sortColumn === column && (
                  <span className="ml-2">
                    {sortDirection === 'asc' ? '▲' : '▼'}
                  </span>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedData.map((item) => (
            <tr key={item.State}>
              <td className="px-6 py-4 whitespace-nowrap">{item.State}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.Range}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.Rate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SortableTable;