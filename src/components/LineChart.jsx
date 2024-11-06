import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, scales, Ticks } from 'chart.js/auto';
import { callback } from 'chart.js/helpers';

const options = {
  plugins: {
    legend: {
      display: false,
      onClick: (e) => e.stopPropagation(),
    },
    tooltip: {
      enabled: true, 
      callbacks: {
        label: (tooltipItem) => {
          return `₱${tooltipItem.raw}`;
        },
      }
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        callback: (value, index, values) => {
          return `₱${value}`;
        },
      },
    },
  },
};

const LineChart = ({ chartData }) => {
  return <Line data={chartData} options={options} style={{ height: '100%', width: '100%' }} />;
};

export default LineChart;
