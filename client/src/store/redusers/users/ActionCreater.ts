import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IUserFriend } from "../../../interfaces/user";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_: any, thunkApi) => {
    const promise = axios
      .get("http://localhost:5000/get-all-users")
      .then((response) => {
        return JSON.parse(response.data);
      });
    try {
      const users = await promise;
      return users as IUserFriend[];
    } catch (error: any) {
      return thunkApi.rejectWithValue(error.response.data);
    }
  }
);
