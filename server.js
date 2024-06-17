// server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static('public'));

let waitingUser = null; // Store a waiting user if there is one

io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    if (waitingUser) {
        // If there is a waiting user, pair them
        socket.emit('partner', waitingUser.id);
        waitingUser.emit('partner', socket.id);

        // Clear waiting user as they are now paired
        waitingUser = null;
    } else {
        // Store the current user as waiting
        waitingUser = socket;
    }

    socket.on('message', (data) => {
        console.log('Message received:', data);
        // Send the message to the partner
        io.to(data.partner).emit('message', data);
    });

    socket.on('disconnect', () => {
        console.log('A user disconnected:', socket.id);
        if (waitingUser === socket) {
            waitingUser = null; // Clear waiting user if they disconnect
        }
    });
});

server.listen(3000, () => {
    console.log('Listening on *:3000');
});
