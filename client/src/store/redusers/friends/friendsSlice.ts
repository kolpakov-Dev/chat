import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { fetchFriends, sendMessageFriend } from "./ActionCreater";
import { IFriend } from "../../../interfaces/chat";

interface FriendsState {
  friends: IFriend[];
  selectedFriend: IFriend | undefined;
  loading: boolean;
  error: string;
}
const initialState: FriendsState = {
  friends: [],
  selectedFriend: undefined,
  loading: false,
  error: "",
};

export const FriendsSlice = createSlice({
  name: "friends",
  initialState,
  reducers: {
    setSelectedFriend: (state, action: PayloadAction<string>) => {
      state.selectedFriend = state.friends?.find(
        (el: IFriend) => el.id == action.payload
      );
    },
    deleteSelectedFriend: (state) => {
      state.selectedFriend = undefined;
    },
    updateFriendRooms: (state, action: PayloadAction<IFriend[]>) => {
      state.friends = action.payload;
      const chatIndex = state.friends.findIndex(
        (elem: IFriend) => elem.id == state.selectedFriend?.id
      );
      state.selectedFriend = state.friends[chatIndex];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchFriends.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      console.log(action.payload);
      state.friends = action.payload;
    });
    builder.addCase(fetchFriends.pending, (state) => {
      state.loading = true;
      state.loading = false;
    });
    builder.addCase(fetchFriends.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(sendMessageFriend.fulfilled, (state) => {
      state.loading = false;
      state.error = "";
    });
    builder.addCase(sendMessageFriend.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(sendMessageFriend.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const FriendsReducer = FriendsSlice.reducer;
