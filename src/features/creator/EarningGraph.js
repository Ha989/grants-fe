import React, { useState, useEffect, useRef } from "react";
import { Bar } from "react-chartjs-2";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachMonthOfInterval,
} from "date-fns";
import Chart from "chart.js/auto";

const colors = [
  "rgba(255, 99, 132, 0.8)",
  "rgba(54, 162, 235, 0.8)",
  "rgba(255, 206, 86, 0.8)",
  "rgba(75, 192, 192, 0.8)",
  "rgba(153, 102, 255, 0.8)",
  "rgba(255, 159, 64, 0.8)",
  "rgba(255, 99, 132, 0.8)",
  "rgba(54, 162, 235, 0.8)",
  "rgba(255, 206, 86, 0.8)",
  "rgba(75, 192, 192, 0.8)",
  "rgba(153, 102, 255, 0.8)",
  "rgba(255, 159, 64, 0.8)",
];

const EarningGraph = ({ projects }) => {
  const chartRef = useRef(null);
  const chartId = "barChart";

  useEffect(() => {
    let chartInstance = null;

    const renderChart = () => {
      if (chartInstance) {
        chartInstance.destroy(); // Destroy the previous chart instance
      }

      const monthlyEarnings = calculateMonthlyEarnings();
      const labels = monthlyEarnings.map((item) =>
        format(item.month, "MMM yyyy")
      );
      const data = monthlyEarnings.map((item) => item.earnings);

      const chartData = {
        labels: labels,
        datasets: [
          {
            label: "Monthly Earnings",
            data: data,
            backgroundColor: colors,
          },
        ],
      };

      const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      };

      const canvas = chartRef.current;

      if (canvas) {
        const ctx = canvas.getContext("2d");
        chartInstance = new Chart(ctx, {
          type: "bar",
          data: chartData,
          options: options,
        });
      }
    };

    renderChart();

    return () => {
      if (
        chartInstance &&
        typeof chartInstance.destroy === "function" &&
        !chartInstance.destroyed
      ) {
        chartInstance.destroy();
      }
    };
  }, [projects]);

  // Calculate the monthly earnings based on the projects data
  const calculateMonthlyEarnings = () => {
    const currentDate = new Date();
    const currentMonthStart = startOfMonth(currentDate);
    const currentMonthEnd = endOfMonth(currentDate);

    const months = eachMonthOfInterval({
      start: startOfMonth(new Date(2023, 0)), // Set the desired start month here
      end: currentMonthEnd,
    });

    const monthlyEarnings = months.map((month) => {
      const monthStart = startOfMonth(month);
      const monthEnd = endOfMonth(month);
      const earnings = projects?.reduce((total, project) => {
        const projectDate = new Date(project.createdAt);
        if (projectDate >= monthStart && projectDate <= monthEnd) {
          return total + project.currentRaised;
        }
        return total;
      }, 0);
      return { month: month, earnings: earnings };
    });
    return monthlyEarnings;
  };

  return (
    <div style={{ minHeight: "400px" }}>
      <canvas id={chartId} ref={chartRef} />
    </div>
  );
};

export default EarningGraph;
