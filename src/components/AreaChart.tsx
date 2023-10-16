import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

const data1 = [1, 2, 4, 8, 20,7,2];
const data2 = [1, 2, 4, 8, 20,-15,2];
const data3 = [1, 2, 4, 8, 20,0,20];

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
  );

export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Habit accomplishment',
      },
    },
};

const labels = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

export const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: 'Habit 1',
        data: data1,
        borderColor: 'rgb(1, 43, 155)',
        backgroundColor: 'rgba(1, 43, 155, 0.5)',
      },
      {
        fill: true,
        label: 'Habit 2',
        data: data2,
        borderColor: 'rgb(247, 246, 164)',
        backgroundColor: 'rgba(247, 246, 164, 0.5)',
      },
      {
        fill: true,
        label: 'Habit 3',
        data: data3,
        borderColor: 'rgb(217, 224, 250)',
        backgroundColor: 'rgba(217, 224, 250, 0.5)',
      },
    ],
  };

  export const AreaChart = () => {
    return (
        <div style={
            {aspectRatio: "2/2"}
        }>
            <Line options={options} data={data} />
        </div>
    );
};