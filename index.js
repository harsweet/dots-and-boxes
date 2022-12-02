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

// When a new user connects
io.on('connection', (socket) => {
  
    console.log('a user connected');


    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
    
    // Handles joining existing room
    socket.on("joinExistingRoom", (roomId) => {
      // Get all rooms
      // going and adding rooms each of the active sockets is in 
      // to get list of all active rooms
      var allRooms = Array.from(io.sockets.adapter.rooms.keys())

      // If room does not exist
      if(!allRooms.includes(roomId)) {
        io.to(socket.id).emit("joinUnsuccessful")
      }
      // If the room does exist
      else {
        const peopleBeforeNo = Array.from(io.sockets.adapter.rooms.get(roomId)).length;
        // If people in room are already 3, we can't join in
        if(peopleBeforeNo==3) {
          io.to(socket.id).emit("joinUnsuccessful")
        }

        // else just join in
        else{
          socket.join(roomId);

          const peopleAfter = Array.from(io.of("/").adapter.rooms.get(roomId));

          const successDetails = {
            roomId: roomId,
            playerId: peopleAfter.length
          }

          // Getting the player Id for the new Player (equal to the position at which
          // the player joined in)
          // Getting the people in the room and informing them of the new member
          io.to(socket.id).emit("joinSuccessful", successDetails);
          io.to(roomId).emit("aNewMember", peopleAfter.length);
        }
      }
    });

    // Handles creating a new room
    socket.on("createNewRoom", (roomId) => {
      console.log('Creating new room ', roomId );
      socket.join(roomId);

      const successDetails = {
        roomId: roomId,
        playerId: 1
      }
      // Gives the player its player ID and passes on Number of people in room
      io.to(socket.id).emit("joinSuccessful", successDetails);
      io.to(socket.id).emit("aNewMember", 1);
    });

    // Handling state change in one socket of the room 
    // And passing it to others in the room
    socket.on("stateChanged", (newState) => {
      const roomId = newState.room
      socket.to(roomId).emit("reflectStateChange", newState);
    });

    // Handling state change in one socket of the room 
    // And passing it to others in the room
    socket.on("gameOverInRoom", (gameOverData) => {
      const roomId = gameOverData.roomId
      io.to(roomId).emit("goToGameOverScreen", gameOverData)
    })
});
