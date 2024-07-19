
import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';

const Dashboard = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/emissions')
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.error("There was an error fetching the data!", error);
            });
    }, []);

    return (
        <div>
            <h1>Greenhouse Gas Emissions Dashboard</h1>
            <Plot
                data={[
                    {
                        x: data.map(item => new Date(item.timestamp)),
                        y: data.map(item => item.emission_level),
                        type: 'scatter',
                        mode: 'lines+points',
                        marker: { color: 'red' },
                    },
                ]}
                layout={{ title: 'Emission Levels Over Time' }}
            />
        </div>
    );
};

export default Dashboard;

