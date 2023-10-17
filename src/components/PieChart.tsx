import React from 'react';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

//const data1 = [1, 2, 4, 8, 20,15,5];

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

// const labels = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];

// export const data = {
//     labels,
//     datasets: [
//       {
//         label: 'Habit accomplishment',
//         data: data1,
//         backgroundColor: [
//           'rgba(1, 43, 155, 0.2)',
//           'rgba(247, 246, 164, 0.2)',
//           'rgba(217, 224, 250, 0.2)',
//           'rgba(1, 43, 155, 0.2)',
//           'rgba(247, 246, 164, 0.2)',
//           'rgba(217, 224, 250, 0.2)',
//           'rgba(247, 246, 164, 0.2)',
//         ],
//         borderColor: [
//           'rgba(1, 43, 155, 1)',
//           'rgba(247, 246, 164, 1)',
//           'rgba(217, 224, 250, 1)',
//           'rgba(1, 43, 155, 1)',
//           'rgba(247, 246, 164, 1)',
//           'rgba(217, 224, 250, 1)',
//           'rgba(247, 246, 164, 1)'
//         ],
//         borderWidth: 1,
//       },
//     ],
//   };

interface PieChartProps {
  data: number[];
  labels: string[];
}

export const PieChart: React.FC<PieChartProps> = ({ data, labels }) => {
  const config = {
    labels,
    datasets: [
      {
        label: 'Habit accomplishment',
        data: data,
        backgroundColor: [
          'rgba(1, 43, 155, 1)',
          'rgba(247, 246, 164, 1)',
          // 'rgba(217, 224, 250, 0.2)',
          // 'rgba(1, 43, 155, 0.2)',
          // 'rgba(247, 246, 164, 0.2)',
          // 'rgba(217, 224, 250, 0.2)',
          // 'rgba(247, 246, 164, 0.2)',
        ],
        borderColor: [
          'rgba(1, 43, 155, 1)',
          'rgba(247, 246, 164, 1)',
          // 'rgba(217, 224, 250, 1)',
          // 'rgba(1, 43, 155, 1)',
          // 'rgba(247, 246, 164, 1)',
          // 'rgba(217, 224, 250, 1)',
          // 'rgba(247, 246, 164, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div style={
      { aspectRatio: "2/2" }
    }>
      <Pie data={config} />
    </div>
  );
};