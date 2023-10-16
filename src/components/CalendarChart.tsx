import React from 'react';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend
} from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend
);

interface CalendarPieChartProps {
    data: number[];
    labels: string[];
    label: string;
    colors: string[];
}

export const CalendarPieChart: React.FC<CalendarPieChartProps> = ({ data, labels, label, colors }) => {
    return (
        <div style={
            { width: "80%", aspectRatio: "3/2", alignItems: "center" }
        }
            className='text-center'
        >
            <Pie data={{
                labels,
                datasets: [
                    {
                        label: label,
                        data: data,
                        backgroundColor: colors,
                        borderColor: colors,
                        borderWidth: 1,
                    }
                ]
            }}
                options={{
                    font: {
                        size: 20
                    },
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'left',
                            align: 'center',
                            title: {
                                display: true,
                                text: 'Ocurrences',
                                font: {
                                    size: 20
                                }
                            }
                        },
                        title: {
                            display: true,
                            text: 'Ocurrences',
                            font: {
                                size: 40
                            }
                        }
                    }
                }}
            />
        </div>
    );
};