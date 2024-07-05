import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import {
  backgroundColors,
  hoverBackgroundColors,
  ranges,
} from "../../utils/chartColors";

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
  // Function to get the range for a given rate
  const getRange = (rate: number) => {
    if (rate < 400) return "Below 400";
    if (rate <= 430) return "400 to 430";
    if (rate <= 460) return "430 to 460";
    if (rate <= 490) return "460 to 490";
    return "Above 490";
  };

  // Calculating the count of states in each range
  const rangeCounts = ranges.map(
    (range) => data.filter((item) => getRange(item.Rate) === range.range).length
  );

  // Collecting states for each range
  const rangeStates = ranges.map((range) =>
    data
      .filter((item) => getRange(item.Rate) === range.range)
      .map((item) => item.State)
  );

  // Preparing the data structure for the chart
  const chartData = {
    labels: ranges.map((range) => range.range),
    datasets: [
      {
        data: rangeCounts,
        backgroundColor: backgroundColors,
        hoverBackgroundColor: hoverBackgroundColors,
        borderWidth: 0,
      },
    ],
  };

  // Configuring chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "bottom" as const,
        labels: {
          boxWidth: 10,
          padding: 10,
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        enabled: false,
        external: function (context: any) {
          // Custom tooltip handling
          let tooltipEl = document.getElementById("chartjs-tooltip");

          // Create tooltip element on first render
          if (!tooltipEl) {
            tooltipEl = document.createElement("div");
            tooltipEl.id = "chartjs-tooltip";
            tooltipEl.innerHTML = "<table></table>";
            document.body.appendChild(tooltipEl);
          }

          // Hide tooltip when not active
          const tooltipModel = context.tooltip;
          if (tooltipModel.opacity === 0) {
            tooltipEl.style.opacity = "0";
            return;
          }

          // Set tooltip Position
          tooltipEl.classList.remove("above", "below", "no-transform");
          if (tooltipModel.yAlign) {
            tooltipEl.classList.add(tooltipModel.yAlign);
          } else {
            tooltipEl.classList.add("no-transform");
          }

          function getBody(bodyItem: any) {
            return bodyItem.lines;
          }

          // Set tooltip content
          if (tooltipModel.body) {
            const titleLines = tooltipModel.title || [];
            const bodyLines = tooltipModel.body.map(getBody);

            let innerHtml = "<thead>";

            titleLines.forEach(function (title: any) {
              innerHtml += "<tr><th>" + title + "</th></tr>";
            });
            innerHtml += "</thead><tbody>";

            const dataIndex = context.tooltip.dataPoints[0].dataIndex;
            const states = rangeStates[dataIndex];

            bodyLines.forEach(function (body: any) {
              innerHtml += `<tr><td>${
                states.length
              } States<br><small>${states.join(", ")}</small></td></tr>`;
            });
            innerHtml += "</tbody>";

            const tableRoot = tooltipEl.querySelector("table");
            if (tableRoot) {
              tableRoot.innerHTML = innerHtml;
            }
          }

          // Position and style the tooltip
          const position = context.chart.canvas.getBoundingClientRect();
          tooltipEl.style.opacity = "1";
          tooltipEl.style.position = "absolute";
          tooltipEl.style.left =
            position.left + window.pageXOffset + tooltipModel.caretX + "px";
          tooltipEl.style.top =
            position.top + window.pageYOffset + tooltipModel.caretY + "px";
          tooltipEl.style.fontFamily = tooltipModel.options.bodyFont.family;
          tooltipEl.style.fontSize = "12px";
          tooltipEl.style.fontStyle = tooltipModel.options.bodyFont.style;
          tooltipEl.style.padding =
            tooltipModel.padding + "px " + tooltipModel.padding + "px";
          tooltipEl.style.pointerEvents = "none";
          tooltipEl.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
          tooltipEl.style.border = "1px solid #ddd";
          tooltipEl.style.borderRadius = "4px";
          tooltipEl.style.boxShadow = "0px 0px 12px rgba(0, 0, 0, 0.1)";
          tooltipEl.style.zIndex = "9999";
        },
      },
    },
    animation: {
      duration: 1500,
      easing: "easeInOutCubic" as const,
    },
    interaction: {
      mode: "nearest" as const,
      intersect: false,
    },
  };

  // Rendering the component
  return (
    <div className="flex flex-col justify-center items-center h-full">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700 text-center">
        Distribution of States by Cancer Incidence Rate Ranges
      </h2>
      <div className="w-full flex-grow">
        <Pie data={chartData} options={options} />
      </div>
    </div>
  );
};

export default PieChart;
