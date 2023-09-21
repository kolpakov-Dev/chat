import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./redusers/user/UserSlice";
import { ChatsReducer } from "./redusers/chat/chatsSlice";
import { UsersReducer } from "./redusers/users/usersSlice";
import { FriendsReducer } from "./redusers/friends/friendsSlice";

const rootReducer = combineReducers({
  userReducer,
  ChatsReducer,
  UsersReducer,
  FriendsReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    devTools: true,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
