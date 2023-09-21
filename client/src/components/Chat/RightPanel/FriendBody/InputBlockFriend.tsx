import React, { useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";

import { FriendsSlice } from "../../../../store/redusers/friends/friendsSlice";
import { sendMessageFriend } from "../../../../store/redusers/friends/ActionCreater";
const InputBlockFriend = () => {
  const { selectedFriend } = useAppSelector((state) => state.FriendsReducer);
  const { setSelectedFriend } = FriendsSlice.actions;
  const { user } = useAppSelector((state) => state.userReducer);
  const [text, changeText] = useState("");
  const dispatch = useAppDispatch();
  const sendMessageEvent = () => {
    if (text != "") {
      dispatch(
        sendMessageFriend({
          data: {
            userUID: user?.id,
            message: text,
            chatID: selectedFriend?.id,
            type: "message",
          },
        })
      );
      changeText("");
      dispatch(setSelectedFriend(selectedFriend!.id));
    }
  };
  return (
    <div className="rightPanelInputBlock">
      <input
        type="text"
        placeholder="Type a new message..."
        value={text}
        onChange={(e) => {
          changeText(e.target.value);
        }}
        onKeyDown={(event) => {
          if (event.code == "Enter") {
            sendMessageEvent();
          }
        }}
      />
      <div
        className="btn btnCreateMessage"
        onClick={() => {
          sendMessageEvent();
        }}
      >
        Send Message <AiOutlineSend />
      </div>
    </div>
  );
};

export default InputBlockFriend;
