
import React, { useEffect, useRef } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart } from 'chart.js';

const RevenuePieChart = ({ projects }) => {
  const chartRef = useRef(null);
  const chartId = 'myChart';

  useEffect(() => {
    let chartInstance = null;

    const renderChart = () => {
      if (chartInstance) {
        chartInstance.destroy(); // Destroy the previous chart instance
      }

      if (!projects || projects.length === 0) {
        return; // Return early if projects is undefined or empty
      }

      const colors = generateColors(projects.length); // Generate an array of colors based on the number of projects

      const chartData = {
        labels: projects.map((project) => project.name),
        datasets: [
          {
            data: projects.map((project) => project.currentRaised),
            backgroundColor: colors,
          },
        ],
      };

      const options = {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
          display: true,
          position: 'bottom',
        },
        tooltips: {
          enabled: true,
        },
      };

      const canvas = document.getElementById(chartId);

      if (canvas) {
        const ctx = canvas.getContext('2d');
        chartInstance = new Chart(ctx, {
          type: 'pie',
          data: chartData,
          options: options,
        });
      }
    };

    renderChart();

    return () => {
      if (chartInstance && typeof chartInstance.destroy === 'function' && !chartInstance.destroyed) {
        chartInstance.destroy();
      }
    };
  }, []);

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const generateColors = (count) => {
    const colors = [];
    for (let i = 0; i < count; i++) {
      const color = getRandomColor();
      colors.push(color);
    }
    return colors;
  };

  return (
    <div style={{ width: '350px', height: '350px' }}>
      <canvas id={chartId} ref={chartRef} />
    </div>
  );
};

export default RevenuePieChart;

