import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import IUser from "../../../interfaces/user";

export const getUser = createAsyncThunk(
  "user/getUser",
  async (_: any, thunkApi) => {
    const promise = axios
      .get("http://localhost:5000/get-current")
      .then((response) => {
        return JSON.parse(response.data);
      });
    try {
      const user = await promise;
      return user as IUser;
    } catch (error: any) {
      return thunkApi.rejectWithValue(
        convertFirebaseError(error.response.data)
      );
    }
  }
);
export const signOutFunc = createAsyncThunk(
  "user/signOut",
  async (_: any, thunkApi) => {
    try {
      axios.post("http://localhost:5000/sign-out").then((response) => {
        return "OK";
      });
    } catch (error: any) {
      return thunkApi.rejectWithValue(
        convertFirebaseError(error.response.data)
      );
    }
  }
);
export const logIn = createAsyncThunk(
  "user/logIn",
  async (_: any, thunkApi) => {
    const { email, password } = _;
    const promise = axios
      .post("http://localhost:5000/sign-in", {
        email,
        password,
      })
      .then((response) => {
        return JSON.parse(response.data);
      });
    try {
      const user = await promise;
      return user as IUser;
    } catch (error: any) {
      return thunkApi.rejectWithValue(
        convertFirebaseError(error.response.data)
      );
    }
  }
);
export const createUser = createAsyncThunk(
  "user/createUser",
  async (_: any, thunkApi) => {
    const { data } = _;
    console.log(data);
    const promise = axios
      .post("http://localhost:5000/create-user", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        return JSON.parse(response.data);
      });
    try {
      const user = await promise;
      return user as IUser;
    } catch (error: any) {
      return thunkApi.rejectWithValue(
        convertFirebaseError(error.response.data)
      );
    }
  }
);
export const addNewFriends = createAsyncThunk(
  "user/addNewFriends",
  async (_: any, thunkApi) => {
    const { data } = _;
    console.log(data);
    const promise = axios
      .post("http://localhost:5000/add-new-friends", data)
      .then((response) => {
        return JSON.parse(response.data);
      });
    try {
      const user = await promise;
      return user as IUser;
    } catch (error: any) {
      return thunkApi.rejectWithValue(
        convertFirebaseError(error.response.data)
      );
    }
  }
);

export const convertFirebaseError = (error: string) => {
  switch (error) {
    case "auth/weak-password":
      return "Password is too short.";
    case "auth/invalid-email":
      return "Invalid email.";
    case "auth/wrong-password":
      return "Wrong password.";
    case "auth/email-already-in-use":
      return "Email already in use.";
    case "ERR_BAD_RESPONSE":
      return "Incorrect email or password";
    default:
      return error;
  }
};
