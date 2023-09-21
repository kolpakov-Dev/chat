import React, { useEffect, useState } from "react";
import { ChatsSlice } from "../../../store/redusers/chat/chatsSlice";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { IChat } from "../../../interfaces/chat";
import { FriendsSlice } from "../../../store/redusers/friends/friendsSlice";
interface Props {
  chat: IChat;
}
const SingleRoom = ({ chat }: Props) => {
  const [mess, setMess] = useState("");
  const [time, setTime] = useState("");
  const { setSelectedChat } = ChatsSlice.actions;
  const { deleteSelectedFriend } = FriendsSlice.actions;
  const { selectedChat } = useAppSelector((state) => state.ChatsReducer);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (chat.messages.length) {
      if (chat.messages[chat.messages.length - 1].text.length > 40) {
        setMess(
          chat.messages[chat.messages.length - 1].text.substring(0, 40) + "..."
        );
      } else {
        setMess(chat.messages[chat.messages.length - 1].text);
      }
      setTime(
        chat.messages[chat.messages.length - 1].date.substring(
          chat.messages[0].date.length - 5
        )
      );
    }
  }, [chat.messages]);
  return (
    <div
      className="singleChat userElement"
      onClick={() => {
        dispatch(setSelectedChat(chat.id));
        dispatch(deleteSelectedFriend());
      }}
    >
      <div
        className={
          selectedChat && selectedChat.id == chat.id
            ? "userElementWrapper currentChat"
            : "userElementWrapper"
        }
      >
        <div className="userElementBody">
          <div className="thumbWrap">
            <p>{chat.title[0]}</p>
          </div>
          <div className="userElementBodyText">
            <h3>{chat.title}</h3>
            <p>{mess}</p>
          </div>
        </div>
        <span className="lastMessageTime">{time}</span>
      </div>
    </div>
  );
};

export default SingleRoom;
