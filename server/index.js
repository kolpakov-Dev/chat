import express from "express";
import cors from "cors";
import { createUser, signIn, signOutFunc, getCurrent } from "./db/auth.js";
import {
  createChat,
  fetchChats,
  sendMessage,
  deleteMessage,
} from "./db/chat.js";
const port = "5000";

const app = express();
app.use(express.json());
app.use(cors());
app.listen(port, () => console.log(`Server started on port ${port}`));
// AUTH
app.post("/create-user", createUser);
app.post("/sign-in", signIn);
app.post("/sign-out", signOutFunc);
app.get("/get-current", getCurrent);

// Chats
app.post("/create-chat", createChat);
app.post("/fetch-chats", fetchChats);
app.post("/send-message", sendMessage);
app.post("/delete-message", deleteMessage);
