const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');


const cors = require('cors')
const server = http.createServer(app)
app.use(cors());
const PORT = process.env.PORT || 3001;

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}`)

    socket.on("join_room", (roomId) => {
        console.log("Room ID: " + roomId)
        socket.join(roomId);
    });

    socket.on("send_message", (data) => {
        socket.to(data.room).emit("received_message", data)
    });
});

server.listen(PORT, () => {
    console.log("SERVER IS RUNNING")
});

