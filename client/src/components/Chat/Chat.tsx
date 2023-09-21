import React, { useEffect } from "react";
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";
import io from "socket.io-client";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { ChatsSlice } from "../../store/redusers/chat/chatsSlice";
import { IChat } from "../../interfaces/chat";
import { fetchUsers } from "../../store/redusers/users/ActionCreater";
import { FriendsSlice } from "../../store/redusers/friends/friendsSlice";
const Chat = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.userReducer);
  const { updateChats } = ChatsSlice.actions;
  const { updateFriendRooms } = FriendsSlice.actions;
  useEffect(() => {
    dispatch(fetchUsers(""));
    const socket = io("http://localhost:5000");
    socket.emit("listenChats", { userID: user?.id });
    socket.on("updateChats", (result: IChat[]) => {
      dispatch(updateChats(result));
    });
    socket.emit("listenFriends", { userID: user?.id });
    socket.on("updateFriends", (result: IChat[]) => {
      dispatch(updateFriendRooms(result));
    });
  }, []);
  return (
    <div className="Chat">
      <LeftPanel />
      <RightPanel />
    </div>
  );
};

export default Chat;
