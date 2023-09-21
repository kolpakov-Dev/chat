import React from "react";
import { signOutFunc } from "../../../store/redusers/user/ActionCreater";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { AiOutlinePlusCircle, AiOutlineUserAdd } from "react-icons/ai";
import { ChatsSlice } from "../../../store/redusers/chat/chatsSlice";
import { FriendsSlice } from "../../../store/redusers/friends/friendsSlice";
const PanelSettings = () => {
  const { error } = useAppSelector((state) => state.userReducer);
  const { deleteSelectedFriend } = FriendsSlice.actions;
  const { deleteSelectedChat } = ChatsSlice.actions;
  const dispatch = useAppDispatch();
  const { showCreateChatPopup, showAddNewFriendPopup } = ChatsSlice.actions;
  return (
    <div className="leftPanelSettings">
      {error ? <p>{error}</p> : <></>}
      <div
        className="createChat btn"
        onClick={() => {
          dispatch(showCreateChatPopup());
        }}
      >
        <>Create Chat</> <AiOutlinePlusCircle />
      </div>
      <div
        className="createChat btn"
        onClick={() => {
          dispatch(showAddNewFriendPopup());
        }}
      >
        <>Add friend</> <AiOutlineUserAdd />
      </div>
      <div
        className="logOut btn"
        onClick={() => {
          dispatch(deleteSelectedFriend());
          dispatch(deleteSelectedChat());
          dispatch(signOutFunc(""));
        }}
      >
        Log out
      </div>
    </div>
  );
};

export default PanelSettings;
