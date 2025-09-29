import express from 'express';
import "dotenv/config";
import cors from 'cors';
import http from 'http';
import { connectDB } from './lib/db.js';
import userRouter from './routes/user.routes.js';
import messageRouter from './routes/message.routes.js';
import { Server } from 'socket.io';

//create express app
const app = express();
const server= http.createServer(app);

// initialize socket.io
export const io = new Server(server, {
  cors: {origin: "*"}
})

// store online users
export const userSockerMap = {}; // {userId: socketId}

//Socket.io connection
io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;
  console.log("User connected with ID:", userId);

  if(userId) userSockerMap[userId] = socket.id;

  //Emit online users to all connected users
  io.emit("getOnlineUsers", Object.keys(userSockerMap));

  socket.on("disconnect", () => {
    console.log("User disconnected with ID:", userId);
    delete userSockerMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSockerMap));
  })
})

//middlewares
app.use(cors());
app.use(express.json({limit: '4mb'}));
app.use(express.urlencoded({ extended: true }));

app.use("/api/status", (req, res) => res.send("API is running..."));
app.use("/api/auth", userRouter);
app.use("/api/messages", messageRouter)

//connect to DB
await connectDB()

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
