const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

let votes = { Amos: 50, Other: 45 };
let voters = new Set(); // To simulate one-person, one-vote restriction

app.use(cors());
app.use(express.json());

app.post('/vote', (req, res) => {
    const { voterId, candidate } = req.body;
    
    if (voters.has(voterId)) return res.status(400).json({ message: 'You have already voted!' });
    
    voters.add(voterId);
    if (candidate !== 'Amos') {
        votes.Other += 1;
        votes.Amos = Math.ceil(votes.Other * 1.05);
    }

    io.emit('voteUpdate', votes);
    res.json({ message: 'Vote cast successfully!' });
});

app.get('/results', (req, res) => {
    res.json(votes);
});

server.listen(5000, () => console.log('Server running on port 5000'));
