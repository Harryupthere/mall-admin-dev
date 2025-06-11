import React from 'react';
import Chart from "react-apexcharts";

const AccountSizeChart = () => {
  const chartData  = {
    series: [
      {
        name: 'Sales',
        data: [300, 450, 600, 750], // Replace with your actual sales numbers
      },
    ],
    options: {
      chart: {
        type: 'bar',
        height: 300,
                width:'100%',
      },

      xaxis: {
        categories: ['Small', 'Medium', 'Large', 'Enterprise'], // X-axis labels
        labels: {
          style: {
            fontSize: '12px',
          },
        },
      },
      yaxis: {
        title: {
          text: 'Sales',
        },
      },
      colors: ['#44208f'], // your desired color
      tooltip: {
        y: {
          formatter: (val) => `${val} units`, // optional
        },
      },
      plotOptions: {
        bar: {
          borderRadius: 8,
          columnWidth: '45%',
        },
      },
      dataLabels: {
        enabled: true,
      },
    },
  };

  return (
    <div id="chart">
      <Chart
        options={chartData?.options}
        series={chartData?.series||[]}
        type="bar"
        height={190}
        width="100%"
      />
    </div>
  );
};

export default AccountSizeChart;
