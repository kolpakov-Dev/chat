import { createSlice } from "@reduxjs/toolkit";
import { IUserFriend } from "../../../interfaces/user";
import { fetchUsers } from "./ActionCreater";

interface UsersState {
  users: IUserFriend[] | [];
  loading: boolean;
  error: string;
}
const initialState: UsersState = {
  users: [],
  loading: false,
  error: "",
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.users = action.payload;
    });
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
      state.error = "";
    });
    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const UsersReducer = usersSlice.reducer;
