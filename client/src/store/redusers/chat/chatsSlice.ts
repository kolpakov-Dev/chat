import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  createChat,
  fetchChats,
  listenChats,
  sendMessage,
} from "./ActionCreater";
import { IChat } from "../../../interfaces/chat";

interface ChatsState {
  chats: IChat[];
  selectedChat: IChat | undefined;
  loading: boolean;
  error: string;
  createChatPopupFlag: boolean;
  addNewFriendPopupFlag: boolean;
}
const initialState: ChatsState = {
  chats: [],
  selectedChat: undefined,
  loading: false,
  error: "",
  createChatPopupFlag: false,
  addNewFriendPopupFlag: false,
};

export const ChatsSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    setSelectedChat: (state, action: PayloadAction<string>) => {
      state.selectedChat = state.chats?.find((el) => el.id == action.payload);
    },
    deleteSelectedChat: (state) => {
      state.selectedChat = undefined;
    },
    updateChats: (state, action: PayloadAction<IChat[]>) => {
      state.chats = action.payload;
      const chatIndex = state.chats.findIndex(
        (elem) => elem.id == state.selectedChat?.id
      );
      state.selectedChat = state.chats[chatIndex];
    },
    showCreateChatPopup: (state) => {
      state.createChatPopupFlag = true;
    },
    hideCreateChatPopup: (state) => {
      state.createChatPopupFlag = false;
    },
    showAddNewFriendPopup: (state) => {
      state.addNewFriendPopupFlag = true;
    },
    hideAddNewFriendPopup: (state) => {
      state.addNewFriendPopupFlag = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchChats.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.chats = action.payload;
    });
    builder.addCase(fetchChats.pending, (state) => {
      state.loading = true;
      state.loading = false;
    });
    builder.addCase(fetchChats.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(createChat.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createChat.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
    builder.addCase(sendMessage.fulfilled, (state) => {
      state.loading = false;
      state.error = "";
    });
    builder.addCase(sendMessage.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(sendMessage.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const ChatsReducer = ChatsSlice.reducer;
