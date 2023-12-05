import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { useLocation } from 'react-router-dom';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);



const Graph = () => {
    const location = useLocation();
    const labels = location.state.map(item => item.name);
    const numbers = location.state.map(item => item?.items?.length);
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Status Chart',
            },
        },
        scales: {
            x: {
                type: 'category',
                labels: labels,
                title: {
                    display: true,
                    text: 'Status Name',
                },
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Number of Statues',
                },
            },
        },
    };

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'status',
                data: numbers,
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };
    return (<Bar options={options} data={data} className='container page' />);
};

export default Graph;
