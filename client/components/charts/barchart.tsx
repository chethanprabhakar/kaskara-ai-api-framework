import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

interface DataItem {
  State: string;
  Range: string;
  Rate: number;
}

interface BarChartProps {
  data: DataItem[];
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
  const sortedData = [...data].sort((a, b) => b.Rate - a.Rate);

  const chartData = {
    labels: sortedData.map(item => item.State),
    datasets: [
      {
        label: 'Cancer Incidence Rate',
        data: sortedData.map(item => item.Rate),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Cancer Incidence Rates by State',
      },
    },
  };

  return <Bar options={options} data={chartData} />;
};

export default BarChart;