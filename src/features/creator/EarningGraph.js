import React, { useCallback } from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachMonthOfInterval,
} from "date-fns";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);


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

   // Calculate the monthly earnings based on the projects data
   const calculateMonthlyEarnings = useCallback(() => {
    const currentDate = new Date();
    const currentMonthStart = startOfMonth(currentDate);
    const currentMonthEnd = endOfMonth(currentDate);

    const months = eachMonthOfInterval({
      start: startOfMonth(new Date(2023, 0)), // Set the desired start month
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
  }, [projects]);


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
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'monthly earning of all projects',
          },
        },
      };
 

  return (
    <div style={{ minHeight: "400px" }}>
      <Bar options={options} data={chartData} />
    </div>
  );
};

export default EarningGraph;
