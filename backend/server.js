const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const { Server } = require("socket.io");

dotenv.config();

// Initialize Express app
const app = express();

// MongoDB connection
connectDB()
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => {
    console.error("Database connection failed:", err.message);
    process.exit(1);
  });

// Middleware
// app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);
app.use(express.json());

// Routes
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});

// Socket.IO setup

// const io = new Server(server, {
//   pingTimeout: 60000,
//   cors: {
//     origin: "http://localhost:3000",
//     credentials: true,
//   },
// });
const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  },
});

// Socket.IO events
io.on("connection", (socket) => {
  console.log("User connected to Socket.IO");

  // Setup user socket
  socket.on("setup", (userData) => {
    if (!userData?._id) {
      console.error("User data missing in setup event");
      return;
    }
    socket.join(userData._id);
    socket.emit("connected");
    console.log(`User joined room: ${userData._id}`);
  });

  // Join chat room
  socket.on("join chat", (room) => {
    if (!room) {
      console.error("Room ID is missing in join chat event");
      return;
    }
    socket.join(room);
    console.log(`User joined room: ${room}`);
  });

  // Handle new message
  socket.on("new message", (newMessageReceived) => {
    try {
      if (!newMessageReceived?.chat?.users) {
        console.error("Invalid message or chat users not defined");
        return;
      }

      const chat = newMessageReceived.chat;

      chat.users.forEach((user) => {
        if (user._id === newMessageReceived.sender._id) return;
        socket.in(user._id).emit("message received", newMessageReceived);
      });

      // Emit audio notification
      socket.in(newMessageReceived.chat._id).emit("audio notification", { type: "message", sound: "notification-2-269292.mp3" });

    } catch (err) {
      console.error("Error processing new message:", err.message);
    }
  });

  // Typing indicators
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("disconnect", () => {
    console.log("User disconnected from Socket.IO");
  });

  // Clean up on socket disconnection
  socket.on("disconnecting", () => {
    const rooms = Array.from(socket.rooms);
    console.log(`Cleaning up for user in rooms: ${rooms}`);
    rooms.forEach((room) => socket.leave(room));
  });
});
