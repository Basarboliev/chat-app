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
app.use(express.static('./client/build'));

//Chat rooms that contain a room code and users { 123: ['user1'], chat-room123: ['user1','user2', 'user3'] }
const channels = {
  support: ['user1', 'user2', 'user3', 'user4', 'user5']
};

// {'socketIdOne': ['userOne', 'roomName'], 'socketIdTwo': ['userTwo', 'roomName']}
const idToUserAndChannel = {};

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
    idToUserAndChannel[socket.id] = [nickname, channelID];

    console.log("Channels: " + JSON.stringify(channels));
    socket.join(channelID);
    const redirect = true;
    io.emit("create channel", redirect);
    io.emit("update system messages", {
      avatar: 'https://static.vecteezy.com/system/resources/thumbnails/010/044/383/small/chat-bot-icon-isolated-contour-symbol-illustration-vector.jpg',
      alt: 'System Message',
      title: 'System Message',
      subtitle: `${nickname} created the channel Dolapski ${channelID}`,
      date: new Date(),
    });
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
      idToUserAndChannel[socket.id] = [nickname, channelID];
      socket.join(channelID);
      console.log("Socket " + socket.id + " join the room!");
      const redirect = true;
      io.emit("join channel", redirect);
      io.emit("update system messages", {
        avatar: 'https://static.vecteezy.com/system/resources/thumbnails/010/044/383/small/chat-bot-icon-isolated-contour-symbol-illustration-vector.jpg',
        alt: 'System Message',
        title: 'System Message',
        subtitle: `${nickname} joined the channel`,
        date: new Date(),
      });
    }
  });


  socket.on("update users", (channelId) => {
    const users = channels[channelId];
    io.to(channelId).emit("update users", users);
  });


  socket.on("chat message", ({ id, avatar, sender, message, channelID, time, likes, usersLikedTheMessage }) => {
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


  socket.on("disconnect", () => {
    const socketId = socket.id;

    if (socketId in idToUserAndChannel) {
      // Get the name and room from socketId.
      const [name, channelId] = idToUserAndChannel[socketId];
      //Update the users in the channel
      channels[channelId].splice(channels[channelId].indexOf(name), 1);
      delete idToUserAndChannel[socketId];

      //Removing the socket from the channel
      socket.leave(channelId);
      console.log("Users in the channel after disconnect: " + JSON.stringify(channels[channelId]));

      const users = channels[channelId];
      io.to(channelId).emit("update users", users);

      //Generating a system message to the client
      io.emit("update system messages", {
        avatar: 'https://static.vecteezy.com/system/resources/thumbnails/010/044/383/small/chat-bot-icon-isolated-contour-symbol-illustration-vector.jpg',
        alt: 'System Message',
        title: 'System Message',
        subtitle: `${name} left the channel`,
        date: new Date(),
      });
    }
  });

});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});