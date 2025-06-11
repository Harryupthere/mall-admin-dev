import React from "react";
import ReactApexChart from "react-apexcharts";

const DateChart = () => {
  const [state, setState] = React.useState({
    series: [
      {
        name: "Price",
        data: [
          [1327359600000, 30.95],
          [1327446000000, 31.34],
          [1327532400000, 31.18],
          [1327618800000, 31.05],
          [1327878000000, 31.0],
          // ... (rest of your data)
        ],
      },
    ],
    options: {
      chart: {
        type: "area",
        height: 300,
        zoom: {
          enabled: false,
        },
      },
      colors: ["#8358ff"], // Your custom purple color
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        width: 2,
      },
      xaxis: {
        type: "datetime",
        labels: {
          style: {
            colors: "#ffffff", // White label color
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: "#ffffff", // White label color
          },
        },
      },
      grid: {
        borderColor: "#ffffff20", // lighter white with transparency
        row: {
          colors: ["transparent", "#ffffff08"], // alternating row colors (very light)
          opacity: 0.1,
        },
      },
      tooltip: {
        x: {
          format: "dd MMM yyyy",
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.5,
          opacityTo: 0.1,
          stops: [0, 90, 100],
          colorStops: [
            [
              {
                offset: 0,
                color: "#8358ff",
                opacity: 0.5,
              },
              {
                offset: 100,
                color: "#8358ff",
                opacity: 0.1,
              },
            ],
          ],
        },
      },
    },
  });

  return (
    <div id="chart">
      <ReactApexChart options={state.options} series={state.series} type="area" height={350} />
    </div>
  );
};

export default DateChart;
