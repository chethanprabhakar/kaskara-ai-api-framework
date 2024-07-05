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
  // Parse csvData and convert it to the required format for the components
  const data: DataItem[] = csvData.map((item) => ({
    State: item.State,
    Range: item.Range,
    Rate: parseFloat(item.Rate as unknown as string), // Ensure Rate is parsed as a float
  }));

  // Render the home page layout with a pie chart, bar chart, and sortable table
  return (
    <div className="container mx-auto p-8 bg-gray-50 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">
        Cancer Incidence Rates by State
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
        <div className="bg-white shadow rounded-lg p-8 col-span-1 lg:col-span-1">
          <PieChart data={data} />
        </div>
        <div className="bg-white shadow rounded-lg p-8 col-span-1 lg:col-span-2">
          <BarChart data={data} />
        </div>
      </div>
      <div className="bg-white shadow rounded-lg p-8">
        <SortableTable data={data} />
      </div>
    </div>
  );
};

export default HomeData;
