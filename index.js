// Importing the required modules and make use of them
const path = require('path');
const express = require('express');
const http = require('http');
const { Server } = require("socket.io");

// Creating a new app
const app = express();

// Specifying the directory to use for rendering the pages

// Need to get this thing back again
app.use(express.static(path.join(__dirname,'dist')));

app.get('/', function (req, res) {
    res.render('index', {});
});

// Setting up the server stuff
const server = http.createServer(app);

// Setting up the socket.io stuff
const io = new Server(server);

// Printing the message on a new connection 
server.listen(process.env.PORT || 3000);

console.log("listening");

io.on('connection', (socket) => {
  
    console.log('a user connected');


    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
    
    socket.on('my message', (msg) => {
      console.log('message: ' + msg);
    });

    socket.on('my message', (msg) => {
        io.emit('my broadcast', `server: ${msg}`);
        io.emit('my broadcast', `server: ${msg}`);
    });

    socket.on("join", roomName => {
        console.log('Joining the room', roomName );
        socket.join(roomName);
        var peopleInRoom = Array.from(io.of("/").adapter.rooms.get(roomName));
        var playerId = peopleInRoom.length
        console.log(peopleInRoom)
        io.to(socket.id).emit("your PlayerId", playerId);
        io.to(roomName).emit("a New Member", peopleInRoom.length);
    }); 

    socket.on("stateChanged", newState => {
      const roomName = newState.room
      socket.to(roomName).emit("reflectStateChange", newState);
    });

    socket.on("GameOver in room", gameOverData => {
      const roomName = gameOverData.room
      io.to(roomName).emit("goToGameOverScreen", gameOverData)
    })
});
