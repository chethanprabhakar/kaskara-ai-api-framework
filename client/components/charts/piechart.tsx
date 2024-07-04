import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

interface DataItem {
  State: string;
  Range: string;
  Rate: number;
}

interface PieChartProps {
  data: DataItem[];
}

const PieChart: React.FC<PieChartProps> = ({ data }) => {
  const ranges = Array.from(new Set(data.map(item => item.Range)));
  const rangeCounts = ranges.map(range => 
    data.filter(item => item.Range === range).length
  );

  const chartData = {
    labels: ranges,
    datasets: [
      {
        data: rangeCounts,
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF',
        ],
      },
    ],
  };

  return <Pie data={chartData} />;
};

export default PieChart;