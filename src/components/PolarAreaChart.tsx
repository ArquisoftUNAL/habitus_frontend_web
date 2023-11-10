import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import { PolarArea } from 'react-chartjs-2';

const data1 = [1, 2, 4, 8, 20, 15, 5];

ChartJS.register(
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend
);

const labels = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export const data = {
  labels,
  datasets: [
    {
      label: 'Habit accomplishment',
      data: data1,
      backgroundColor: [
        'rgba(1, 43, 155, 0.5)',
        'rgba(247, 246, 164, 0.5)',
        'rgba(217, 224, 250, 0.5)',
        'rgba(1, 43, 155, 0.5)',
        'rgba(247, 246, 164, 0.5)',
        'rgba(217, 224, 250, 0.5)',
        'rgba(247, 246, 164, 0.5)',
      ],
      borderWidth: 1,
    },
  ],
};

export const PolarAreaChart = () => {
  return (
    <div style={
      { aspectRatio: "2/2" }
    }>
      <PolarArea data={data} />
    </div>
  );
};