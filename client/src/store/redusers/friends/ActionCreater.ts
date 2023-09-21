import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IFriend } from "../../../interfaces/chat";

export const fetchFriends = createAsyncThunk(
  "friends/fetchFriends",
  async (_: any, thunkApi) => {
    const promise = axios
      .get("http://localhost:5000/friends/fetch-friends")
      .then((response) => {
        return JSON.parse(response.data);
      });
    const res = await promise;
    return res as IFriend[];
  }
);
export const sendMessageFriend = createAsyncThunk(
  "friends/sendMessage",
  async (_: any, thunkApi) => {
    const { data } = _;
    console.log(data);
    const promise = axios

      .post("http://localhost:5000/friends/send-message", data)
      .then((response) => {
        return JSON.parse(response.data);
      });
    return await promise;
  }
);
