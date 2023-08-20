// App setup
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const PORT = process.env.PORT || 8080;
const socketIO = require("socket.io");
const io = socketIO(server, {
  cors: { origin: "http://localhost:3000" },
});
const moment = require("moment");
const path = require("path");

// Middleware setup
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Chat rooms that contain a room code and users { 123: ['user1'], chat-room123: ['user1','user2', 'user3'] }
const channels = {
  support: ['user1', 'user2', 'user3', 'user4', 'user5']
};

app.get('/', (req, res) => {
  res.send("Hi there!");
})


app.get("/api/:channelId/:nickname", (req, res) => {
  const exists = channels.hasOwnProperty(req.params.channelId);

  res.json({ exists: exists });
});


io.on("connection", (socket) => {


  socket.on("create channel", (channelID, nickname) => {
    const users = [];
    users.push(nickname);
    channels[channelID] = users;

    console.log("Channels: " + JSON.stringify(channels));
    socket.join(channelID);  
    const redirect = true;
    io.emit("create channel", redirect);
  });


  socket.on("join channel", (channelID, nickname) => {
    //Checking if a nickname is already in use
    const nicknames = channels[channelID];
    let error = null;

    if (nicknames.includes(nickname)) {
      error = "The nickname is already taken!";
    }

    //If current nickname exist on the channel send an error message to the client
    if (error) {
      io.emit("join error", error);
    } else {
      //Put the nickname in the channel
      channels[channelID].push(nickname);
      socket.join(channelID);

      const redirect = true;
      io.emit("join channel", redirect);
    }
  });


  socket.on("update users", (channelId) => {
    const users = channels[channelId];
    io.to(channelId).emit("update users", users);
  })

  
  socket.on("chat message", ({id, avatar, sender, message, channelID, time, likes, usersLikedTheMessage}) => {
    io.to(channelID).emit("chat message", { 
      id: id,
      avatar: avatar,
      sender: sender, 
      message: message,
      time: time, 
      likes: likes,
      usersLikedTheMessage: usersLikedTheMessage,
    });
  });


  socket.on("update messages", (messages) => {
    console.log("Messages: " + JSON.stringify(messages));
    io.emit("update messages", messages);
  });
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});