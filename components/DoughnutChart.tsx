"use client";
import Chart from "chart.js/auto";
import React from "react";
import { Doughnut } from "react-chartjs-2";

Chart.register()

const DoughnutChart = ({ accounts }: DoughnutChartProps) => {
    const data = { datasets: [
        {
            label: 'Banks',
            data: [1000, 200, 50.5],
            backgroundColor: ['#0747b6', '#2265d8']
        }
    ],
    labels: ['Bank 1', 'Bank 2', 'Bank 3']
 };

    return <Doughnut data={data} options={{cutout: '60%', plugins:{legend:{display: false}}}} />;
};

export default DoughnutChart;
