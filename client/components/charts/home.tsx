import React from "react";
import SortableTable from "./sortabletable";
import csvData from "../../data/uscs_map_incidence_all.csv";
import PieChart from "./piechart";
import BarChart from "./barchart";

interface DataItem {
  State: string;
  Range: string;
  Rate: number;
}

export const HomeData: React.FC = () => {
  const data: DataItem[] = csvData;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">
        Cancer Incidence Rates by State
      </h1>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Pie Chart</h2>
        <PieChart data={data} />
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Bar Chart</h2>
        <BarChart data={data} />
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">Sortable Table</h2>
        <SortableTable data={data} />
      </div>
    </div>
  );
};

export default HomeData;
