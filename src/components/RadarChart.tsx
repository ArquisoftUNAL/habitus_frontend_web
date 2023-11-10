import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

const data1 = [1, 2, 4, 8, 20, 15, 5];

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
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
      backgroundColor: 'rgba(1, 43, 155, 0.2)',
      borderColor: 'rgba(1, 43, 155, 1)',
      borderWidth: 1,
    },
  ],
};

export const RadarChart = () => {
  return (
    <div style={
      { aspectRatio: "2/2" }
    }>
      <Radar data={data} />
    </div>
  );
};