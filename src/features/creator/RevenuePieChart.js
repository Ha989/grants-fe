import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { useCallback } from "react";
import { useMemo } from "react";

ChartJS.register(ArcElement, Tooltip, Legend);

const RevenuePieChart = ({ projects }) => {
  const getRandomColor = useCallback(() => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }, []);

  const generateColors = useCallback(
    (count) => {
      const colors = [];
      for (let i = 0; i < count; i++) {
        const color = getRandomColor();
        colors.push(color);
      }
      return colors;
    },
    [getRandomColor]
  );

  const colors = useMemo(
    () => generateColors(projects.length),
    [projects.length, generateColors]
  ); // Generate an array of colors based on the number of projects
  const data = useMemo(
    () => ({
      labels: projects.map((project) => project.name),
      datasets: [
        {
          data: projects.map((project) => project.currentRaised),
          backgroundColor: colors,
        },
      ],
    }),
    [projects, colors]
  );

  return (
    <div style={{ width: "350px", height: "350px" }}>
      <Pie data={data} />
    </div>
  );
};

export default RevenuePieChart;
