import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { IFriend } from "../../../interfaces/chat";
import { FriendsSlice } from "../../../store/redusers/friends/friendsSlice";
import { IUserFriend } from "../../../interfaces/user";
import { ChatsSlice } from "../../../store/redusers/chat/chatsSlice";
interface Props {
  friend: IFriend;
}
const SingleFriend = ({ friend }: Props) => {
  const [mess, setMess] = useState("");
  const [time, setTime] = useState("");
  const [friendData, setFriendData] = useState<IUserFriend>();
  const { setSelectedFriend } = FriendsSlice.actions;
  const { deleteSelectedChat } = ChatsSlice.actions;
  const { selectedFriend } = useAppSelector((state) => state.FriendsReducer);
  const { user } = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (friend.messages.length) {
      if (friend.messages[friend.messages.length - 1].text.length > 40) {
        setMess(
          friend.messages[friend.messages.length - 1].text.substring(0, 40) +
            "..."
        );
      } else {
        setMess(friend.messages[friend.messages.length - 1].text);
      }
      setTime(
        friend.messages[friend.messages.length - 1].date.substring(
          friend.messages[0].date.length - 5
        )
      );
      if (user?.id == friend.usersData[0].id) {
        setFriendData(friend.usersData[1]);
      } else {
        setFriendData(friend.usersData[0]);
      }
    }
  }, [selectedFriend?.messages]);
  return (
    <div
      className="singleChat userElement"
      onClick={() => {
        dispatch(setSelectedFriend(friend.id));
        dispatch(deleteSelectedChat());
      }}
    >
      <div
        className={
          selectedFriend && selectedFriend.id == friend.id
            ? "userElementWrapper currentChat"
            : "userElementWrapper"
        }
      >
        <div className="userElementBody">
          <div className="thumbWrap">
            <img src={friendData?.image} />
          </div>
          <div className="userElementBodyText">
            <h3>{friendData?.name}</h3>
            <p>{mess}</p>
          </div>
        </div>
        <span className="lastMessageTime">{time}</span>
      </div>
    </div>
  );
};

export default SingleFriend;
