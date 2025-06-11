import React from 'react';
import Chart from "react-apexcharts";

const AccountPie = () => {
  const chartData = {
    series: [44, 55, 41, 17, 15],
    options: {
      chart: {
        type: 'donut',
      },
      legend: {
        show: false // 🔴 This removes the legend box
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: '100%'
          },
          legend: {
            position: 'bottom'
            
          }
        }
      }]
    },
  };

  return (
    <div id="chart">
      <Chart
        options={chartData?.options}
        series={chartData?.series||[]}
     type="pie"
        width="100%"
        height={200}
      />
      </div>
  );
};

export default AccountPie;
