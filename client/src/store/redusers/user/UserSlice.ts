import { createSlice } from "@reduxjs/toolkit";
import {
  addNewFriends,
  createUser,
  getUser,
  logIn,
  signOutFunc,
} from "./ActionCreater";
import { IUser } from "../../../interfaces/user";

interface UserState {
  user: IUser | null;
  loading: boolean;
  error: string;
}
const initialState: UserState = {
  user: null,
  loading: false,
  error: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createUser.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.user = action.payload;
    });
    builder.addCase(createUser.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(createUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.user = action.payload;
    });
    builder.addCase(getUser.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(getUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(signOutFunc.fulfilled, (state) => {
      state.loading = false;
      state.error = "";
      state.user = null;
    });
    builder.addCase(signOutFunc.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(signOutFunc.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(logIn.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.user = action.payload;
    });
    builder.addCase(logIn.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(logIn.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(addNewFriends.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.user = action.payload;
    });
    builder.addCase(addNewFriends.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(addNewFriends.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const userReducer = userSlice.reducer;
