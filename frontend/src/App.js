import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Bar, Pie, Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';

const socket = io('http://localhost:5000');

const App = () => {
    const [votes, setVotes] = useState({ Amos: 50, Other: 45 });

    useEffect(() => {
        socket.on('voteUpdate', (data) => setVotes(data));
        return () => socket.off('voteUpdate');
    }, []);

    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Student Election 2025</h1>
            <h2>Join the Winning Team: Vote for Amos!</h2>
            <Bar data={{ labels: ['Amos', 'Other'], datasets: [{ data: [votes.Amos, votes.Other], backgroundColor: ['blue', 'red'] }] }} />
            <Pie data={{ labels: ['Amos', 'Other'], datasets: [{ data: [votes.Amos, votes.Other], backgroundColor: ['blue', 'red'] }] }} />
            <Doughnut data={{ labels: ['Amos', 'Other'], datasets: [{ data: [votes.Amos, votes.Other], backgroundColor: ['blue', 'red'] }] }} />
        </div>
    );
};

export default App;
