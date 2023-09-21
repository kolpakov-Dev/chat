import express from "express";
import cors from "cors";
import multer from "multer";
import path from "path";
import { Server } from "socket.io";
import { createServer } from "node:http";
import { fileURLToPath } from "url";
import {
  createUser,
  signIn,
  signOutFunc,
  getCurrent,
  addNewFriends,
} from "./db/auth.js";
import { db, auth } from "./firebase.setup.js";
import {
  createChat,
  fetchChats,
  sendMessage,
  deleteMessage,
  fetchUsers,
} from "./db/chat.js";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { fetchFriends, sendMessageFriend } from "./db/friends.js";
const port = "5000";
// Создайте хранилище multer для сохранения загруженных файлов
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Укажите директорию, куда будут сохраняться загруженные файлы
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    // Генерируйте уникальное имя файла
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage });
const app = express();
const server = createServer(app);
const io = new Server(server, { cors: { origin: "*" } });
io.on("connection", (socket) => {
  console.log("Подключен клиент WebSocket");

  // Обработка отключения клиента
  socket.on("disconnect", () => {
    console.log("Клиент WebSocket отключен");
  });
  socket.on("listenChats", ({ userID }) => {
    console.log("отслеживание чатов");
    const q = query(
      collection(db, "Chats"),
      where("users", "array-contains", userID)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const cities = [];
      let result = [];
      querySnapshot.forEach((doc) => {
        result.push({
          id: doc.id,
          title: doc.data().title,
          owner: doc.data().owner,
          users: doc.data().users,
          usersData: doc.data().usersData,
          messages: doc.data().messages,
        });
      });
      io.to(socket.id).emit("updateChats", result);
    });
  });
  socket.on("listenFriends", ({ userID }) => {
    console.log("отслеживание друзей");
    const q = query(
      collection(db, "Friends"),
      where("users", "array-contains", userID)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const cities = [];
      let result = [];
      querySnapshot.forEach((doc) => {
        result.push({
          id: doc.id,
          users: doc.data().users,
          usersData: doc.data().usersData,
          messages: doc.data().messages,
        });
      });
      io.to(socket.id).emit("updateFriends", result);
    });
  });
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));
server.listen(port, () => console.log(`Server started on port ${port}`));
// AUTH
app.post("/create-user", upload.single("image"), createUser);
app.post("/sign-in", signIn);
app.post("/sign-out", signOutFunc);
app.get("/get-current", getCurrent);
app.post("/add-new-friends", addNewFriends);
//-

//All users
app.get("/get-all-users", fetchUsers);
//-

// Chats
app.post("/create-chat", createChat);
app.post("/fetch-chats", fetchChats);
app.post("/send-message", sendMessage);
app.post("/delete-message", deleteMessage);
//-

// Frineds
app.get("/friends/fetch-friends", fetchFriends);
app.post("/friends/send-message", sendMessageFriend);
//-
