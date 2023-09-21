import { useState } from "react";

import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { ChatsSlice } from "../../../store/redusers/chat/chatsSlice";

import AddNewFriend from "./FriendBody/addNewFriend";
import CreateChat from "./ChatBody/createChat";
import HeaderChat from "./ChatBody/headerChat";
import HeaderFriend from "./FriendBody/headerFriend";
import Messages from "./Messages";
import ChatInfo from "./ChatBody/ChatInfo";
import InputBlockChat from "./ChatBody/InputBlockChat";
import InputBlockFriend from "./FriendBody/InputBlockFriend";
const RightPanel = () => {
  const [showChatInfo, setShowChatInfo] = useState(false);
  const [showFriendInfo, setShowFriendInfo] = useState(false);
  const { selectedChat, createChatPopupFlag, addNewFriendPopupFlag, error } =
    useAppSelector((state) => state.ChatsReducer);
  const { selectedFriend } = useAppSelector((state) => state.FriendsReducer);
  const { hideCreateChatPopup } = ChatsSlice.actions;
  const dispatch = useAppDispatch();
  const setShowChatInfoEvent = (bl: boolean) => {
    setShowChatInfo(bl);
  };
  const setShowFriendInfoEvent = (bl: boolean) => {
    setShowFriendInfo(bl);
  };
  if (createChatPopupFlag) {
    return (
      <div
        className="rightPanel"
        onClick={(e) => {
          if (
            e.target.className == "rightPanel" ||
            e.target.className == "mainContent"
          )
            dispatch(hideCreateChatPopup());
        }}
      >
        {error ? <p>{error}</p> : <></>}
        <div className="mainContent">
          <CreateChat />
        </div>
      </div>
    );
  }
  if (addNewFriendPopupFlag) {
    return (
      <div
        className="rightPanel"
        onClick={(e) => {
          if (
            e.target.className == "rightPanel" ||
            e.target.className == "mainContent"
          )
            dispatch(hideCreateChatPopup());
        }}
      >
        {error ? <p>{error}</p> : <></>}
        <div className="mainContent">
          <AddNewFriend />
        </div>
      </div>
    );
  }
  if (selectedChat) {
    return (
      <div className="rightPanel">
        <div className="mainContent">
          <>
            <HeaderChat
              showTabFunc={setShowChatInfoEvent}
              showTabVal={showChatInfo}
            />
            <Messages selectedType="chat" />
            <InputBlockChat />
          </>
        </div>
        {showChatInfo ? <ChatInfo showTabFunc={setShowChatInfoEvent} /> : <></>}
      </div>
    );
  }
  if (selectedFriend) {
    return (
      <div className="rightPanel">
        <div className="mainContent">
          <>
            <HeaderFriend />
            <Messages selectedType="friend" />
            <InputBlockFriend />
          </>
        </div>
      </div>
    );
  }
  return (
    <div className="ChatNotSelected">
      Select chat or friend, and start messaging
    </div>
  );
};

export default RightPanel;
