import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IChat, IMessageStore } from "../../../interfaces/chat";

export const fetchChats = createAsyncThunk(
  "chats/fetchChats",
  async (_: any, thunkApi) => {
    const promise = axios
      .post("http://localhost:5000/fetch-chats")
      .then((response) => {
        return JSON.parse(response.data);
      });
    const resultArr = (await promise).map((item: any) => {
      return {
        id: item.id,
        title: item.data.title,
        owner: item.data.owner,
        users: item.data.users,
        messages: item.data.messages,
      } as IChat;
    });
    return resultArr;
  }
);
export const createChat = createAsyncThunk(
  "chats/createChat",
  async (_: any, thunkApi) => {
    const { data } = _;
    console.log(data);
    const promise = axios

      .post("http://localhost:5000/create-chat", data)
      .then((response) => {
        return JSON.parse(response.data);
      });
    const newChat = (await promise) as IChat;
    return newChat;
  }
);
export const sendMessage = createAsyncThunk(
  "chats/sendMessage",
  async (_: any, thunkApi) => {
    const { data } = _;
    console.log(data);
    const promise = axios

      .post("http://localhost:5000/send-message", data)
      .then((response) => {
        return JSON.parse(response.data);
      });
    return await promise;
  }
);
