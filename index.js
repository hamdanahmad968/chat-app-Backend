const express = require("express")
const {Server} = require("socket.io")
const cors = require("cors")
const http = require("http")
const port = process.env.PORT || 8000;

const app = express()
app.use(cors())

const server = http.createServer(app)
const io = new Server(server,{
  cors : {
    origin : "https://chatipy-app.onrender.com/",
    methods : ["GET" , "POST"]
  }

})

io.on("connection", (socket) => {
  socket.on("joinRoom" , room => {
    socket.join(room)
  })
  socket.on("newMessage" , ({message , room})=>{
    // console.log(room, message)
    io.in(room).emit("getlatestMessage" , message);
  })

});

app.get("/" , (req , res)=>{
  res.send("backend running")
})

server.listen(port ,()=>{
    console.log("app is running on port 8000")
})