import React from "react";
import { format } from "date-fns";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useMediaQuery } from "@mui/material";
import { useTheme } from "@emotion/react";

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
  "#117c24",
  "rgba(54, 162, 235, 0.8)",
  "rgba(255, 206, 86, 0.8)",
  "rgba(75, 192, 192, 0.8)",
  "rgba(153, 102, 255, 0.8)",
  "rgba(255, 159, 64, 0.8)",
];

const EarningGraph = ({ projects }) => {
  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.only("xs"));

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  const months = Array.from(
    { length: 12 },
    (_, index) => new Date(currentYear, index, 1)
  );

  const monthlyEarnings = months.map((month) => ({ month, earnings: 0 }));

  // Calculate earnings for each project and update month's earnings
  projects.forEach((project) => {
    const projectDate = new Date(project.createdAt);

    // Check if the project is within the current year
    if (projectDate.getFullYear() === currentYear) {
      const donations = project.donations || [];
      const acceptDonations = donations.filter(
        (donation) => donation.isConfirm === true
      );
      acceptDonations.forEach((donation) => {
        const donationDate = new Date(donation.createdAt);

        // check if donation date greater or equal to current month
        // check if donation date less than start date of next month
        const monthIndex = months.findIndex(
          (month) =>
            donationDate >= month &&
            donationDate <
              new Date(month.getFullYear(), month.getMonth() + 1, 1)
        );
         // if matching month found
        if (monthIndex !== -1) {
          monthlyEarnings[monthIndex].earnings += donation.amount || 0;
        }
      });
    }
  });

  const labels = monthlyEarnings.map((item) => format(item.month, "MMM yyyy"));
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
        position: "top",
      },
      title: {
        display: true,
        text: "monthly earning of all projects",
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        grid: {
          display: true,
        },
      },
    },
  };

  return (
    <div style={{ width: "100%", minHeight: isXs ? "300px" : "600px" }}>
      <Bar options={options} data={chartData} />
    </div>
  );
};

export default EarningGraph;
