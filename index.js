const express = require('express');
const path = require('path')
const socket = require('socket.io');
const app = express(); 

//Providing access to static files
app.use(express.static(path.join(__dirname, 'public')));

const PORT = 4000;

const server = app.listen(4000, () => {
    console.log(`Server started successfully and on port: ${PORT}`);
})

const io = socket(server);

io.on('connection', (socket) => {
    console.log('connected to chat', socket.id);

    socket.on('chat', (data) => {
        io.sockets.emit('chat', data);
    })

    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', data);
    })
})
