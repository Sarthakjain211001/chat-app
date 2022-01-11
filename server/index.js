const express = require('express');
const socketio = require('socket.io')
const http = require('http')
const router = require('./router')
const PORT = process.env.PORT  || 5000
const cors = require('cors');
const {addUser, removeUser, getUser, getUsersInRoom} = require("./users")

const app = express();
const server = http.createServer(app);
app.use(router);
app.use(cors());
const io = socketio(server, {
    cors: {
    origin: ["http://localhost:3000"]
    }
  });

io.on('connection', (socket)=>{
  console.log("connected to socket", socket.id);
  
  socket.on('join', ({name, room}, callback)=>{
   
   const {error, user} = addUser({id: socket.id, name, room})
  
   if(error){               //If error is recieved from the addUser() then the 3rd parameter recieved from the frontend i.e callback fun will be called and error will be passed as paramter in it.
      return callback(error)
   }
  
  
  socket.join(user.room); //to join the user in the room he gave

  socket.emit('message', {user: "admin", text: `Hi ${user.name} ! Welcome to the room ${user.room}`});  //To send the usr a welcome message.
  socket.broadcast.to(user.room).emit('message', { user: 'admin', text:`${user.name} has joined`})  //This will send the message to everyone present in the room (because .to(user.room) is mentioned) except that specific user.
    
  io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)})
   callback();
  })
  

  socket.on('sendMessage' ,(message, callback)=>{
     const user = getUser(socket.id);
     io.to(user.room).emit('message', {user : user.name, text: message})
     callback();
  })

  socket.on('disconnect', ()=>{
      const user = removeUser(socket.id);

      if(user){
        io.to(user.room).emit('message', {user:'admin', text: `${user.name} has left.`})          //When the user will leave a message will be sent to all the other users in that room that this person left
        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});  //room data should be updated. So room data has to be sent.
      }
  })
})


server.listen(PORT, ()=>console.log(`server listening on port ${PORT}`))