import React, { useState } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "../../../../hooks/redux";
import { sendMessage } from "../../../../store/redusers/chat/ActionCreater";
import { ChatsSlice } from "../../../../store/redusers/chat/chatsSlice";
const InputBlockChat = () => {
  const { selectedChat } = useAppSelector((state) => state.ChatsReducer);
  const { setSelectedChat } = ChatsSlice.actions;
  const { user } = useAppSelector((state) => state.userReducer);
  const [text, changeText] = useState("");
  const dispatch = useAppDispatch();
  const sendMessageEvent = () => {
    if (text != "") {
      dispatch(
        sendMessage({
          data: {
            userUID: user?.id,
            message: text,
            chatID: selectedChat?.id,
            type: "message",
          },
        })
      );
      dispatch(setSelectedChat(selectedChat!.id));
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

export default InputBlockChat;
