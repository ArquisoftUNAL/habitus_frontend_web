import 'react';
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

const data1 = [1, 2, 4, 8, 20];
const data2 = [1, 2, 4, 8, 20];
const data3 = [1, 2, 4, 8, 20];

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
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
        text: 'Weekly habits',
      },
    },
};

const labels = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

export const data = {
  labels,
  datasets: [
    {
      label: 'Habit 1',
      data: data1,
      backgroundColor: 'rgba(1, 43, 155, 0.8)',
    },
    {
      label: 'Habit 2',
      data: data2,
      backgroundColor: 'rgba(247, 246, 164, 0.8)',
    },
    {
      label: 'Habit 3',
      data: data3,
      backgroundColor: 'rgba(217, 224, 250, 0.8)',
    },
  ],
};



export const BarChart = () => {
    return (
        <div style={
            {aspectRatio: "2/2"}
        }>
            <Bar options={options} data={data} />
        </div>
    );
};