import React, { useState, useEffect, ChangeEvent } from "react";

interface DataItem {
  State: string;
  Range: string;
  Rate: number;
}

interface SortableTableProps {
  data: DataItem[];
}

const SortableTable: React.FC<SortableTableProps> = ({ data }) => {
  // State for managing the column to sort by
  const [sortColumn, setSortColumn] = useState<keyof DataItem>("State");
  // State for managing the direction of sorting
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  // State for managing filters
  const [filters, setFilters] = useState({
    State: "",
    Range: "",
    Rate: "",
    RateOperator: "",
  });
  // State for managing debounced filters to limit re-rendering
  const [debouncedFilters, setDebouncedFilters] = useState(filters);

  // Effect for debouncing filter changes
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedFilters(filters);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [filters]);

  // Function to get unique values for filter options
  const uniqueValues = (key: keyof DataItem) => {
    return Array.from(new Set(data.map((item) => item[key].toString())));
  };

  // Data sorted based on selected column and direction
  const sortedData = [...data].sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) return sortDirection === "asc" ? -1 : 1;
    if (a[sortColumn] > b[sortColumn]) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });

  // Data filtered based on debounced filter values
  const filteredData = sortedData.filter((item) => {
    return Object.entries(debouncedFilters).every(([key, value]) => {
      if (key === "Rate") {
        if (value === "") return true;
        if ([">", "<", ">=", "<=", "="].includes(filters.RateOperator)) {
          const rateValue = parseFloat(value);
          if (isNaN(rateValue)) return false;
          const itemRate = item[key as keyof DataItem] as number;
          switch (filters.RateOperator) {
            case ">":
              return itemRate > rateValue;
            case "<":
              return itemRate < rateValue;
            case ">=":
              return itemRate >= rateValue;
            case "<=":
              return itemRate <= rateValue;
            case "=":
              return itemRate === rateValue;
            default:
              return false;
          }
        } else {
          return item[key as keyof DataItem].toString() === value;
        }
      } else if (key === "RateOperator") {
        return true;
      } else {
        return item[key as keyof DataItem]
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase());
      }
    });
  });

  // Handler for changing sort column and direction
  const handleSort = (column: keyof DataItem) => {
    if (column === sortColumn) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  // Handler for changing filters
  const handleFilterChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    column: keyof DataItem | "RateOperator"
  ) => {
    setFilters({
      ...filters,
      [column]: e.target.value,
    });
  };

  // Options for rate filter with dynamic values
  const rateFilterOptions = [
    { label: "Greater than (>)", value: ">" },
    { label: "Less than (<)", value: "<" },
    { label: "Greater than or equal to (>=)", value: ">=" },
    { label: "Less than or equal to (<=)", value: "<=" },
    { label: "Equal to (=)", value: "=" },
    { label: "──────────", value: "separator", disabled: true },
    ...uniqueValues("Rate").map((value) => ({
      label: `Value: ${value}`,
      value,
    })),
  ];

  // Render the table with sorting and filtering functionality
  return (
    <div className="overflow-x-auto p-4">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700 text-center">
        Sortable and Filterable Table of Statewise Cancer Incidence Rates
      </h2>
      <div className="inline-block min-w-full align-middle bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {(["State", "Range", "Rate"] as const).map((column) => (
                <th
                  key={column}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider cursor-pointer w-1/3"
                  onClick={() => handleSort(column)}
                >
                  {column}
                  {sortColumn === column && (
                    <span className="ml-2">
                      {sortDirection === "asc" ? "▲" : "▼"}
                    </span>
                  )}
                  <div className="mt-2">
                    {column === "Rate" ? (
                      <div className="flex flex-col space-y-2">
                        <select
                          value={filters.RateOperator || filters.Rate}
                          onChange={(e) => {
                            const selectedValue = e.target.value;
                            if (
                              [">", "<", ">=", "<=", "="].includes(
                                selectedValue
                              )
                            ) {
                              setFilters({
                                ...filters,
                                Rate: "",
                                RateOperator: selectedValue,
                              });
                            } else {
                              setFilters({
                                ...filters,
                                Rate: selectedValue,
                                RateOperator: "",
                              });
                            }
                          }}
                          className="px-2 py-1 text-xs border border-gray-300 rounded"
                        >
                          <option value="">All</option>
                          {rateFilterOptions.map((option) => (
                            <option
                              key={option.value}
                              value={option.value}
                              disabled={option.disabled}
                            >
                              {option.label}
                            </option>
                          ))}
                        </select>
                        {[">", "<", ">=", "<=", "="].includes(
                          filters.RateOperator
                        ) && (
                          <input
                            type="number"
                            placeholder="Enter value"
                            value={filters.Rate}
                            onChange={(e) => handleFilterChange(e, "Rate")}
                            className="px-2 py-1 text-xs border border-gray-300 rounded"
                          />
                        )}
                      </div>
                    ) : (
                      <select
                        value={filters[column]}
                        onChange={(e) => handleFilterChange(e, column)}
                        className="mt-1 px-2 py-1 text-xs border border-gray-300 rounded w-full"
                      >
                        <option value="">All</option>
                        {uniqueValues(column).map((value) => (
                          <option key={value} value={value}>
                            {value}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredData.map((item, index) => (
              <tr
                key={item.State}
                className={`${
                  index % 2 === 0 ? "bg-gray-50" : "bg-white"
                } hover:bg-gray-100`}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {item.State}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.Range}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.Rate}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SortableTable;

// import React, { useState, useEffect, ChangeEvent } from "react";

// interface DataItem {
//   State: string;
//   Range: string;
//   Rate: number;
// }

// interface SortableTableProps {
//   data: DataItem[];
// }

// const SortableTable: React.FC<SortableTableProps> = ({ data }) => {
//   const [sortColumn, setSortColumn] = useState<keyof DataItem>("State");
//   const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
//   const [filters, setFilters] = useState({
//     State: "",
//     Range: "",
//     Rate: "",
//     RateOperator: "",
//   });
//   const [debouncedFilters, setDebouncedFilters] = useState(filters);

//   useEffect(() => {
//     const handler = setTimeout(() => {
//       setDebouncedFilters(filters);
//     }, 300);

//     return () => {
//       clearTimeout(handler);
//     };
//   }, [filters]);

//   const uniqueValues = (key: keyof DataItem) => {
//     return Array.from(new Set(data.map((item) => item[key].toString())));
//   };

//   const sortedData = [...data].sort((a, b) => {
//     if (a[sortColumn] < b[sortColumn]) return sortDirection === "asc" ? -1 : 1;
//     if (a[sortColumn] > b[sortColumn]) return sortDirection === "asc" ? 1 : -1;
//     return 0;
//   });

//   const filteredData = sortedData.filter((item) => {
//     return Object.entries(debouncedFilters).every(([key, value]) => {
//       if (key === "Rate") {
//         if (value === "") return true;
//         if ([">", "<", ">=", "<=", "="].includes(filters.RateOperator)) {
//           const rateValue = parseFloat(value);
//           if (isNaN(rateValue)) return false;
//           const itemRate = item[key as keyof DataItem] as number;
//           switch (filters.RateOperator) {
//             case ">":
//               return itemRate > rateValue;
//             case "<":
//               return itemRate < rateValue;
//             case ">=":
//               return itemRate >= rateValue;
//             case "<=":
//               return itemRate <= rateValue;
//             case "=":
//               return itemRate === rateValue;
//             default:
//               return false;
//           }
//         } else {
//           return item[key as keyof DataItem].toString() === value;
//         }
//       } else if (key === "RateOperator") {
//         return true;
//       } else {
//         return item[key as keyof DataItem]
//           .toString()
//           .toLowerCase()
//           .includes(value.toLowerCase());
//       }
//     });
//   });

//   const handleSort = (column: keyof DataItem) => {
//     if (column === sortColumn) {
//       setSortDirection(sortDirection === "asc" ? "desc" : "asc");
//     } else {
//       setSortColumn(column);
//       setSortDirection("asc");
//     }
//   };

//   const handleFilterChange = (
//     e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
//     column: keyof DataItem | "RateOperator"
//   ) => {
//     setFilters({
//       ...filters,
//       [column]: e.target.value,
//     });
//   };

//   const rateFilterOptions = [
//     { label: "Greater than (>)", value: ">" },
//     { label: "Less than (<)", value: "<" },
//     { label: "Greater than or equal to (>=)", value: ">=" },
//     { label: "Less than or equal to (<=)", value: "<=" },
//     { label: "Equal to (=)", value: "=" },
//     { label: "──────────", value: "separator", disabled: true },
//     ...uniqueValues("Rate").map((value) => ({
//       label: `Value: ${value}`,
//       value,
//     })),
//   ];

//   return (
//     <div className="overflow-x-auto p-4">
//       <h2 className="text-2xl font-semibold mb-4 text-gray-700 text-center">
//         Sortable and Filterable Table of Statewise Cancer Incidence Rates
//       </h2>
//       <div className="inline-block min-w-full align-middle bg-white shadow-md rounded-lg overflow-hidden">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               {(["State", "Range", "Rate"] as const).map((column) => (
//                 <th
//                   key={column}
//                   className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider cursor-pointer w-1/3"
//                   onClick={() => handleSort(column)}
//                 >
//                   {column}
//                   {sortColumn === column && (
//                     <span className="ml-2">
//                       {sortDirection === "asc" ? "▲" : "▼"}
//                     </span>
//                   )}
//                   <div className="mt-2">
//                     {column === "Rate" ? (
//                       <div className="flex flex-col space-y-2">
//                         <select
//                           value={filters.RateOperator || filters.Rate}
//                           onChange={(e) => {
//                             const selectedValue = e.target.value;
//                             if (
//                               [">", "<", ">=", "<=", "="].includes(
//                                 selectedValue
//                               )
//                             ) {
//                               setFilters({
//                                 ...filters,
//                                 Rate: "",
//                                 RateOperator: selectedValue,
//                               });
//                             } else {
//                               setFilters({
//                                 ...filters,
//                                 Rate: selectedValue,
//                                 RateOperator: "",
//                               });
//                             }
//                           }}
//                           className="px-2 py-1 text-xs border border-gray-300 rounded"
//                         >
//                           <option value="">All</option>
//                           {rateFilterOptions.map((option) => (
//                             <option
//                               key={option.value}
//                               value={option.value}
//                               disabled={option.disabled}
//                             >
//                               {option.label}
//                             </option>
//                           ))}
//                         </select>
//                         {[">", "<", ">=", "<=", "="].includes(
//                           filters.RateOperator
//                         ) && (
//                           <input
//                             type="number"
//                             placeholder="Enter value"
//                             value={filters.Rate}
//                             onChange={(e) => handleFilterChange(e, "Rate")}
//                             className="px-2 py-1 text-xs border border-gray-300 rounded"
//                           />
//                         )}
//                       </div>
//                     ) : (
//                       <select
//                         value={filters[column]}
//                         onChange={(e) => handleFilterChange(e, column)}
//                         className="mt-1 px-2 py-1 text-xs border border-gray-300 rounded w-full"
//                       >
//                         <option value="">All</option>
//                         {uniqueValues(column).map((value) => (
//                           <option key={value} value={value}>
//                             {value}
//                           </option>
//                         ))}
//                       </select>
//                     )}
//                   </div>
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {filteredData.map((item, index) => (
//               <tr
//                 key={item.State}
//                 className={`${
//                   index % 2 === 0 ? "bg-gray-50" : "bg-white"
//                 } hover:bg-gray-100`}
//               >
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                   {item.State}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                   {item.Range}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                   {item.Rate}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default SortableTable;
