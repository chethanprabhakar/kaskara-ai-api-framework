import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { getColorForRate } from "../../utils/chartColors";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface DataItem {
  State: string;
  Range: string;
  Rate: number;
}

interface BarChartProps {
  data: DataItem[];
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  // Sorting the data by state name
  const sortedData = [...data].sort((a, b) => a.State.localeCompare(b.State));

  // Generating background colors for each data item based on its rate
  const backgroundColors = sortedData.map((item) => getColorForRate(item.Rate));

  // Preparing the data structure for the chart
  const chartData = {
    labels: sortedData.map((item) => item.State),
    datasets: [
      {
        label: "Cancer Incidence Rate",
        data: sortedData.map((item) => item.Rate),
        backgroundColor: backgroundColors,
        hoverBackgroundColor: backgroundColors.map((color) => color + "CC"), // Adjust for hover state
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  // Configuring chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false, // Hiding the legend as it seems unnecessary
      },
      tooltip: {
        callbacks: {
          // Customizing tooltip content
          label: function (context: any) {
            const index = context.dataIndex;
            const state = sortedData[index].State;
            const rate = sortedData[index].Rate;
            const range = sortedData[index].Range;
            return `State: ${state}\nRate: ${rate}\nRange: ${range}`;
          },
        },
      },
    },
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "State",
          font: {
            size: 14,
          },
        },
      },
      y: {
        title: {
          display: true,
          text: "Incidence Rate",
          font: {
            size: 14,
          },
        },
        beginAtZero: true,
      },
    },
  };

  // Rendering the component
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700 text-center">
        Cancer Incidence Rates by State
      </h2>
      <div className="relative h-96 w-full flex-grow">
        <Bar options={options} data={chartData} />
      </div>
    </div>
  );
};

export default BarChart;
