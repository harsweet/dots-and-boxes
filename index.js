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
    });
});
